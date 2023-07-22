import Image from 'next/image'
import styles from './sidebar.module.css'

import logo from '@/assets/logo.svg'
import { ChartLineUp, Binoculars, User, SignOut } from 'phosphor-react'
import { SidebarNavigation } from './SidebarNavigation'
import { useAuth } from '@/hooks/useAuth'
import { useEffect } from 'react'

export function Sidebar() {
  const { user } = useAuth()
  console.log(user)

  return (
    <aside className='h-full p-4 hidden md:block'>
      <div className={`${styles.sidebarBg} h-full w-56 rounded-xl flex flex-col items-center py-8`}>
        <Image src={logo} alt='Um livro e ao lado o nome librarte representando a logo da aplicação'/>

        <nav className='mt-16'>
          <ul className='flex flex-col gap-8'>
            <SidebarNavigation
              title='Início'
              href='/'
              icon={ChartLineUp}
            />

            <SidebarNavigation
              title='Explorar'
              href='/explore'
              icon={Binoculars}
            />    

            <SidebarNavigation
              title='Perfil'
              href='/perfil'
              icon={User}
            />
          </ul>
        </nav>

        <div className='mt-auto flex items-center gap-4 text-gray-200'>
          {user?.username}
          <a href="">
            <SignOut size={24} className='text-red-500'/>
          </a>
        </div>
      </div>
    </aside>
  )
}
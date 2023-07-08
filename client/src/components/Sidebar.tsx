import Image from 'next/image'
import styles from './sidebar.module.css'

import logo from '@/assets/logo.svg'
import { ChartLineUp, Binoculars, User, SignOut } from 'phosphor-react'
import Link from 'next/link'

export function Sidebar() {
  return (
    <aside className='h-full p-4 hidden md:block'>
      <div className={`${styles.sidebarBg} h-full w-56 rounded-xl flex flex-col items-center py-8`}>
        <Image src={logo} alt='Um livro e ao lado o nome librarte representando a logo da aplicação'/>

        <nav className='mt-16'>
          <ul className='flex flex-col gap-8'>
            <li>
              <Link href='/' className='flex items-center gap-4 text-gray-100 font-semibold text-sm'>
                <ChartLineUp size={24}/>
                Início
              </Link>
            </li>

            <li>
              <Link href="/explore" className='flex items-center gap-4 text-gray-400 font-semibold text-sm'>
                <Binoculars size={24}/>
                Explorar
              </Link>
            </li>

            <li>
              <Link href="/perfil" className='flex items-center gap-4 text-gray-400 font-semibold text-sm'>
                <User size={24}/>
                Perfil
              </Link>
            </li>
          </ul>
        </nav>

        <div className='mt-auto flex items-center gap-4 text-gray-200'>
          Cristofer
          <a href="">
            <SignOut size={24} className='text-red-500'/>
          </a>
        </div>
      </div>
    </aside>
  )
}
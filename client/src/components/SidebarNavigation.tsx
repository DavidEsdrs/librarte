import Link from 'next/link'
import { useRouter } from 'next/router';
import { ElementType } from "react";

interface SidebarNavigation {
  title: string,
  href: string,
  icon: ElementType
}

export function SidebarNavigation({ title, href, icon: Icon}: SidebarNavigation) {
  const { asPath } = useRouter()

  const isActive = asPath === href

  return (
    <li>
      <Link href={href} className={`flex items-center gap-4 font-semibold text-sm ${isActive ? 'text-gray-100' : 'text-gray-400'} hover:text-gray-100 transition duration-200 `}>
        <Icon size={24}/>
        {title}
      </Link>
    </li>
  )
}
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { MenuIcon } from 'lucide-react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import TradocumentLogo from '../logotradoc'

type Props = {}

const Navbar = async (props: Props) => {
  return(

   <header className="fixed w-full right-0 left-0 top-0 py-4 px-4 bg-black/40 backdrop-blur-lg z-[100] flex items-center border-b-[1px] border-neutral-900 justify-between">
      
      <aside className="flex items-center gap-[2px]">
        <Link href="/">
      <Image src="/logo-removebg-preview.png" alt="Logo" width={150} height={150} className="m-2 bg-transparent"/></Link>
    </aside>
    <nav className="flex justify-center items-center md:block">
        <ul className="flex items-center list-none space-between gap-4">
          
          <li className='text-white'>
            <Link href="/"  >Accueil</Link>
          </li>
          <li className='text-white'>
            <Link href="#">Traduction</Link>
          </li>
          <li className='text-white item-'>
            <Link href="/rejoindre">Rejoignez notre équipe</Link>
          </li>
          <li className='text-white'>
            <Link href="#">Nos services</Link>
          </li>
          <li className='text-white'>
            <Link href="#">Demande de devis</Link>
          </li>
          <li className='text-white'>
            <Link href="#">Transport coursier</Link>
          </li>
          <li className='text-white'>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <aside className="flex items-center gap-4">
        <Link
          href="/dashboard"
          className="relative inline-flex h-10 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            {true ? 'Dashboard' : 'Get Started'}
          </span>
        </Link>
        <MenuIcon className="md:hidden" />
      </aside>
  </header>
  )
}

export default Navbar
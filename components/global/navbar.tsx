"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { MenuIcon, XIcon } from "lucide-react"; // XIcon pour fermer le menu
import { useSession } from "next-auth/react";
import { LoginButton } from "../auth/login-button";
import { Button } from "../ui/button";

const Navbar = () => {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed w-full right-0 left-0 top-0 py-4 px-4 bg-black/40 backdrop-blur-lg z-[100] flex items-center border-b-[1px] border-neutral-900 justify-between">
      {/* Logo */}
      <aside className="flex items-center gap-[2px]">
        <Link href="/">
          <Image
            src="/logo-removebg-preview.png"
            alt="Logo"
            width={150}
            height={150}
            className="m-2 bg-transparent"
          />
        </Link>
      </aside>

      {/* Navigation pour desktop */}
      <nav className="hidden md:flex justify-center items-center">
        <ul className="flex items-center list-none space-between gap-4 ">
          <li className="text-white hover:text-[#F49C60] duration-500">
            <Link href="/">Accueil</Link>
          </li>
          <li className="text-white hover:text-[#F49C60] duration-500">
            <Link href="/translation">Traduction</Link>
          </li>
          <li className="text-white hover:text-[#F49C60] duration-500">
            <Link href="/rejoindre">Rejoignez notre équipe</Link>
          </li>
          <li className="text-white hover:text-[#F49C60] duration-500">
            <Link href="/services">Nos services</Link>
          </li>
          <li className="text-white hover:text-[#F49C60] duration-500">
            <Link href="/demandeDevis">Demande de devis</Link>
          </li>
          <li className="text-white hover:text-[#F49C60] duration-500">
            <Link href="#">Transport coursier</Link>
          </li>
          <li className="text-white hover:text-[#F49C60] duration-500">
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      {/* Bouton login/dashboard + menu burger pour mobile */}
      <aside className="flex items-center gap-4">
        {session ? (
          <Link
            href="/dashboard"
            className="relative inline-flex h-10 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              Dashboard
            </span>
          </Link>
        ) : (
          <LoginButton>
            <Button>Se connecter</Button>
          </LoginButton>
        )}

        {/* Menu Hamburger */}
        <div className="md:hidden">
          <MenuIcon
            className="text-white cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </div>
      </aside>

      {/* Menu déroulant pour mobile */}
      {menuOpen && (
        <nav className="absolute top-16 left-0 w-full bg-black/90 backdrop-blur-md p-6 flex flex-col space-y-4 z-[99]">
          <div className="flex justify-between items-center">
            <Link href="/">
              <Image
                src="/logo-removebg-preview.png"
                alt="Logo"
                width={120}
                height={120}
              />
            </Link>
            <XIcon
              className="text-white cursor-pointer"
              onClick={() => setMenuOpen(false)}
            />
          </div>

          <ul className="flex flex-col items-start list-none space-y-4">
            <li className="text-white text-lg">
              <Link href="/" onClick={() => setMenuOpen(false)}>Accueil</Link>
            </li>
            <li className="text-white text-lg">
              <Link href="/translation" onClick={() => setMenuOpen(false)}>Traduction</Link>
            </li>
            <li className="text-white text-lg">
              <Link href="/rejoindre" onClick={() => setMenuOpen(false)}>
                Rejoignez notre équipe
              </Link>
            </li>
            <li className="text-white text-lg">
              <Link href="/services" onClick={() => setMenuOpen(false)}>Nos services</Link>
            </li>
            <li className="text-white text-lg">
              <Link href="demandeDevis" onClick={() => setMenuOpen(false)}>Demande de devis</Link>
            </li>
            <li className="text-white text-lg">
              <Link href="#" onClick={() => setMenuOpen(false)}>Transport coursier</Link>
            </li>
            <li className="text-white text-lg">
              <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;



// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useState } from "react";
// import { MenuIcon, XIcon } from "lucide-react";
// import { useSession } from "next-auth/react";
// import { LoginButton } from "../auth/login-button";
// import { Button } from "../ui/button";

// const Navbar = () => {
//   const { data: session } = useSession();
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <header className="fixed w-full right-0 left-0 top-0 py-4 px-4 bg-black/40 backdrop-blur-lg z-[100] flex items-center border-b-[1px] border-neutral-900 justify-between">
//       {/* Logo */}
//       <aside className="flex items-center gap-[2px]">
//         <Link href="/">
//           <Image
//             src="/logo-removebg-preview.png"
//             alt="Logo"
//             width={150}
//             height={150}
//             className="m-2 bg-transparent"
//             priority={true} // Priorité pour éviter les décalages
//           />
//         </Link>
//       </aside>

//       {/* Navigation Desktop */}
//       <nav className="hidden md:flex justify-center items-center"> {/* Cacher sur mobile */}
//         <ul className="flex items-center list-none space-between gap-4">
//           <li className="text-white hover:text-[#F49C60] duration-500">
//             <Link href="/">Accueil</Link>
//           </li>
//           <li className="text-white hover:text-[#F49C60] duration-500">
//             <Link href="/translation">Traduction</Link>
//           </li>
//           <li className="text-white hover:text-[#F49C60] duration-500">
//             <Link href="/rejoindre">Rejoignez notre équipe</Link>
//           </li>
//           <li className="text-white hover:text-[#F49C60] duration-500">
//             <Link href="/services">Nos services</Link>
//           </li>
//           <li className="text-white hover:text-[#F49C60] duration-500">
//             <Link href="/demandeDevis">Demande de devis</Link>
//           </li>
//           <li className="text-white hover:text-[#F49C60] duration-500">
//             <Link href="/transport">Transport coursier</Link>
//           </li>
//           <li className="text-white hover:text-[#F49C60] duration-500">
//             <Link href="/contact">Contact</Link>
//           </li>
//         </ul>
//       </nav>

//       {/* Bouton login/dashboard + menu burger pour mobile */}
//       <aside className="flex items-center gap-4">
//         {session ? (
//           <Link
//             href="/dashboard"
//             className="relative inline-flex h-10 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
//           >
//             <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
//             <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
//               Dashboard
//             </span>
//           </Link>
//         ) : (
//           <LoginButton>
//             <Button>Se connecter</Button>
//           </LoginButton>
//         )}

//         {/* Menu Hamburger (Mobile uniquement) */}
//         <div className="md:hidden">  {/* Montré seulement sur mobile */}
//           {!menuOpen ? (
//             <MenuIcon
//               className="text-white cursor-pointer"
//               onClick={() => setMenuOpen(true)}
//             />
//           ) : (
//             <XIcon
//               className="text-white cursor-pointer"
//               onClick={() => setMenuOpen(false)}
//             />
//           )}
//         </div>
//       </aside>

//       {/* Menu déroulant mobile */}
//       {menuOpen && (
//         <nav
//           className={`md:hidden absolute top-16 left-0 w-full bg-black/90 backdrop-blur-md p-6 flex flex-col space-y-4 z-[99] transition-all duration-300 ease-in-out`}
//         >
//           <ul className="flex flex-col items-start list-none space-y-4">
//             <li className="text-white text-lg">
//               <Link href="/" onClick={() => setMenuOpen(false)}>Accueil</Link>
//             </li>
//             <li className="text-white text-lg">
//               <Link href="/translation" onClick={() => setMenuOpen(false)}>Traduction</Link>
//             </li>
//             <li className="text-white text-lg">
//               <Link href="/rejoindre" onClick={() => setMenuOpen(false)}>Rejoignez notre équipe</Link>
//             </li>
//             <li className="text-white text-lg">
//               <Link href="/services" onClick={() => setMenuOpen(false)}>Nos services</Link>
//             </li>
//             <li className="text-white text-lg">
//               <Link href="/demandeDevis" onClick={() => setMenuOpen(false)}>Demande de devis</Link>
//             </li>
//             <li className="text-white text-lg">
//               <Link href="/transport" onClick={() => setMenuOpen(false)}>Transport coursier</Link>
//             </li>
//             <li className="text-white text-lg">
//               <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
//             </li>
//           </ul>
//         </nav>
//       )}
//     </header>
//   );
// };

// export default Navbar;


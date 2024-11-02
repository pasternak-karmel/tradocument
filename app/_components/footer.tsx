// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
// import Link from "next/link"

// export default function Footer() {
//   return (
//     <footer className="w-full py-12 bg-gray-900 text-gray-100 mb-0">
//       <div className="container px-4 md:px-6">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold">Tradocument</h3>
//             <p className="text-sm text-gray-400">Simplifying document translations for businesses and individuals worldwide.</p>
//             <div className="flex space-x-4">
//               <Link href="#" aria-label="Facebook">
//                 <Facebook className="h-6 w-6 text-gray-400 hover:text-white transition-colors" />
//               </Link>
//               <Link href="#" aria-label="X">
//                 <Twitter className="h-6 w-6 text-gray-400 hover:text-white transition-colors" />
//               </Link>
//               <Link href="#" aria-label="Instagram">
//                 <Instagram className="h-6 w-6 text-gray-400 hover:text-white transition-colors" />
//               </Link>
//               <Link href="#" aria-label="LinkedIn">
//                 <Linkedin className="h-6 w-6 text-gray-400 hover:text-white transition-colors" />
//               </Link>
//             </div>
//           </div>
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold">Contact Us</h3>
//             <div className="flex items-center space-x-2">
//               <MapPin className="h-5 w-5 text-gray-400" />
//               <span className="text-sm text-gray-300">123 Translation Ave, Language City, 12345</span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <Phone className="h-5 w-5 text-gray-400" />
//               <span className="text-sm text-gray-300">+1 (555) 123-4567</span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <Mail className="h-5 w-5 text-gray-400" />
//               <span className="text-sm text-gray-300">info@tradocument.com</span>
//             </div>
//           </div>
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold">Our Location</h3>
//             <div className="relative h-48 rounded-lg overflow-hidden bg-gray-800">
//               <div className="absolute inset-0 bg-gray-700 animate-pulse"></div>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <MapPin className="h-12 w-12 text-[#F49C60]" />
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="mt-8 pt-8 border-t border-gray-800">
//           <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
//             <p className="text-sm text-center md:text-left text-gray-400">© 2024 Tradocument. Tout droit réservés.</p>
//             <nav className="flex space-x-4">
//               <Link className="text-sm text-gray-400 hover:text-white transition-colors" href="#">
//                 Termes et services
//               </Link>
//               <Link className="text-sm text-gray-400 hover:text-white transition-colors" href="#">
//                 Privacy Policy
//               </Link>
//               <Link className="text-sm text-gray-400 hover:text-white transition-colors" href="#">
//                 Cookie Policy
//               </Link>
//             </nav>
//           </div>
//         </div>
//         <div className="mt-8">
//           <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
//           <form className="flex space-x-2">
//             <Input
//               className="max-w-lg flex-1 bg-gray-800 text-white placeholder:text-gray-500 border-gray-700 focus:border-blue-500"
//               placeholder="Enter your email"
//               type="email"
//             />
//             <Button className="bg-[#F49C60] text-white" type="submit">
//               Subscribe
//             </Button>
//           </form>
//         </div>
//       </div>
//     </footer>
//   )
// }

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import Link from "next/link";

interface SocialIconProps {
  href: string;
  icon: React.ElementType;
  label: string;
}

const SocialIcon = ({ href, icon: Icon, label }: SocialIconProps) => (
  <Link href={href} aria-label={label} className="group relative">
    <Icon className="h-6 w-6 text-gray-400 group-hover:text-white transition-colors" />
    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
      {label}
    </span>
  </Link>
);

export default function Footer() {
  return (
    <footer className="w-full py-12 bg-gray-900 text-gray-100 mb-0">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Tradocument</h3>
            <p className="text-sm text-gray-400">
              Simplifier les traductions de documents pour les entreprises t les particulirs du monde entiers
            </p>
            <div className="flex space-x-4">
              <SocialIcon href="#" icon={Facebook} label="Facebook" />
              <SocialIcon
                href="#"
                icon={() => (
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                )}
                label="Twitter"
              />
              <SocialIcon href="#" icon={Instagram} label="Instagram" />
              <SocialIcon href="#" icon={Linkedin} label="LinkedIn" />
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contactez-nous</h3>
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-300">
                123 Avenue de la traduction, Ville des Langues, 12345
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-300">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-300">
                info@tradocument.com
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Notre emplacement</h3>
            <div className="relative h-48 rounded-lg overflow-hidden bg-gray-800">
              <div className="absolute inset-0 bg-gray-700 animate-pulse"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <MapPin className="h-12 w-12 text-[#F49C60]" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-center md:text-left text-gray-400">
              © 2024 Tradocument. Tout droit réservés.
            </p>
            <nav className="flex space-x-4">
              <Link
                className="text-sm text-gray-400 hover:text-white transition-colors"
                href="/termes-et-services"
              >
                Termes et services
              </Link>
              <Link
                className="text-sm text-gray-400 hover:text-white transition-colors"
                href="/politique-de-confidentialite"
              >
                Politique de confidentialité
              </Link>
              <Link
                className="text-sm text-gray-400 hover:text-white transition-colors"
                href="/politique-de-cookies"
              >
                Politique de Cookie
              </Link>
            </nav>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Restez à jour</h3>
          <form className="flex space-x-2">
            <Input
              className="max-w-lg flex-1 bg-gray-800 text-white placeholder:text-gray-500 border-gray-700 focus:border-blue-500"
              placeholder="Entrez votre email"
              type="email"
            />
            <Button className="bg-[#F49C60] text-white" type="submit">
              S'abonner
            </Button>
          </form>
        </div>
      </div>
    </footer>
  );
}

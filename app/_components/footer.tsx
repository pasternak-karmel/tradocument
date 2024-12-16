import React from 'react'
import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react'


interface socialProps {
  Icon: any;
  href: string;
  label: string;
}
const SocialIcon = ({ Icon, href, label }: socialProps) => (
  <a href={href} aria-label={label} className="text-gray-400 hover:text-white transition-colors">
    <Icon className="h-5 w-5" />
  </a>
)

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Tradocument</h3>
            <p className="text-sm">
              Simplifier les traductions de documents pour les entreprises et les particuliers du monde entier.
            </p>
            <div className="flex space-x-4">
              <SocialIcon Icon={Facebook} href="#" label="Facebook" />
              <SocialIcon Icon={Twitter} href="#" label="Twitter" />
              <SocialIcon Icon={Instagram} href="#" label="Instagram" />
              <SocialIcon Icon={Linkedin} href="#" label="LinkedIn" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Liens rapides</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/apropos" className="hover:text-white transition-colors">À propos</Link>
              <Link href="/services" className="hover:text-white transition-colors">Nos services</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </nav>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <span className="text-sm">123 Avenue de la traduction, 75001 Paris</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <span className="text-sm">+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <span className="text-sm">contact@tradocument.com</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Newsletter</h3>
            <p className="text-sm">Restez informé de nos dernières offres et actualités.</p>
            <form className="flex space-x-2">
              <Input
                className="flex-1 bg-gray-800 border-gray-700 focus:border-blue-500 text-white"
                placeholder="Votre email"
                type="email"
              />
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                S'abonner
              </Button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © 2024 Tradocument. Tous droits réservés.
            </p>
            <nav className="flex flex-wrap justify-center space-x-4 mt-4 md:mt-0">
              <Link href="/legalTerms" className="text-sm text-gray-400 hover:text-white transition-colors">
                Mentions légales
              </Link>
              <Link href="/termes-et-services" className="text-sm text-gray-400 hover:text-white transition-colors">
                CGU
              </Link>
              <Link href="/politique-de-cookies" className="text-sm text-gray-400 hover:text-white transition-colors">
              Politique de gestion des cookies
              </Link>
              <Link href="/politique-confidentialite" className="text-sm text-gray-400 hover:text-white transition-colors">
                Politique de confidentialité
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}


            {/* <Link
              href="/legalTerms"
              className="hover:text-gray-300 transition-colors"
            >
              Mentions Légales
            </Link>
            <Link
              href="/termes-et-services"
              className="hover:text-gray-300 transition-colors"
            >
              Conditions générales d'utilisation
            </Link>
            <Link
              href="/politique-de-cookies"
              className="hover:text-gray-300 transition-colors"
            >
              Politique de gestion des cookies
            </Link>
            <Link
              href="/politique-de-confidentialite"
              className="hover:text-gray-300 transition-colors"
            >
              Politique de Confidentialité et de Protection des données
            </Link> */}
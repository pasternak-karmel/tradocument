import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full py-12 bg-gray-900 text-gray-100">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">TraDocument</h3>
            <p className="text-sm text-gray-400">Simplifying document translations for businesses and individuals worldwide.</p>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook">
                <Facebook className="h-6 w-6 text-gray-400 hover:text-white transition-colors" />
              </Link>
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-6 w-6 text-gray-400 hover:text-white transition-colors" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Instagram className="h-6 w-6 text-gray-400 hover:text-white transition-colors" />
              </Link>
              <Link href="#" aria-label="LinkedIn">
                <Linkedin className="h-6 w-6 text-gray-400 hover:text-white transition-colors" />
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-300">123 Translation Ave, Language City, 12345</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-300">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-300">info@tradocument.com</span>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Our Location</h3>
            <div className="relative h-48 rounded-lg overflow-hidden bg-gray-800">
              <div className="absolute inset-0 bg-gray-700 animate-pulse"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <MapPin className="h-12 w-12 text-blue-500" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-center md:text-left text-gray-400">© 2024 TraDocument. All rights reserved.</p>
            <nav className="flex space-x-4">
              <Link className="text-sm text-gray-400 hover:text-white transition-colors" href="#">
                Terms of Service
              </Link>
              <Link className="text-sm text-gray-400 hover:text-white transition-colors" href="#">
                Privacy Policy
              </Link>
              <Link className="text-sm text-gray-400 hover:text-white transition-colors" href="#">
                Cookie Policy
              </Link>
            </nav>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
          <form className="flex space-x-2">
            <Input
              className="max-w-lg flex-1 bg-gray-800 text-white placeholder:text-gray-500 border-gray-700 focus:border-blue-500"
              placeholder="Enter your email"
              type="email"
            />
            <Button className="bg-blue-600 text-white hover:bg-blue-700" type="submit">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </footer>
  )
}
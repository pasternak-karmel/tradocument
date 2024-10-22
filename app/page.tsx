import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Globe, Shield, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import { NavBar } from "@/components/ui/_components/navigation"

export default function TraDocumentLanding() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Link className="flex items-center space-x-2" href="#">
              <FileText className="h-6 w-6" />
              <span className="inline-block font-bold">TraDocument</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-1">
              <Link className=" text-sm font-medium text-muted-foreground transition-colors hover:text-primary" href="#">
                Features
              </Link>
              <Link className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary" href="#">
                Pricing
              </Link>
              <Link className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary" href="#">
                About
              </Link>
              <Link className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary" href="#">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header> */}
      <div  className="flex justify-center items-center "><NavBar/></div>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Simplify Your Document Translations
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  TraDocument helps you translate and certify your documents quickly and easily. Perfect for immigration,
                  education, and business needs.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
                  <Button type="submit">Get Started</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Why Choose TraDocument?
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <Globe className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Global Network</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Access translators from around the world for accurate translations.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Shield className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Certified Translations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Get certified translations accepted by government agencies and institutions.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Clock className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Fast Turnaround</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Receive your translated documents quickly, often within 24 hours.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Streamline Your Document Translation Process
                </h2>
                <p className="text-gray-500 md:text-xl dark:text-gray-400">
                  TraDocument makes it easy to get your documents translated and certified. Our platform connects you with
                  expert translators and simplifies the entire process.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <ArrowRight className="h-5 w-5 text-primary" />
                    <span>Upload your documents securely</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <ArrowRight className="h-5 w-5 text-primary" />
                    <span>Get instant quotes</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <ArrowRight className="h-5 w-5 text-primary" />
                    <span>Track your translation progress</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <ArrowRight className="h-5 w-5 text-primary" />
                    <span>Download certified translations</span>
                  </li>
                </ul>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full max-w-lg aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                  <div className="relative flex items-center justify-center w-full h-full">
                    <Card className="w-64 h-64">
                      <CardContent className="flex flex-col items-center justify-center h-full text-center p-6">
                        <FileText className="h-16 w-16 mb-4 text-primary" />
                        <p className="text-xl font-semibold">Your documents, translated and certified</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Simplify Your Document Translations?
                </h2>
                <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl">
                  Join thousands of satisfied customers who trust TraDocument for their translation needs.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1 bg-primary-foreground text-primary placeholder:text-primary/50" placeholder="Enter your email" type="email" />
                  <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90" type="submit">
                    Get Started
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 TraDocument. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
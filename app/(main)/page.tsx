import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, ArrowRight } from "lucide-react";
import FeaturesSection from "@/components/ui/avantages";
import Link from "next/link";

export default function TraDocumentLanding() {
  return (
    <div className="flex flex-col ">
      <main className="flex-grow">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 ">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Simplifiez les traductions de vos documents
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Tradocument.com vous propose des solutions linguistiques
                  harmonisées et d&apos; une fiabilité absolue
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Link href="/apropos">
                  <Button>A propos</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <FeaturesSection />
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Streamline Your Document Translation Process
                </h2>
                <p className="text-gray-500 md:text-xl dark:text-gray-400">
                  TraDocument makes it easy to get your documents translated and
                  certified. Our platform connects you with expert translators
                  and simplifies the entire process.
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
                        <p className="text-xl font-semibold">
                          Your documents, translated and certified
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

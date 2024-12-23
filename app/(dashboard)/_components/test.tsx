"use client";

import { usePathname, useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

interface OptionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

interface DevisModalProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const Test = ({
  children,
  mode = "modal",
  asChild,
}: DevisModalProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = (route: string) => {
    if (mode === "modal") {
      setIsOpen(false);
    }
    router.push(route);
  };

  const content = (
    <div className="flex lg:flex-row w-full max-w-7xl mx-auto bg-white rounded-2xl overflow-hidden shadow-2xl">
      <div className="relative w-full lg:w-1/2 h-full lg:h-auto">
        <Image
          src="/admin.jpeg"
          alt="Professional Translation Services"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Traductions Professionnelles</h1>
            <p className="text-xl text-blue-100">Des solutions de traduction sur mesure pour tous vos besoins</p>
          </div>
        </div>
      </div>
      
      <div className="w-full lg:w-1/2 p-8 lg:p-12 space-y-8">
        <div className="text-center lg:text-left">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Choisissez Votre Option</h2>
          <p className="text-gray-600 text-lg">
            Sélectionnez l'option qui correspond le mieux à votre situation.
          </p>
        </div>
        
        <div className="space-y-6">
          <OptionCard
            icon={
              <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 2V5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 2V5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3.5 9.09H20.5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
            title="J'ai le Document"
            description="Téléchargez votre document et recevez un devis instantané pour une traduction professionnelle."
            onClick={() => handleButtonClick("/nouvelleDevis")}
          />
          <OptionCard
            icon={
              <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 2V6" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 2V6" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 9H21" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 4H5C3.895 4 3 4.895 3 6V19C3 20.105 3.895 21 5 21H19C20.105 21 21 20.105 21 19V6C21 4.895 20.105 4 19 4Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
            title="Je n'ai pas le Document"
            description="Nous nous occupons de tout ! Nous récupérerons le document via une procuration avant de le traduire."
            onClick={() => handleButtonClick("/nouvelle_devis")}
          />
        </div>
      </div>
    </div>
  );

  if (mode === "modal") {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[1200px] p-0">
          {content}
        </DialogContent>
      </Dialog>
    );
  }

  return content;
};

function OptionCard({
  icon,
  title,
  description,
  onClick,
}: OptionCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="group bg-white rounded-xl p-6 cursor-pointer transition-all duration-300
                 border border-gray-100 hover:border-blue-200
                 shadow-sm hover:shadow-xl
                 flex items-start space-x-4"
    >
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center
                        group-hover:bg-blue-600 transition-colors duration-300">
          <div className="text-blue-600 group-hover:text-white transition-colors duration-300">
            {icon}
          </div>
        </div>
      </div>
      <div className="flex-grow">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
          {description}
        </p>
      </div>
      <div className="flex-shrink-0 self-center">
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center
                        group-hover:bg-blue-600 transition-colors duration-300">
          <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.91003 19.9201L15.43 13.4001C16.2 12.6301 16.2 11.3701 15.43 10.6001L8.91003 4.08008" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </motion.div>
  );
}


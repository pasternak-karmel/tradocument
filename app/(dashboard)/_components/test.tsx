"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

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
    <div className="w-full max-w-3xl mx-auto bg-white rounded-xl p-8">
      <div className="text-center mb-8">
        <p className="text-gray-700 text-lg mb-2">
          Nous sommes là pour vous aider à obtenir la meilleure traduction
          possible.
        </p>
        <p className="text-gray-700 text-lg">
          Sélectionnez l'option qui correspond le mieux à votre situation.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <OptionCard
          icon={
            <svg
              className="w-12 h-12 text-blue-600"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 2V5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 2V5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.5 9.09H20.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.6947 13.7H15.7037"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.6947 16.7H15.7037"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.9955 13.7H12.0045"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.9955 16.7H12.0045"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.29431 13.7H8.30329"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.29431 16.7H8.30329"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          title="J'ai le Document"
          description="Téléchargez votre document et recevez un devis instantané pour une traduction professionnelle."
          onClick={() => handleButtonClick("/nouvelle_devis")}
        />
        <OptionCard
          icon={
            <svg
              className="w-12 h-12 text-blue-600"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 2V6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 2V6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 9H21"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19 4H5C3.895 4 3 4.895 3 6V19C3 20.105 3.895 21 5 21H19C20.105 21 21 20.105 21 19V6C21 4.895 20.105 4 19 4Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 12L8 16L12 20"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 16H16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          title="Je n'ai pas le Document"
          description="Nous nous occupons de tout ! Nous récupérerons le document via une procuration avant de le traduire."
          onClick={() => handleButtonClick("/nouvelleDevis")}
        />
      </div>
    </div>
  );

  if (mode === "modal") {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[900px] p-0 bg-white">
          {content}
        </DialogContent>
      </Dialog>
    );
  }

  return content;
};

function OptionCard({ icon, title, description, onClick }: OptionCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg p-6 cursor-pointer border border-gray-100 hover:border-blue-600 transition-colors duration-200 flex flex-col items-center text-center group"
    >
      <div className="mb-4 text-blue-600">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.4301 5.92993L20.5001 11.9999L14.4301 18.0699"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.5 12H20.33"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

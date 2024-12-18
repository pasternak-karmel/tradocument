"use client";

import { ArrowRight } from 'lucide-react';
import Marquee from "@/components/ui/marquee";

const languages = [
  { id: 1, from: "Français", to: "Arabe" },
  { id: 2, from: "Anglais", to: "Français" },
  { id: 3, from: "Espagnol", to: "Français" },
  { id: 4, from: "Arabe", to: "Anglais" },
];

const Language = ({ from, to, reverse = false }: { from: string; to: string; reverse?: boolean }) => (
  <div className="flex items-center justify-center bg-white/10 backdrop-blur-md rounded-lg p-4 mx-2 min-w-[250px] transition-all duration-300 hover:bg-white/20 hover:scale-105 shadow-lg">
    <span className={`w-1/3 text-sm font-medium ${reverse ? 'text-left' : 'text-right'}`}>{from}</span>
    <ArrowRight className={`mx-4 text-blue-400 ${reverse ? 'rotate-180' : ''}`} />
    <span className={`w-1/3 text-sm font-medium ${reverse ? 'text-right' : 'text-left'}`}>{to}</span>
  </div>
);

export default function LanguageCarrousel() {
  return (
    <div className="w-full overflow-hidden py-8">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-neutral-950 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-neutral-950 to-transparent z-10" />
        <Marquee className="py-4" velocity={25}>
          {languages.concat(languages).map((lang, index) => (
            <Language key={`${lang.id}-${index}`} {...lang} />
          ))}
        </Marquee>
      </div>
      <div className="relative mt-4">
        <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-neutral-950 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-neutral-950 to-transparent z-10" />
        <Marquee className="py-4" velocity={-25}>
          {languages.concat(languages).map((lang, index) => (
            <Language key={`${lang.id}-reverse-${index}`} from={lang.to} to={lang.from} reverse />
          ))}
        </Marquee>
      </div>
    </div>
  );
}


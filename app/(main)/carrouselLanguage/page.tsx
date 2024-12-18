"use client";
import Marquee from "@/components/ui/marquee";
import { ArrowRight } from "lucide-react";

const languages = [
  { id: 1, from: "Français", to: "Arabe" },
  { id: 2, from: "Anglais", to: "Français" },
  { id: 3, from: "Espagnol", to: "Français" },
  { id: 4, from: "Arabe", to: "Anglais" },
  { id: 5, from: "Français", to: "Arabe" },
  { id: 6, from: "Anglais", to: "Français" },
  { id: 7, from: "Espagnol", to: "Français" },
  { id: 8, from: "Arabe", to: "Anglais" },
];

const thirdRow = languages.slice(0, languages.length / 2);
const fourthRow = languages.slice(languages.length / 2);

const Language = ({ from, to }: { from: string; to: string }) => (
  <div className="flex items-center justify-center bg-white/5 rounded-lg p-3">
    <span className="w-1/3 text-right text-sm">{from}</span>
    <ArrowRight className="mx-4 text-blue-400" />
    <span className="w-1/3 text-left text-sm">{to}</span>
  </div>
);

export default function LanguageCarrousel() {
  return (
    <div className="">
      <Marquee pauseOnHover className="[--duration:20s]">
        {thirdRow.map((review) => (
          <Language key={review.id} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {fourthRow.map((review) => (
          <Language key={review.id} {...review} />
        ))}
      </Marquee>
    </div>
  );
}

// relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl

'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

const FeatureAccueil = () => {
  const services = [
    {
      title: "Traduction",
      image: "/traduction.jpg",
      description:
        "Bénéficiez de notre expertise en traduction pour vous aider à réussir votre projet.",
    },
    {
      title: "Récupération de vos documents",
      image: "/recuperation.jpg",
      description:
        " Nous vous accompagnons dans la récupération de vos documents",
    },
    {
      title: "Expertise Technique",
      image: "/expertise.jpg",
      description:
        " Notre équipe de techniciens vous accompagne dans vos processus de récupération et de traduction",
    },
    {
      title: "Juridique",
      image: "/juridique.jpg",
      description:
        " Nous proposons des services de traduction juridique précis et fiables, assurant une parfaite conformité aux exigences légales et une fidélité au contenu original.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % services.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full relative h-[60vh]">
      {services.map((service, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={service.image}
            alt={service.title}
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-8">
            <h3 className="text-4xl font-bold mb-4">{service.title}</h3>
            <p className="text-xl text-center max-w-2xl">{service.description}</p>
          </div>
        </div>
      ))}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        {services.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full mx-1 ${
              index === currentSlide ? 'bg-white' : 'bg-gray-400'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FeatureAccueil;


"use client";

import { FaFileAlt, FaHandHolding, FaPaperPlane } from "react-icons/fa";

const IconsSections = () => {
  return (
    <div className="w-full p-8">
      <div className="container mx-auto flex justify-around items-center">
        <div className="flex flex-col items-center">
          <FaFileAlt className="text-4xl text-blue-600" />
          <p className="text-lg font-medium mt-2">Traduction Officielle</p>
        </div>

        <div className="flex flex-col items-center">
          <FaHandHolding className="text-4xl text-blue-600" />
          <p className="text-lg font-medium mt-2">Assistant Administratif</p>
        </div>

        <div className="flex flex-col items-center">
          <FaPaperPlane className="text-4xl text-blue-600" />
          <p className="text-lg font-medium mt-2">Livraison</p>
        </div>
      </div>
    </div>
  );
};

export default IconsSections;

"use client";
import { motion } from "framer-motion";
import { CheckCircle, Clock, CreditCard, FileText } from 'lucide-react';
import Image from "next/image";

export default function TradocumentPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br mt-10 from-blue-50 to-indigo-100">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        initial="initial"
        animate="animate"
        variants={stagger}
      >
        <motion.h1
          className="text-4xl sm:text-5xl font-extrabold text-blue-600 mb-16 text-center"
          variants={fadeInUp}
        >
          À PROPOS DE NOUS
        </motion.h1>

        {/* Section 1 */}
        <motion.section
          className="bg-white rounded-2xl shadow-xl overflow-hidden mb-16"
          variants={fadeInUp}
        >
          <div className="md:flex">
            <div className="md:flex-1 p-8 md:p-12">
              <h2 className="text-3xl font-bold text-blue-600 mb-6">
                Traductions officielles (Assermentées et certifiées)
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  La traduction assermentée, ou traduction certifiée, est un type de
                  traduction réalisé par un expert-traducteur assermenté auprès
                  d&apos;une Cour d&apos;Appel ou, dans certaines conditions, par un
                  traducteur assermenté auprès d&apos;un TGI en fonction du pays de
                  destination du document certifié.
                </p>
                <p>
                  L&apos;expert-traducteur assermenté est une personne physique
                  inscrite sur une liste d&apos;experts judiciaires établie par une
                  commission spéciale qui siège, en général une fois par an, dans
                  les Cours d&apos;Appels. Le traducteur assermenté établi par le
                  Procureur de la République de chaque Tribunal de Grande Instance.
                </p>
                <p>
                  Nul ne peut se prétendre ni expert-traducteur assermenté, ni
                  traducteur assermenté s&apos;il n&apos;est pas désigné à cette
                  fonction par la Commission de la Cour d&apos;Appel ou par le
                  Procureur de la République. Ce traducteur, particulièrement
                  compétent dans le domaine juridique, a officiellement prêté
                  serment et sa certification fait foi devant les tribunaux et les
                  administrations.
                </p>
                <p>
                  Si vous recherchez des services de traduction rapides et de
                  qualité optimale, Tradocument.com vous propose des solutions
                  linguistiques harmonisées et d&apos;une fiabilité absolue. Nous
                  sommes en mesure de vous proposer des traductions pertinentes
                  adaptées à un domaine particulier. Tradocument.com travaille avec
                  plusieurs traducteurs assermentés en langues maternelles, très
                  expérimentés dans leurs domaines de spécialisation respectifs.
                  Nous traduisons et certifions vos documents officiels.
                </p>
              </div>
            </div>
            <div className="md:flex-1">
              <Image
                src="/admin.jpeg"
                width={800}
                height={600}
                alt="Traduction officielle"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.section>

        {/* Section 2 */}
        <motion.section
          className="bg-white rounded-2xl shadow-xl overflow-hidden mb-16"
          variants={fadeInUp}
        >
          <div className="md:flex flex-row-reverse">
            <div className="md:flex-1 p-8 md:p-12">
              <h2 className="text-3xl font-bold text-blue-600 mb-6">
                Traductions officielles (Assermentées et certifiées)
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  La traduction assermentée, ou traduction certifiée, est un type de
                  traduction réalisé par un expert-traducteur...
                </p>
                <p>
                  Tradocument.com propose un service de traduction certifiée et
                  assermentée dans les combinaisons des langues suivantes : Arabe,
                  Français, Anglais et Espagnole En plus du prix de la traduction,
                  qui est d&apos;environ mettre la fourchette des prix du …aupar page,
                  les services officiels sont facturés
                </p>
              </div>
            </div>
            <div className="md:flex-1">
              <Image
                src="/le2.jpg"
                width={800}
                height={600}
                alt="Traduction certifiée"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.section>

        {/* Nos services de traduction */}
        <motion.section
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-16"
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">
            Nos services de traduction
          </h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={stagger}
          >
            {[
              "Actes d'états civil",
              "Affaires & Business",
              "Diplôme & Bulletins",
              "Finance & Commerciale",
              "Juridique",
              "Technique",
              "Permis de Conduire",
              "Autres",
            ].map((category, index) => (
              <motion.div
                key={index}
                className="flex items-center bg-blue-50 p-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:bg-blue-100"
                variants={fadeInUp}
              >
                <FileText className="text-blue-500 mr-3 w-6 h-6" />
                <span className="text-gray-800 font-medium">{category}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Pourquoi nous choisir */}
        <motion.section
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">
            Pourquoi nous choisir
          </h2>
          <motion.div className="grid md:grid-cols-3 gap-8" variants={stagger}>
            <motion.div className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:bg-blue-100" variants={fadeInUp}>
              <CheckCircle className="text-green-500 w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Garantie de qualité
              </h3>
              <p className="text-gray-700">
                Nous accompagnons les meilleurs traducteurs du monde...
              </p>
            </motion.div>
            <motion.div className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:bg-blue-100" variants={fadeInUp}>
              <Clock className="text-blue-500 w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Livraison dans les délais
              </h3>
              <p className="text-gray-700">
                Nous offrons les meilleurs niveaux de performance...
              </p>
            </motion.div>
            <motion.div className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:bg-blue-100" variants={fadeInUp}>
              <CreditCard className="text-purple-500 w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Règlement avant la livraison
              </h3>
              <p className="text-gray-700">
                Vous pouvez payer avant la livraison de la traduction...
              </p>
            </motion.div>
          </motion.div>
        </motion.section>
      </motion.div>
    </div>
  );
}


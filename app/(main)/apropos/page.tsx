'use client'
import { motion } from 'framer-motion'
import { FileText, Clock, CreditCard, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import Navbar from '@/components/global/navbar'
import Footer from '@/app/_components/footer'

export default function TradocumentPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
    <Navbar/>
      <motion.div
        className=""
        initial="initial"
        animate="animate"
        variants={stagger}
        mb-3
      >
        <motion.h1
          className="text-4xl font-bold text-black mb-8 text-center"
          variants={fadeInUp}
        >
          A propos de nous 
        </motion.h1>

        <motion.section className="flex bg-white rounded-lg shadow-lg p-6 mb-8" variants={fadeInUp} >
          <div className='m-3'>
            <h2 className="text-2xl font-semibold text-[#F49C60] mb-4">
            Traductions officielles (Assermentées et certifiées)
          </h2>
          <p className="text-gray-700 mb-4">
            La traduction assermentée, ou traduction certifiée, est un type de traduction réalisé par un expert-traducteur assermenté auprès d&apos;une Cour d&apos;Appel ou, dans certaines conditions, par un traducteur assermenté auprès d&apos;un TGI en fonction du pays de destination du document certifié.
          </p>
          <p className="text-gray-700">
            La traduction assermentée concerne les documents juridiques et légaux ; elle est destinée aux administrations, aux appels d&apos;offres, et peut être nécessaire pour l&apos;obtention de visas, ou pour d&apos;autres démarches dans le cadre d&apos;une implantation à l&apos;étranger par exemple.
          </p>
          <p className="text-gray-700">
          L&apos;expert-traducteur assermenté est une personne physique inscrite sur une liste d&apos;experts judiciaires établie par une commission spéciale qui siège, en général une fois par an, dans les Cours d&apos;Appels. Le traducteur assermenté  établi par le Procureur de la République de chaque Tribunal de Grande Instance.
Nul ne peut se prétendre ni expert-traducteur assermenté, ni traducteur assermenté s&apos;il n&apos;est pas désigné à cette fonction par la Commission de la Cour d&apos;Appel ou par le Procureur de la République. Ce traducteur, particulièrement compétent dans le domaine juridique, a officiellement prêté serment et sa certification fait foi devant les tribunaux et les administrations .
Si vous recherchez des services de traduction rapides et de qualité optimale,Tradocument.com vous propose des solutions linguistiques harmonisées et d&apos;une fiabilité absolue. Nous sommes en mesure de vous proposer des traductions pertinentes adaptés à un domaine particulier.
Tradocument.com travaille avec plusieurs traducteurs assermentés en langues maternelles, très expérimentés dans leurs domaines de spécialisation respectifs.
          </p>
          </div>
          
          <Image src='/admin.jpeg' width={400} height={300} alt='' className='rounded-xl'/>
        </motion.section>
        <motion.section className="flex bg-white rounded-lg shadow-lg p-6 mb-8" variants={fadeInUp} >
        <Image src='/le2.jpg' width={400} height={400} alt='' className='rounded-xl'/>
          <div className='m-3'>
            <h2 className="text-2xl font-semibold text-[#F49C60] mb-4">
            Traductions officielles (Assermentées et certifiées)
          </h2>
          <p className="text-gray-700 mb-4">
            La traduction assermentée, ou traduction certifiée, est un type de traduction réalisé par un expert-traducteur assermenté auprès d&apos;une Cour d&apos;Appel ou, dans certaines conditions, par un traducteur assermenté auprès d&apos;un TGI en fonction du pays de destination du document certifié.
          </p>
          <p className="text-gray-700">
            La traduction assermentée concerne les documents juridiques et légaux ; elle est destinée aux administrations, aux appels d&apos;offres, et peut être nécessaire pour l&apos;obtention de visas, ou pour d&apos;autres démarches dans le cadre d&apos;une implantation à l&apos;étranger par exemple.
          </p>
          <p className="text-gray-700">
          
Tradocument.com propose un service de traduction certifiée et assermentée dans les combinaisons des langues suivantes : Arabe, Français, Anglais et Espagnole
En plus du prix de la traduction, qui est d&apos;environ mettre la fourchette des prix du …aupar page
          </p>
          </div>
          
          
        </motion.section>

        <motion.section className="bg-white rounded-lg shadow-lg p-6 mb-8" variants={fadeInUp}>
          <h2 className="text-2xl font-semibold text-[#F49C60] mb-4">
            Nos services de traduction
          </h2>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4" variants={stagger}>
            {[
              "Actes d'états civil",
              "Affaires & Business",
              "Diplôme & Bulletins",
              "Finance & Commerciale",
              "Juridique",
              "Technique",
              "Permis de Conduire",
              "Autres"
            ].map((category, index) => (
              <motion.div
                key={index}
                className="flex items-center bg-blue-50 p-4 rounded-lg"
                variants={fadeInUp}
              >
                <FileText className="text-blue-500 mr-3" />
                <span className="text-gray-800">{category}</span>
              </motion.div>
            ))}
          </motion.div>
          <p className="mt-4 text-gray-700">
            Prix à partir de 40,00 € par document
          </p>
        </motion.section>
        
        
        <motion.section className="bg-white rounded-lg shadow-lg p-6 mb-8" variants={fadeInUp}>
          <h2 className="text-2xl font-semibold text-[#F49C60] mb-4 justify-center items-center">
            Pourquoi nous choisir
          </h2>
          <motion.div className="space-y-4" variants={stagger}>
            <motion.div className="flex items-start" variants={fadeInUp}>
              <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-800">Garantie de qualité</h3>
                <p className="text-gray-700">
                  Nous accompagnons les meilleurs traducteurs du monde avec des processus d&apos;assurance qualité avancés. Et ce n&apos;est pas tout : nous vous proposons une révision complète et gratuite de la traduction si vous n&apos;êtes pas satisfait(e).
                </p>
              </div>
            </motion.div>
            <motion.div className="flex items-start" variants={fadeInUp}>
              <Clock className="text-blue-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-800">Livraison dans les délais</h3>
                <p className="text-gray-700">
                  Nous offrons les meilleurs niveaux de performance du secteur, avec un flux de travail optimisé qui garantit que plus de 100 % des traductions sont livrées à temps. De plus, dans le cas peu probable où nous raterions un délai, nous vous rembourserons la traduction jusqu&apos;à hauteur de son coût total.
                </p>
              </div>
            </motion.div>
            <motion.div className="flex items-start" variants={fadeInUp}>
              <CreditCard className="text-purple-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-800">Règlement avant la livraison</h3>
                <p className="text-gray-700">
                  Vous pouvez payer avant la livraison de la traduction par carte de crédit, ou PayPal.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.div
          className="text-center"
          variants={fadeInUp}
        >
          <motion.button
            className="mb-2 bg-[#F49C60] text-white px-6 py-3 rounded-full font-semibold flex items-center justify-center mx-auto hover:bg-blue-700 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Demandez un devis gratuit
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
      <Footer/>
    </>
  )
}

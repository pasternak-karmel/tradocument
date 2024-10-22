"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
// import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Aide administratif",
    href: "/aides",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Livraison",
    href: "/livraison",
    description:
      "For sighted users to preview content available behind a link.",
  },
]

export function NavBar() {
  return (

    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Traduction</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <ListItem href="/actes" title="Actes d'état civile">
                Acte de naissance, Acte de mariage, Acte de décès, Acte de naturalisation/ Nationalité, Acte de reconnaissance, Carte d&apos;identité, Certificat de changement de nom, Certificat de célibat, Déclaration sur l&apos;honneur, Livret de famille, Procuration, Permis de séjour,Passeport.
                </ListItem>
                
              
              <ListItem href="/affaire" title="Affaires & Business">
                Bilan, Contrat, Convention
              </ListItem>
              <ListItem href="/diplomes" title="Diplome & Bulletins">
                Attestation étude, Attestation de scolarité, Attestation de Stage, Diplome baccalauréat, Relevé de notes Bac / Relevé de notes universitaires avec appréciations, Diplome 
              </ListItem>
              <ListItem href="/finance" title="Finance & Commerciale">
                Relevé de compte, Avis d&apos;imposition, Fiche de paye/ Bulletin de salaire, Attestation de retraite/ Sécurité sociale, Facture/ Attestation Bancaire
              </ListItem>
              <ListItem href="/juridique" title="Juridique">
                Acte de divorce, Acte notorié, Assignations et jugements, Casier judiciaire, Exequatur, Testament, Procuration juridique 
              </ListItem>
              <ListItem href="/permis" title="Permis de Conduire">
                
              </ListItem>
              <ListItem href="/techniques" title="Technique">
              Appels d&apos;offre, Brevets, Brochures, Cahiers des charges, Catalogues produits, Journaux d&apos;entreprise, Manuels et notices techniques, Newsletters spécialisées, Normes, Rapports d&apos;expertise, Rapports techniques
              </ListItem>
              <ListItem href="/autres" title="Autres">
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Nos Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/procuration" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Procuration
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/rejoindre" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Rejoignez notre equipe
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/devis" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Demande de devis
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/transport" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Transport
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/livraison" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Livraison
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/contact" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Contact
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

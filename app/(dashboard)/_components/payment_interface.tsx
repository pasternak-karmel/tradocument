"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
// );
const PaymentInterface = () => {
  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création de la session de paiement");
      }

      const { sessionId } = await response.json();
      // const stripe = await stripePromise;

      // if (stripe) {
      //   const { error } = await stripe.redirectToCheckout({ sessionId });
      //   if (error) {
      //     console.error("Erreur de redirection vers Stripe:", error);
      //   }
      // }
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-center text-xl font-semibold">
        Montant à payer : {id} €
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Chargement..." : "Payer maintenant"}
      </Button>
    </form>
  );
};
export default PaymentInterface;

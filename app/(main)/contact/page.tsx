"use client";

import { userContact } from "@/actions/users";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { IconSpinner } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ContactSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { z } from "zod";

export default function ContactPage() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof ContactSchema>>({
    resolver: zodResolver(ContactSchema),
  });

  async function onSubmit(data: z.infer<typeof ContactSchema>) {
    setError("");
    setSuccess("");
    startTransition(() => {
      userContact(data)
        .then((data) => {
          if (!data?.success) {
            form.reset();
            setError(data.message);
          }

          if (data?.success) {
            form.reset();
            setSuccess(data.message);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  }

  const inputStyle = {
    borderWidth: "2px",
    borderColor: "black",
    borderRadius: "0.375rem",
    padding: "0.5rem",
    width: "100%",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <motion.h1
          className="mt-5 text-4xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Contactez-nous
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Envoyez-nous un message</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="nom"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom</FormLabel>
                          <FormControl>
                            <Input
                              disabled={isPending}
                              placeholder="nom"
                              style={inputStyle}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="prenom"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Prenom</FormLabel>
                          <FormControl>
                            <Input
                              disabled={isPending}
                              placeholder="prenom"
                              style={inputStyle}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>email</FormLabel>
                          <FormControl>
                            <Input
                              disabled={isPending}
                              placeholder="email"
                              style={inputStyle}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="pays"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pays</FormLabel>
                          <FormControl>
                            <Input
                              disabled={isPending}
                              placeholder="pays"
                              style={inputStyle}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="ville"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ville</FormLabel>
                          <FormControl>
                            <Input
                              disabled={isPending}
                              placeholder="ville"
                              style={inputStyle}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Téléphone Mobile (Whatsapp, Telegram,Imo...)
                          </FormLabel>
                          <FormControl>
                            <PhoneInput
                              disabled={isPending}
                              country={"fr"}
                              value={field.value}
                              onChange={field.onChange}
                              inputStyle={{ width: "100%" }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="objet"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Objet</FormLabel>
                          <FormControl>
                            <Input
                              disabled={isPending}
                              placeholder="objet"
                              style={inputStyle}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              disabled={isPending}
                              placeholder="message"
                              style={inputStyle}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button
                      disabled={isPending}
                      type="submit"
                      className="w-full"
                    >
                      {isPending ? <IconSpinner /> : "Envoyer"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-8"
          >
            <Card>
              <CardHeader>
                <CardTitle>Nos coordonnées</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="text-primary" />
                  <span>123 Rue de la Traduction, 75001 Paris, France</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="text-primary" />
                  <span>+33 1 23 45 67 89</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="text-primary" />
                  <span>contact@tradocument.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="text-primary" />
                  <span>Lun-Ven: 9h-18h</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notre emplacement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video relative rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937604!2d2.292292615509614!3d48.85837007928746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1653664127270!5m2!1sfr!2sfr"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

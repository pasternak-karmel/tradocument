"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import QRCodeDisplay from "@/components/qr_codeDisplay";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Le code doit être de 6 caractères.",
  }),
});

export default function Test() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    // <Form {...form}>
    //   <form
    //     onSubmit={form.handleSubmit(onSubmit)}
    //     className="h-screen flex justify-center items-center"
    //   >
    //     <FormField
    //       control={form.control}
    //       name="pin"
    //       render={({ field }) => (
    //         <FormItem>
    //           <FormLabel>One-Time Password</FormLabel>
    //           <FormControl>
    //             <InputOTP maxLength={6} {...field}>
    //               <InputOTPGroup>
    //                 <InputOTPSlot index={0} />
    //                 <InputOTPSlot index={1} />
    //                 <InputOTPSlot index={2} />
    //                 <InputOTPSlot index={3} />
    //                 <InputOTPSlot index={4} />
    //                 <InputOTPSlot index={5} />
    //               </InputOTPGroup>
    //             </InputOTP>
    //           </FormControl>
    //           <FormDescription>
    //             Please enter the one-time password sent to your phone.
    //           </FormDescription>
    //           <FormMessage />
    //         </FormItem>
    //       )}
    //     />

    //     <Button type="submit">Submit</Button>
    //   </form>
    // </Form>
    <QRCodeDisplay />
  );
}

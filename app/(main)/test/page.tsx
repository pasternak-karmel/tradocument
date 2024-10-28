"use client";

import QRCodeDisplay from "@/components/qr_codeDisplay";


export default function Test() {

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

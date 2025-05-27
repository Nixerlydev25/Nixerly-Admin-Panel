"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInFormSchema } from "@/schema/zod";
import { useSignInMutation } from "@/services/auth/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type FormSchemaType = z.infer<typeof signInFormSchema>;

export default function LoginAccount() {
  const {
    mutation: { mutate: signInMutate },
    formStatus: { setFormLoading, isFormLoading },
  } = useSignInMutation();

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(signInFormSchema),
    shouldFocusError: true,
    defaultValues:{
    }
  });

  const onSubmit = async (values: FormSchemaType) => {
    setFormLoading(true);
    signInMutate({
      ...values,
    });
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
       <div className="hidden bg-muted lg:block">
        <Image
          src="/1.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex items-center justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-screen w-screen items-center justify-center space-y-6"
          >
            <Card className="w-[350px] md:w-[400px]">
              <CardHeader className="space-y-1">
                <CardTitle className="text-left text-2xl">Sign in</CardTitle>
                <CardDescription className="text-left">
                  Enter your email and password to login
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-md font-normal text-black dark:text-white">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="mt-2"
                          placeholder="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="mt-2 dark:text-red-800" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-md font-normal text-black dark:text-white">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative mt-2">
                          <Input
                            placeholder="password"
                            type={showPassword ? "text" : "password"}
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5 text-gray-500" />
                            ) : (
                              <Eye className="h-5 w-5 text-gray-500" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="mt-2 dark:text-red-800" />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button
                  type="submit"
                  disabled={isFormLoading}
                  className="w-full text-white"
                >
                  {isFormLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Login
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
}

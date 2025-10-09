"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRegister } from "@/features/auth/services/register-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(1, "Nama tidak boleh kosong"),
  email: z
    .string()
    .email("Email tidak valid")
    .min(1, "Email tidak boleh kosong"),
  password: z.string().min(6, "Kata sandi harus memiliki minimal 6 karakter"),
});

type RegisterRequest = z.infer<typeof registerSchema>;

export default function Register() {
  let [isVisible, setIsVisible] = useState(false);
  const { register, isLoading } = useRegister();

  function toggleVisibility() {
    setIsVisible((prevState) => !prevState);
  }

  let form = useForm<RegisterRequest>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(registerSchema),
  });

  async function onSubmitHandler(data: RegisterRequest) {
    await register(data);
  }

  return (
    <Card className="z-10 mx-auto w-full max-w-md flex flex-col items-center justify-center gap-y-12 px-6 pt-6 pb-10">
      <Form {...form}>
        <form
          className="space-y-8 w-full"
          onSubmit={form.handleSubmit(onSubmitHandler)}
        >
          <div className="space-y-2 text-center">
            <h1 className="font-bold text-black text-2xl">Daftar </h1>
            <p className="font-medium text-[#344054] text-sm">
              Buat akun baru untuk mulai menggunakan aplikasi.
            </p>
          </div>

          <div className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className="text-base font-medium text-[#1D2939]"
                    htmlFor="name"
                  >
                    Nama<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      placeholder="Masukkan nama lengkap"
                      type="text"
                      className="w-full"
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
                  <FormLabel
                    className="text-base font-medium text-[#1D2939]"
                    htmlFor="email"
                  >
                    Email<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder="Masukkan email"
                      type="email"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className="text-base font-medium text-[#1D2939]"
                    htmlFor="password"
                  >
                    Kata Sandi<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="password"
                        placeholder="Masukkan kata sandi"
                        className="w-full pe-9"
                        type={isVisible ? "text" : "password"}
                        {...field}
                      />
                      <button
                        className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center text-muted-foreground/80 hover:text-foreground outline-none"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <EyeOffIcon size={16} aria-hidden="true" />
                        ) : (
                          <EyeIcon size={16} aria-hidden="true" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={isLoading} className="bg-[#1E96B7] hover:bg-[#167189] text-white w-full font-medium text-sm py-6 px-12 rounded-xl">
            Daftar
          </Button>
        </form>
      </Form>
      <p className="text-center text-sm text-[#667085] mt-4">
        {" "}
        Sudah punya akun?{" "}
        <Link
          href="/auth/login"
          className="text-[#1E96B7] font-semibold hover:underline"
        >
          Masuk
        </Link>
      </p>
    </Card>
  );
}

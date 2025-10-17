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
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { signIn, useSession, type SignInResponse } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const LoginSchema = z.object({
  email: z
    .string()
    .email("Email tidak valid")
    .min(1, "Email tidak boleh kosong"),
  password: z.string().min(6, "Kata sandi harus memiliki minimal 6 karakter"),
});

type LoginRequest = z.infer<typeof LoginSchema>;

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  function toggleVisibility() {
    setIsVisible((prevState) => !prevState);
  }

  const form = useForm<LoginRequest>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });

  const session = useSession();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/dashboard");
    }
  }, [session]);

  async function onSubmitHandler(data: LoginRequest) {
    try {
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
        callbackUrl: "/dashboard",
      });

      if (res?.ok) {
        toast.success("Berhasil masuk!");
        await router.push("/dashboard");
      } else {
        throw res;
      }
    } catch (error) {
      toast.error((error as SignInResponse).error);
    }
  }

  return (
    <Card className="z-10 mx-auto w-full max-w-md flex flex-col items-center justify-center gap-y-12 px-6 pt-6 pb-10">
      <Form {...form}>
        <form
          className="space-y-8 w-full"
          onSubmit={form.handleSubmit(onSubmitHandler)}
        >
          <div className="space-y-2 text-center">
            <h1 className="font-bold text-black text-2xl">Masuk</h1>
            <p className="font-medium text-[#344054] text-sm">
              Silakan masuk untuk melanjutkan penggunaan aplikasi.
            </p>
          </div>

          <div className="space-y-6">
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
                  <Link
                    href="/forgot-password"
                    className="text-[#101828] text-sm font-medium hover:underline text-end"
                  >
                    Lupa kata sandi?
                  </Link>
                </FormItem>
              )}
            />
          </div>
          <Button className="bg-[#1E96B7] hover:bg-[#167189] text-white w-full font-medium text-sm py-6 rounded-xl">
            Masuk
          </Button>
        </form>
      </Form>
      <p className="text-center text-sm text-[#667085]">
        {" "}
        Belum punya akun?{" "}
        <Link
          href="/auth/register"
          className="text-[#1E96B7] font-semibold hover:underline"
        >
          Daftar
        </Link>
      </p>
    </Card>
  );
}

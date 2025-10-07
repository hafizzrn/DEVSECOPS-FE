"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Eye, EyeOff, Pencil, Trash2 } from "lucide-react"
import { Header } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import backgroundP from "@/assets/background-page.png"

export default function ProfilePage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-[25vh] -z-10">
        <Image src={backgroundP} alt="background" fill className="object-cover" />
      </div>

      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-card">Profil</h1>
          <div className="flex items-center gap-2 text-md text-white mt-1">
            <Link href="/dashboard" className="hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <span>/</span>
            <span>Ubah Profil</span>
          </div>
        </div>

        {/* Card utama */}
        <Card className="w-full mx-auto border-0 shadow-md backdrop-blur-sm bg-white/90">
          <CardContent className="p-6 md:p-10">
            <h2 className="text-2xl font-semibold text-foreground tracking-tight mb-8">
              Ubah Profil
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {/* Left Section */}
              <div className="md:col-span-1 self-start">
                <div className="rounded-xl border bg-card overflow-hidden">
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-muted to-card">
                    <Image
                      src="/profile-cover.jpg"
                      alt="Cover"
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      className="absolute top-2 right-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-background/90 shadow border"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>

                    <div className="absolute -bottom-8 left-6">
                      <Avatar className="h-20 w-20 ring-4 ring-background">
                        <AvatarImage src="/diverse-avatars.png" alt="Avatar" />
                        <AvatarFallback>AD</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>

                  <div className="pt-10 pb-4 px-6 text-center">
                    <div className="font-semibold">Admin</div>
                    <div className="text-sm text-muted-foreground">Admin#123</div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="mt-4 w-full border-destructive text-destructive hover:bg-destructive/5 bg-transparent"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Hapus gambar
                </Button>
              </div>

              {/* Right Section */}
              <form className="md:col-span-2 grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nama">Nama<span className="text-destructive">*</span></Label>
                  <Input id="nama" placeholder="Masukan nama" className="h-12 text-foreground placeholder:text-muted-foreground/70" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username<span className="text-destructive">*</span></Label>
                  <Input id="username" placeholder="Masukan username" className="h-12 text-foreground placeholder:text-muted-foreground/70" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email<span className="text-destructive">*</span></Label>
                  <Input id="email" type="email" placeholder="Masukan email" className="h-12 text-foreground placeholder:text-muted-foreground/70" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password Baru<span className="text-destructive">*</span></Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Masukan password baru"
                      className="h-12 pr-10 text-foreground placeholder:text-muted-foreground/70"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className={cn(
                        "absolute inset-y-0 right-0 inline-flex items-center px-3 text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>


                <div className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Batas Pengeluaran</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <Label>Limit Harian</Label>
                      <Input type="number" placeholder="Rp 500.000" className="h-12" />
                    </div>
                    <div className="space-y-1">
                      <Label>Limit Bulanan</Label>
                      <Input type="number" placeholder="Rp 5.000.000" className="h-12" />
                    </div>
                    <div className="space-y-1">
                      <Label>Limit Tahunan</Label>
                      <Input type="number" placeholder="Rp 60.000.000" className="h-12" />
                    </div>
                  </div>
                </div>

                {/* Tombol */}
                <div className="flex justify-end gap-4 pt-4">
                  <Button
                    type="button"
                    variant="secondary"
                    size="lg"
                    className="px-8 bg-transparent border-1"
                  >
                    Batal
                  </Button>
                  <Button
                    type="submit"
                    size="lg"
                    className="px-8 bg-[#1E96B7] hover:bg-[#167189] transition-transform duration-150 hover:scale-[1.02]"
                  >
                    Simpan
                  </Button>
                </div>
              </form>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Header } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, EyeOff, Upload } from "lucide-react"
import Image from "next/image"
import backgroundP from "@/assets/background-page.png"

export default function TransactionPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-[25vh] -z-10">
        <Image
          src={backgroundP}
          alt="background"
          fill
          className="object-cover"
        />
      </div>

      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">User</h1>
          <div className="flex items-center gap-2 text-sm text-white/90">
            <span>Dashboard</span>
            <span>›</span>
            <span>Tambah Transaksi</span>
          </div>
        </div>

        {/* Form Card */}
        <Card className="w-full mx-auto backdrop-blur-sm bg-white/90 shadow-lg">
          <CardContent className="p-10">
            <h2 className="text-2xl font-bold mb-8">Tambah Transaksi</h2>

            <form className="space-y-8">
              {/* Name and Username Row */}
                <div className="space-y-2">
                  <Label htmlFor="nama">
                    Nama Transaksi<span className="text-destructive">*</span>
                  </Label>
                  <Input id="nama" placeholder="Masukan nama transaksi" className="h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">
                    Tipe Transaksi<span className="text-destructive">*</span>
                  </Label>
                  <Select>
                    <SelectTrigger id="type" className="h-12">
                      <SelectValue placeholder="Pilih tipe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Pengeluaran</SelectItem>
                      <SelectItem value="user">Pemasukan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">
                    Nominal Transaksi<span className="text-destructive">*</span>
                  </Label>
                  <Input id="amount" type="amount" placeholder="Masukan nominal" className="h-12" />
                </div>
              {/* Avatar Upload */}
              {/* <div className="space-y-2">
                <Label htmlFor="avatar">
                  Avatar<span className="text-destructive">*</span>
                </Label>
                <div className="border-2 border-dashed border-border rounded-lg p-10 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Upload file</p>
                  <Input id="avatar" type="file" className="hidden" accept="image/*" />
                </div>
              </div> */}

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-6">
                <Button type="button" variant="outline" size="lg" className="px-8 bg-transparent">
                  Batal
                </Button>
                <Button type="submit" size="lg" className="px-8 bg-[#1E96B7] hover:bg-[#167189]">
                  Simpan
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

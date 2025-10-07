"use client"

import { useState } from "react"
import { Header } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import backgroundP from "@/assets/background-page.png"
import Link from "next/link"

export default function TransactionPage() {
  const [proofFile, setProofFile] = useState<File | null>(null)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setProofFile(e.target.files[0])
  }

  return (
    <div className="relative min-h-screen">
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
            <span>Tambah Transaksi</span>
          </div>
        </div>


        <Card className="w-full mx-auto border-0 shadow-md backdrop-blur-sm bg-white/90">
          <CardContent className="p-10">
            <h2 className="text-2xl font-bold mb-8">Tambah Transaksi</h2>

            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nama">Nama Transaksi<span className="text-destructive">*</span></Label>
                  <Input id="nama" placeholder="Masukan nama transaksi" className="h-12" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Tipe Transaksi<span className="text-destructive">*</span></Label>
                  <Select>
                    <SelectTrigger id="type" className="h-12 w-full">
                      <SelectValue placeholder="Pilih tipe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Pemasukan</SelectItem>
                      <SelectItem value="expense">Pengeluaran</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="period">Periode</Label>
                  <Input id="period" placeholder="Contoh: Januari 2025" className="h-12" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Nominal Transaksi<span className="text-destructive">*</span></Label>
                  <Input id="amount" type="number" placeholder="Masukan nominal" className="h-12" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Tanggal Transaksi</Label>
                  <Input id="date" type="date" className="h-12" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Kategori</Label>
                  <Select>
                    <SelectTrigger id="category" className="h-12 w-full">
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Operasional</SelectItem>
                      <SelectItem value="2">Gaji</SelectItem>
                      <SelectItem value="3">Penjualan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="note">Catatan</Label>
                  <Textarea id="note" placeholder="Tambahkan keterangan tambahan" className="min-h-[100px]" />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="proof_file">Bukti Transaksi</Label>
                  <Input id="proof_file" type="file" onChange={handleFileChange} />
                  {proofFile && <p className="text-sm text-muted-foreground">{proofFile.name}</p>}
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Button type="button" variant="secondary" size="lg" className="px-8 bg-transparent border-1">
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

"use client"

import React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, ChevronsUpDown, Search, SlidersHorizontal } from "lucide-react"

type TransactionRow = {
  id: number
  name: string
  type: "income" | "expense"
  category: string
  amount: string
  date: string
  period?: string
  note?: string
  proofFile?: string
}

const MOCK_ROWS: TransactionRow[] = [
  { id: 1, name: "Pembelian Banner", type: "expense", category: "Operasional", amount: "Rp 450.000", date: "02/01/2025" },
  { id: 2, name: "Pembayaran Konsumsi", type: "expense", category: "Kegiatan", amount: "Rp 1.200.000", date: "05/01/2025" },
  { id: 3, name: "Transfer Panitia", type: "expense", category: "Event", amount: "Rp 750.000", date: "07/01/2025" },
  { id: 4, name: "Pembelian Merchandise", type: "expense", category: "Kegiatan", amount: "Rp 980.000", date: "09/01/2025" },
  { id: 5, name: "Pembayaran Sewa Tempat", type: "expense", category: "Operasional", amount: "Rp 2.000.000", date: "12/01/2025" },
  { id: 6, name: "Pembelian Snack", type: "expense", category: "Konsumsi", amount: "Rp 350.000", date: "14/01/2025" },
  { id: 7, name: "Pembayaran Dokumentasi", type: "expense", category: "Event", amount: "Rp 800.000", date: "17/01/2025" },
  { id: 8, name: "Transfer Sponsor", type: "income", category: "Dana Masuk", amount: "Rp 5.000.000", date: "18/01/2025" },
  { id: 9, name: "Pembelian Spanduk", type: "expense", category: "Operasional", amount: "Rp 400.000", date: "20/01/2025" },
  { id: 10, name: "Pembayaran Sound System", type: "expense", category: "Kegiatan", amount: "Rp 1.500.000", date: "22/01/2025" },
  { id: 11, name: "Pembelian Sertifikat", type: "expense", category: "Event", amount: "Rp 300.000", date: "24/01/2025" },
  { id: 12, name: "Transfer Publikasi", type: "income", category: "Media", amount: "Rp 650.000", date: "26/01/2025" },
]

export function DashboardTable() {
  const [query, setQuery] = React.useState("")
  const [perPage, setPerPage] = React.useState(12)
  const [page, setPage] = React.useState(1)

  const filtered = React.useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return MOCK_ROWS
    return MOCK_ROWS.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.amount.toLowerCase().includes(q) ||
        r.date.toLowerCase().includes(q)
    )
  }, [query])

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const start = (page - 1) * perPage
  const current = filtered.slice(start, start + perPage)

  React.useEffect(() => {
    setPage(1)
  }, [query, perPage])

  return (
    <Card className="border-border shadow-sm">
      <CardContent>
        {/* Toolbar */}
        <div className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
          <div className="flex w-full items-center gap-2 md:max-w-md">
            <div className="relative w-full">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari transaksi"
                className="pl-9"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <SlidersHorizontal className="h-full" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-52">
                <DropdownMenuItem onClick={() => setQuery("")}>Reset pencarian</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPerPage(12)}>Tampilkan 12 per halaman</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPerPage(25)}>Tampilkan 25 per halaman</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Table */}
        <div className="px-4 pb-4 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Jenis Transaksi</TableHead>
                <TableHead>Periode</TableHead>
                <TableHead>Nominal</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Catatan</TableHead>
                <TableHead>Bukti</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {current.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.name}</TableCell>
                  <TableCell
                    className={
                      r.type === "income"
                        ? "text-[#00A733]"
                        : "text-[#DC2625]"
                    }
                  >
                    {r.type === "income" ? "Pemasukan" : "Pengeluaran"}
                  </TableCell>
                  <TableCell>{r.period || "-"}</TableCell>
                  <TableCell>{r.amount}</TableCell>
                  <TableCell>{r.date}</TableCell>
                  <TableCell>{r.category}</TableCell>
                  <TableCell>{r.note || "-"}</TableCell>
                  <TableCell>{r.proofFile || "-"}</TableCell>
                </TableRow>
              ))}
              {current.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-10">
                    Tidak ada data yang cocok
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4">
          <div className="text-sm">
            Item per halaman
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="ml-2">{perPage}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {[10, 12, 25, 50].map((n) => (
                  <DropdownMenuItem key={n} onClick={() => setPerPage(n)}>{n}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">{page} / {totalPages}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default DashboardTable

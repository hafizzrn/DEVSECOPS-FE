"use client";

import backgroundP from "@/assets/background-page.png";
import { Header } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import Summary from "@/features/transaction/containers/summary";
import TransactionDashboard from "@/features/transaction/containers/all-transaction";
import Image from "next/image";
import Link from "next/link";
import DashboardTable from "@/components/dashboard/dashboard-table";

export default function DashboardPage() {
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
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-card">Dashboard</h1>
            <p className="text-md text-white mt-1 text-wh">
              Ringkasan performa dan aktivitas terkini
            </p>
          </div>
          <Link href="/dashboard/transaction/create">
            <Button>Tambahkan Transaksi</Button>
          </Link>
        </div>
        <Summary />
        <div className="mt-8 ">
          <p className="text-md font-semibold text-black mt-4 mb-4 text-wh">
              Tabel Pengeluaran
          </p>
          <DashboardTable/>
        </div>
        <TransactionDashboard />
      </main>
    </div>
  );
}

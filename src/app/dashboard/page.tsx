"use client";

import backgroundP from "@/assets/background-page.png";
import { StatsCards } from "@/features/transaction/components/card-stats";
import { Header } from "@/components/dashboard/header";
import { PeriodSelector } from "@/components/dashboard/period-selector";
import Image from "next/image";
import Summary from "@/features/transaction/containers/summary";

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
          <PeriodSelector />
        </div>
        {/* Stats Cards */}
        <Summary />
      </main>
    </div>
  );
}

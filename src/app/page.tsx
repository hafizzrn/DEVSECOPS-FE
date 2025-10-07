import { Header } from "@/components/dashboard/header"
import { StatsCards } from "@/components/dashboard/card-stats"
import { PeriodSelector } from "@/components/dashboard/period-selector"
import Image from "next/image"
import backgroundP from "@/assets/background-page.png"

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

      {/* Content */}
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-card">Dashboard</h1>
          <PeriodSelector />
        </div>

        {/* Stats Cards */}
        <StatsCards />
      </main>
    </div>
  )
}

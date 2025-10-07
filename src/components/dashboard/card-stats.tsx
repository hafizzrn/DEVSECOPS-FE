import { TrendingDown, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
    {
    title: "Total pemasukan",
    value: "Rp 78.200.000",
    label: "Bulan ini",
    icon: TrendingUp,
    iconBg: "bg-primary/15",
    iconColor: "text-primary",
  },
    {
    title: "Total pengeluaran",
    value: "Rp 45.500.000",
    label: "Bulan ini",
    icon: TrendingDown,
    iconBg: "bg-[#FFEBEB]",
    iconColor: "text-[#DC2625]",
  },
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="border-0 border-broder">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl ${stat.iconBg}`}>
                <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground leading-tight mb-2">{stat.title}</p>
                <div className="flex flex-col gap-1">
                  <span className="text-3xl font-bold text-foreground">{stat.value}</span>
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

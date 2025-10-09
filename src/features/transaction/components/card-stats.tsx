import { TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatRupiah } from "@/lib/format";

export function StatsCards({
  title,
  type,
  value,
  label,
}: {
  title: string;
  type: "income" | "expense";
  value: string;
  label: string;
}) {
  return (
    <Card className="border-0 border-broder">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div
            className={`p-3 rounded-xl ${type === "income" ? "bg-primary/15" : "bg-[#FFEBEB]"}`}
          >
            {type === "income" ? (
              <TrendingUp
                className={`h-6 w-6 ${type === "income" ? "text-primary" : "text-[#DC2625]"}`}
              />
            ) : (
              <TrendingDown
                className={`h-6 w-6 ${type === "expense" ? "text-primary" : "text-[#DC2625]"}`}
              />
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm md:text-lg font-semibold text-black leading-tight mb-2">
              {title} {label}
            </p>
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-bold text-foreground">
                {formatRupiah(Number(value))}
              </span>
              {/* <span className="text-xs text-muted-foreground">{label}</span> */}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

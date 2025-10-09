import { StatsCards } from "@/features/transaction/components/card-stats";
import { useGetSummary } from "../services/summary-service";

export default function Summary() {
  const { data, isLoading } = useGetSummary();
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <StatsCards title="Total Pemasukan" label="Harian" type="income" value={isLoading ? "0" : (data?.data?.total_income_daily?.toString() ?? "0")} />
      <StatsCards title="Total Pengeluaran" label="Harian" type="expense" value={isLoading ? "0" : (data?.data?.total_expense_daily?.toString() ?? "0")} />
      <StatsCards title="Total Pemasukan" label="Bulanan" type="income" value={isLoading ? "0" : (data?.data?.total_income_monthly?.toString() ?? "0")} />
      <StatsCards title="Total Pengeluaran" label="Bulanan" type="expense" value={isLoading ? "0" : (data?.data?.total_expense_monthly?.toString() ?? "0")} />
    </section>
  );
}

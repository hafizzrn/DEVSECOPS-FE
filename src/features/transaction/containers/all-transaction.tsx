"use client";
import { Pagination } from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import TransactionTable from "../components/transaction-table";
import { useGetTransactions } from "../services/transaction-service";
import FilterTransaction from "./filter-transaction";

export default function AllTransaction() {
    const searchParams = useSearchParams();
    const [filters, setFilters] = useState({
        type: "",
        period: "",
        sort_by: "date",
        order_by: "desc",
        page: 1,
        limit: 10,
        start_date: "",
        end_date: "",
    });

    useEffect(() => {
        setFilters({
            type: searchParams.get("type") || "",
            period: searchParams.get("period") || "",
            sort_by: searchParams.get("sort_by") || "date",
            order_by: searchParams.get("order_by") || "desc",
            page: Number(searchParams.get("page") || 1),
            limit: Number(searchParams.get("limit") || 10),
            start_date: searchParams.get("start_date") || "",
            end_date: searchParams.get("end_date") || "",
        });
    }, [searchParams]);

    const queryKey = useMemo(() => {
        const queryParams = { ...filters };
        return [
            "transactions",
            new URLSearchParams(
                queryParams as unknown as Record<string, string>
            ).toString(),
        ];
    }, [filters]);

    const { data: transactions, isLoading } = useGetTransactions(queryKey);

    return (
        <section className="container py-10 md:py-20">
            <FilterTransaction />
            <TransactionTable
                transactions={transactions?.data.data ?? []}
                isLoading={isLoading}
            />
            <Pagination />
        </section>
    );
}

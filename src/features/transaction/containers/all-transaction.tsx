"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import TransactionTable from "../components/transaction-table";
import { useGetTransactions } from "../services/transaction-service";
import FilterTransaction from "./filter-transaction";
import { Pagination } from "../components/pagination";

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
        <section className="container flex flex-col gap-8 py-10 md:py-20 items-stretch">
            <FilterTransaction />
            <TransactionTable
                transactions={transactions?.data.data ?? []}
                isLoading={isLoading}
            />
            <div className="">
                <Pagination
                    currentPage={transactions?.data.current_page ?? 1}
                    totalPages={transactions?.data.total_page ?? 1}
                    onPageChange={(page) => {
                        setFilters((prev) => ({ ...prev, page }));
                        const newSearchParams = new URLSearchParams(searchParams);
                        newSearchParams.set("page", page.toString());
                        window.history.replaceState(null, "", `?${newSearchParams.toString()}`);
                    }}
                />
            </div>


        </section>
    );
}

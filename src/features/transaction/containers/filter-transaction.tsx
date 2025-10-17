"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Filter, Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function FilterTransaction() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // --- State ---
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "")
  const [startDate, setStartDate] = useState<Date | undefined>(
    searchParams.get("start_date") ? new Date(searchParams.get("start_date")!) : undefined
  )
  const [endDate, setEndDate] = useState<Date | undefined>(
    searchParams.get("end_date") ? new Date(searchParams.get("end_date")!) : undefined
  )
  const [filters, setFilters] = useState({
    type: searchParams.get("type") || "",
    period: searchParams.get("period") || "",
    sort_by: searchParams.get("sort_by") || "date",
    order_by: searchParams.get("order_by") || "desc",
  })

  // --- Update URL when filters change ---
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
    const params = new URLSearchParams()

    if (searchQuery) params.set("search", searchQuery)
    if (filters.type !== "all") params.set("type", filters.type)
    if (filters.period !== "all") params.set("period", filters.period)
    if (filters.sort_by !== "date") params.set("sort_by", filters.sort_by)
    if (filters.order_by !== "desc") params.set("order_by", filters.order_by)
    if (startDate) params.set("start_date", format(startDate, "yyyy-MM-dd"))
    if (endDate) params.set("end_date", format(endDate, "yyyy-MM-dd"))

    const query = params.toString()
    router.replace(`?${query}`, { scroll: false })
  }, [searchQuery, filters, startDate, endDate])

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <Card className="mb-6 animate-slide-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-primary" />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Type Filter */}
          <Select
            value={filters.type}
            onValueChange={(value) => handleFilterChange("type", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Transaction Type" />
            </SelectTrigger>
            <SelectContent className="w-full ">
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>

          {/* Period Filter */}
          <Select
            value={filters.period}
            onValueChange={(value) => handleFilterChange("period", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort By */}
          <Select
            value={filters.sort_by}
            onValueChange={(value) => handleFilterChange("sort_by", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="amount">Amount</SelectItem>
              <SelectItem value="type">Type</SelectItem>
            </SelectContent>
          </Select>

          {/* Start Date */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP") : "Start Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={(date) => setStartDate(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          {/* End Date */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : "End Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={(date) => setEndDate(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          {/* Order */}
          <Select
            value={filters.order_by}
            onValueChange={(value) => handleFilterChange("order_by", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Descending</SelectItem>
              <SelectItem value="asc">Ascending</SelectItem>
            </SelectContent>
          </Select>

          {/* Reset */}
          <Button
            variant="outline"
            onClick={() => {
              setFilters({
                type: "all",
                period: "all",
                sort_by: "date",
                order_by: "desc",
              })
              setSearchQuery("")
              setStartDate(undefined)
              setEndDate(undefined)
              router.replace("?", { scroll: false })
            }}
          >
            Reset Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

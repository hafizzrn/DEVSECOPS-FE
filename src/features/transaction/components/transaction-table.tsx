import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formatRupiah } from '@/lib/format'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { TrendingDown, TrendingUp } from 'lucide-react'
import React from 'react'
import { Transaction } from '../types'
import { Skeleton } from '@/components/ui/skeleton'

export default function TransactionTable({ transactions, isLoading }: { transactions: Transaction[]; isLoading: boolean }) {

    return (
        <Card className="animate-scale-in" >
            <CardHeader>
                <CardTitle>Transactions</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Note</TableHead>
                                <TableHead>Period</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                Array.from({ length: 5 }).map((_, index) => (
                                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                                    <TableRow key={index}>
                                        <TableCell>
                                            <Skeleton className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton className="h-4 bg-gray-200 rounded animate-pulse" />
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Skeleton className="h-4 w-24 bg-gray-200 rounded animate-pulse ml-auto" />
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : transactions.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                        No transactions found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                transactions.map((transaction) => (
                                    <TableRow key={transaction.id}>
                                        <TableCell className="font-medium">
                                            {format(new Date(transaction.date), "MMM dd, yyyy")}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={transaction.transaction_type === "income" ? "default" : "destructive"}
                                                className={
                                                    transaction.transaction_type === "income"
                                                        ? "bg-success hover:bg-success/90"
                                                        : ""
                                                }
                                            >
                                                {transaction.transaction_type === "income" ? (
                                                    <TrendingUp className="w-3 h-3 mr-1" />
                                                ) : (
                                                    <TrendingDown className="w-3 h-3 mr-1" />
                                                )}
                                                {transaction.transaction_type}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="max-w-xs truncate">{transaction.note}</TableCell>
                                        <TableCell>{transaction.period}</TableCell>
                                        <TableCell
                                            className={cn(
                                                "text-right font-semibold",
                                                transaction.transaction_type === "income" ? "text-success" : "text-destructive"
                                            )}
                                        >
                                            {transaction.transaction_type === "income" ? "+" : "-"}
                                            {formatRupiah(transaction.amount)}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {/* <div className="flex items-center justify-between mt-4">
                    <p className="text-sm text-muted-foreground">
                        Showing {(filters.page - 1) * filters.limit + 1} to {filters.page * filters.limit} of{" "}
                        {mockTransactions.length} transactions
                    </p>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleFilterChange("page", String(filters.page - 1))}
                            disabled={filters.page === 1}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleFilterChange("page", String(filters.page + 1))}
                        >
                            Next
                        </Button>
                    </div>
                </div> */}
            </CardContent>
        </Card >
    )
}

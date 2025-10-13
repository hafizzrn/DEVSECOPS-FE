import React from 'react'
import { useGetRecentTransactions, useGetTransactions } from '../services/transaction-service';
import TransactionTable from '../components/transaction-table';

export default function TransactionDashboard() {
    const { data: transactions, isLoading } = useGetRecentTransactions(["transaction"]);

    
    return (
        <section className='flex flex-col gap-4'>
            <h1>Today Transactions</h1>
            <TransactionTable transactions={transactions?.data.data ?? []} isLoading={isLoading} />
        </section>
    )
}

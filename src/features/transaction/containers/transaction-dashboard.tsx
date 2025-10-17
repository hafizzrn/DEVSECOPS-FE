import TransactionTable from '../components/transaction-table';
import { useGetRecentTransactions } from '../services/transaction-service';

export default function TransactionDashboard() {
    const { data: transactions, isLoading } = useGetRecentTransactions(["transaction"]);

    
    return (
        <section className='flex flex-col gap-4'>
            <h1>Today Transactions</h1>
            <TransactionTable transactions={transactions?.data.data ?? []} isLoading={isLoading} />
        </section>
    )
}

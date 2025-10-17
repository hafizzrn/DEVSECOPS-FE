import TransactionForm from '@/features/transaction/containers/transaction-form'
import React from 'react'

export default function EditTransactionPage({ params }: { params: { id: string } }) {
    return (
        <TransactionForm id={params.id} />
    )
}

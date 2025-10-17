import TransactionForm from '@/features/transaction/containers/transaction-form'
import React from 'react'

export default async function EditTransactionPage({ params }: { params: Promise<{ id: string }> }) {
    return (
        <TransactionForm id={(await params).id} />
    )
}

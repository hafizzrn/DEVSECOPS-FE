import TransactionDetail from '@/features/transaction/containers/transaction-detail'
import React from 'react'

export default async function TransactionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <TransactionDetail id={(await params).id} />
  )
}

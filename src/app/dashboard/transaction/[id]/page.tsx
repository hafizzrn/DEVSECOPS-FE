import TransactionDetail from '@/features/transaction/containers/transaction-detail'
import React from 'react'

export default function TransactionDetailPage({params}: {params: {id: string}}) {
  return (
    <TransactionDetail id={params.id}/>
  )
}

import { Header } from '@/components/dashboard/header'
import type React from 'react'

export default function DashboardLayout({children}: {children: React.ReactNode}) {
    return (
        <>
            <Header />
            {children}
        </>
    )
}

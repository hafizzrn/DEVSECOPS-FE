import Image from 'next/image'
import React from 'react'
import Background from "@/assets/background.png";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className="h-screen w-screen relative flex items-center justify-center overflow-hidden">
            {children}
            <Image
                src={Background}
                alt="background"
                fill
                className="object-cover -z-10 fixed inset-0"
            />
        </section>
    )
}

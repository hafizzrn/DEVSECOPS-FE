import { Header } from '@/components/dashboard/header'
import Footer from '@/features/landing/components/footer'
import Benefits from '@/features/landing/containers/benefits'
import CTA from '@/features/landing/containers/cta'
import Features from '@/features/landing/containers/features'
import Hero from '@/features/landing/containers/hero'
import Pricing from '@/features/landing/containers/pricing'

export default function LandingPage() {
    return (
        <>
            <Header />
            <main>
                <Hero />
                <Features />
                <Benefits />
                <Pricing />
                <CTA />
            </main>
            <Footer />
        </>
    )
}

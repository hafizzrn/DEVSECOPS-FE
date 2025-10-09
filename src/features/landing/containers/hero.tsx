import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import Image from "next/image";

const Hero = () => {
    return (
        <section className="pt-32 min-h-screen pb-20 px-4 sm:px-6 lg:px-8"
            style={{ background: "var(--gradient-hero)" }}>
            <div className="container mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="animate-slide-up">
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                            Take Control of Your{" "}
                            <span className="text-gradient">Financial Future</span>
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                            Track income, manage expenses, and visualize your financial health with powerful analytics.
                            Cashflow makes personal finance management simple and effective.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button size="lg" className="text-lg h-14 px-8 shadow-glow">
                                Start Free Trial
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                            <Button size="lg" variant="outline" className="text-lg h-14 px-8">
                                <Play className="mr-2 w-5 h-5" />
                                Watch Demo
                            </Button>
                        </div>
                        <div className="mt-12 flex items-center gap-8">
                            <div>
                                <div className="text-3xl font-bold text-gradient">10K+</div>
                                <div className="text-sm text-muted-foreground">Active Users</div>
                            </div>
                            <div className="w-px h-12 bg-border"></div>
                            <div>
                                <div className="text-3xl font-bold text-gradient">$50M+</div>
                                <div className="text-sm text-muted-foreground">Tracked Monthly</div>
                            </div>
                            <div className="w-px h-12 bg-border"></div>
                            <div>
                                <div className="text-3xl font-bold text-gradient">4.9/5</div>
                                <div className="text-sm text-muted-foreground">User Rating</div>
                            </div>
                        </div>
                    </div>

                    <div className="relative animate-fade-in">
                        <div className="absolute -inset-4 bg-gradient-primary opacity-20 blur-3xl rounded-full"></div>
                        <Image
                            src={heroImage}
                            alt="Cashflow Dashboard Preview"
                            className="relative rounded-2xl shadow-2xl w-full"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

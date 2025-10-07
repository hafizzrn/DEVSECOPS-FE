"use client";

import { useRouter, usePathname } from "next/navigation";
import { CreditCard, LayoutDashboard, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from "@/assets/logo.png";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header className="bg-white border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push("/dashboard")}>
            <Image
              src={logo}
              alt="Cashflow Logo"
              width={40}
              height={40}
            />
            <h2 className="font-bold text-foreground text-sm tracking-wide">CASHFLOW</h2>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-2 rounded-full py-3">
            <Button
              onClick={() => router.push("/dashboard/")}
              variant={pathname === "/dashboard" ? "default" : "ghost"}
              size="default"
              className={`rounded-full gap-2 px-6 py-2 text-sm font-medium ${pathname === "/dashboard" ? "bg-foreground text-background hover:bg-foreground/90" : "text-foreground/80 hover:bg-muted"}`}
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Button>

            <Button
              onClick={() => router.push("/transaction")}
              variant={pathname === "/transaction" ? "default" : "ghost"}
              size="default"
              className={`rounded-full gap-2 px-6 py-4 text-sm font-medium ${pathname === "/transaction" ? "bg-foreground text-background hover:bg-foreground/90" : "text-foreground/80 hover:bg-muted"}`}
            >
              <CreditCard className="h-4 w-4" />
              Transaction
            </Button>

            <Button
              onClick={() => router.push("/profile")}
              variant={pathname === "/profile" ? "default" : "ghost"}
              size="default"
              className={`rounded-full gap-2 px-6 py-2 text-sm font-medium ${pathname === "/profile" ? "bg-foreground text-background hover:bg-foreground/90" : "text-foreground/80 hover:bg-muted"}`}
            >
              <User className="h-4 w-4" />
              Profile
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}

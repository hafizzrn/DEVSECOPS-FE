import { Bell, ChevronDown, CreditCard, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="bg-white border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <div className="w-8 h-8 bg-card rounded" />
            </div>
            <div>
              <h2 className="font-bold text-foreground text-sm tracking-wide">CASHFLOW</h2>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-4 bg-card rounded-full px-5 py-3  ">
            <Button
              variant="default"
              size="default"
              className="rounded-full gap-2 bg-foreground text-background hover:bg-foreground/90 px-6 py-2 text-sm font-medium"
            >
              <div className="w-4 h-4 rounded-full bg-background/20" />
              Dashboard
            </Button>
            <Button
              variant="ghost"
              size="default"
              className="rounded-full gap-2 px-6 py-2 text-sm font-medium text-foreground/80 hover:bg-muted"
            >
              <CreditCard className="h-4 w-4" />
              Transaction
            </Button>
            <Button
              variant="ghost"
              size="default"
              className="rounded-full gap-2 px-6 py-2 text-sm font-medium text-foreground/80 hover:bg-muted"
            >
              <User className="h-4 w-4" />
              Profile
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}

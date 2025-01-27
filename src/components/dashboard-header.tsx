"use client"

import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/user-nav"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DashboardHeaderProps {
  className?: string
}

export function DashboardHeader({ className }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-8">
        <div className="flex items-center gap-6 flex-1">
          <h1 className="font-bold text-xl text-foreground">Rebobina Pro</h1>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-sm text-muted-foreground hidden md:inline-block">
            Bem-vindo,
          </span>
          <span className="text-sm font-medium">Admin</span>
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  )
}
"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { 
  LayoutDashboard,
  Settings, 
  Wrench,
  UserCircle,
  ChevronLeft,
  ChevronRight,
  FileSpreadsheet,
  History
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = React.useState(false)
  const pathname = usePathname()

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Motores",
      href: "/motores",
      icon: Wrench,
    },
    {
      title: "Relatórios",
      href: "/relatorios",
      icon: FileSpreadsheet,
    },
    {
      title: "Histórico",
      href: "/historico",
      icon: History,
    },
    {
      title: "Configurações",
      href: "/configuracoes",
      icon: Settings,
    },
    {
      title: "Perfil",
      href: "/perfil",
      icon: UserCircle,
    },
  ]

  return (
    <motion.div
      initial={{ width: collapsed ? 80 : 240 }}
      animate={{ width: collapsed ? 80 : 240 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "relative flex h-screen flex-col border-r bg-background py-4 px-3",
        className
      )}
    >
      <div className="flex items-center justify-between mb-8 px-3">
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-2x1 font-semibold text-green-600">Rebobina Pro</h1>
            <p className="text-base text-muted-foreground">Gestão Inteligente</p>
          </motion.div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-9 w-9"
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>

      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-4 rounded-md px-4 py-3 text-base text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              pathname === item.href && "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400"
            )}
          >
            <item.icon className="h-5 w-5" />
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {item.title}
              </motion.span>
            )}
          </Link>
        ))}
      </nav>
    </motion.div>
  )
} 
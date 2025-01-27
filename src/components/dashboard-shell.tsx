import { ReactNode } from "react"
import { Sidebar } from "@/components/sidebar"

interface DashboardShellProps {
  children: ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </div>
  )
} 
"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { MotorsTable } from "@/components/motors/motors-table"
import { MotorDialog } from "@/components/motors/motor-dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function HomePage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <DashboardShell>
      <DashboardHeader />
      <main className="flex-1 space-y-6 p-8 pt-6">
        <div className="flex items-center justify-between px-4">
          <h2 className="text-3xl font-bold tracking-tight">Motores</h2>
          <Button 
            className="bg-[#28a745] hover:bg-[#218838] px-6"
            onClick={() => setIsDialogOpen(true)}
          >
            <Plus className="mr-2 h-5 w-5" /> Novo Motor
          </Button>
        </div>
        <div className="mt-8">
          <MotorsTable />
        </div>
        <MotorDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      </main>
    </DashboardShell>
  )
}

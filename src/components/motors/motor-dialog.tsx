"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MotorForm } from "./motor-form"
import { Motor, MotorFormData } from "@/types/motor"
import { useMotorStore } from "@/stores/useMotorStore"
import { toast } from "react-hot-toast"
import { ScrollArea } from "@/components/ui/scroll-area"

interface MotorDialogProps {
  motor?: Motor
  isOpen: boolean
  onClose: () => void
}

export function MotorDialog({ motor, isOpen, onClose }: MotorDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { addMotor, updateMotor } = useMotorStore()

  const handleSubmit = async (data: MotorFormData) => {
    try {
      setIsLoading(true)
      
      if (motor) {
        updateMotor(motor.id, { 
          ...motor, 
          ...data,
        })
        toast.success('Motor atualizado com sucesso')
      } else {
        const newMotor: Motor = {
          ...data,
          id: Math.random().toString(36).substr(2, 9),
          dataEntrada: new Date().toISOString(),
          status: 'PENDENTE',
        }
        addMotor(newMotor)
        toast.success('Motor cadastrado com sucesso')
      }
      
      handleClose()
    } catch (error) {
      toast.error(motor ? 'Erro ao atualizar motor' : 'Erro ao cadastrar motor')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setIsLoading(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[800px] h-[85vh] p-0">
        <DialogHeader className="px-8 py-6 border-b">
          <DialogTitle className="text-xl">
            {motor ? 'Editar Motor' : 'Novo Motor'}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-1 h-[calc(85vh-140px)]">
          <div className="px-8 py-6">
            <MotorForm
              motor={motor}
              onSubmit={handleSubmit}
              onCancel={handleClose}
              isLoading={isLoading}
            />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
} 
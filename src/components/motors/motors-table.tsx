"use client"

import { useState } from "react"
import { useMotorStore } from "@/stores/useMotorStore"
import { useEffect, useMemo } from "react"
import { useDebounce } from "@/hooks/useDebounce"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Edit, Trash2, Search, Plus } from "lucide-react"
import { toast } from "react-hot-toast"
import { Motor } from "@/types/motor"
import { MotorDialog } from "./motor-dialog"
import { DeleteConfirmation } from "./delete-confirmation"

export function MotorsTable() {
  const {
    motors,
    searchTerm,
    sortColumn,
    sortDirection,
    currentPage,
    pageSize,
    setSearchTerm,
    setSorting,
    setPage,
    deleteMotor,
  } = useMotorStore()

  const debouncedSearch = useDebounce(searchTerm, 300)

  const filteredMotors = useMemo(() => {
    return motors.filter((motor) =>
      Object.values(motor).some((value) =>
        String(value)
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase())
      )
    )
  }, [motors, debouncedSearch])

  const sortedMotors = useMemo(() => {
    if (!sortColumn) return filteredMotors

    return [...filteredMotors].sort((a, b) => {
      const aValue = String(a[sortColumn])
      const bValue = String(b[sortColumn])
      return sortDirection === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    })
  }, [filteredMotors, sortColumn, sortDirection])

  const paginatedMotors = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return sortedMotors.slice(start, start + pageSize)
  }, [sortedMotors, currentPage, pageSize])

  const [selectedMotor, setSelectedMotor] = useState<Motor | undefined>()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [motorToDelete, setMotorToDelete] = useState<string | null>(null)

  const handleEdit = (motor: Motor) => {
    setSelectedMotor(motor)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setMotorToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!motorToDelete) return

    try {
      // await api.delete(`/motors/${motorToDelete}`)
      deleteMotor(motorToDelete)
      toast.success('Motor excluído com sucesso')
    } catch (error) {
      toast.error('Erro ao excluir motor')
    } finally {
      setIsDeleteDialogOpen(false)
      setMotorToDelete(null)
    }
  }

  return (
    <div className="space-y-6 px-4">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por cliente, marca ou modelo..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Marca</TableHead>
              <TableHead>Modelo</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Potência</TableHead>
              <TableHead>Tensão</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedMotors.map((motor) => (
              <TableRow key={motor.id}>
                <TableCell className="font-medium">{motor.cliente}</TableCell>
                <TableCell>{motor.marca}</TableCell>
                <TableCell>{motor.modelo}</TableCell>
                <TableCell>{motor.tipo}</TableCell>
                <TableCell>{motor.cv}</TableCell>
                <TableCell>{motor.tensao.join('/')}</TableCell>
                <TableCell>
                  {new Date(motor.dataEntrada).toLocaleDateString('pt-BR')}
                </TableCell>
                <TableCell>{motor.status}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleEdit(motor)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-red-600"
                    onClick={() => handleDelete(motor.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Paginação */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setPage(currentPage - 1)}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            disabled={paginatedMotors.length < pageSize}
            onClick={() => setPage(currentPage + 1)}
          >
            Próxima
          </Button>
        </div>
      </div>

      <MotorDialog
        motor={selectedMotor}
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false)
          setSelectedMotor(undefined)
        }}
      />

      <DeleteConfirmation
        isOpen={isDeleteDialogOpen}
        onConfirm={confirmDelete}
        onCancel={() => {
          setIsDeleteDialogOpen(false)
          setMotorToDelete(null)
        }}
      />
    </div>
  )
} 
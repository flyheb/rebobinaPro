import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Motor } from '../types/motor'

interface MotorState {
  motors: Motor[]
  isLoading: boolean
  error: string | null
  searchTerm: string
  sortColumn: keyof Motor | null
  sortDirection: 'asc' | 'desc'
  currentPage: number
  pageSize: number
  setMotors: (motors: Motor[]) => void
  addMotor: (motor: Motor) => void
  updateMotor: (id: string, motor: Motor) => void
  deleteMotor: (id: string) => void
  setSearchTerm: (term: string) => void
  setSorting: (column: keyof Motor) => void
  setPage: (page: number) => void
  setPageSize: (size: number) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useMotorStore = create<MotorState>()(
  persist(
    (set, get) => ({
      motors: [],
      isLoading: false,
      error: null,
      searchTerm: '',
      sortColumn: null,
      sortDirection: 'asc',
      currentPage: 1,
      pageSize: 10,

      setMotors: (motors) => set({ motors }),
      
      addMotor: (motor) => 
        set((state) => ({ 
          motors: [...state.motors, motor] 
        })),
      
      updateMotor: (id, updatedMotor) =>
        set((state) => ({
          motors: state.motors.map((motor) =>
            motor.id === id ? { ...motor, ...updatedMotor } : motor
          ),
        })),
      
      deleteMotor: (id) =>
        set((state) => ({
          motors: state.motors.filter((motor) => motor.id !== id),
        })),
      
      setSearchTerm: (term) => set({ searchTerm: term }),
      
      setSorting: (column) =>
        set((state) => ({
          sortColumn: column,
          sortDirection:
            state.sortColumn === column && state.sortDirection === 'asc'
              ? 'desc'
              : 'asc',
        })),
      
      setPage: (page) => set({ currentPage: page }),
      
      setPageSize: (size) => set({ pageSize: size }),
      
      setLoading: (loading) => set({ isLoading: loading }),
      
      setError: (error) => set({ error }),
    }),
    {
      name: 'motor-storage',
    }
  )
) 
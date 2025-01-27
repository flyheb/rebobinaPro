export type MotorType = "MONO" | "TRIFÁSICO"

export interface Motor {
  id: string
  nome: string
  marca: string
  modelo: string
  tensao: string[]  // Array para múltiplas tensões [220, 380]
  amperagem: string[]  // Array para múltiplas amperagens
  comprimento: string
  diametro: string
  cv: string
  rpm: string
  tipo: MotorType
  numRanhuras: number
  passePrincipal: string[]  // Array para múltiplos passes [1,2,3,4]
  passeAuxiliar: string[]   // Array para múltiplos passes
  numEspirasPrincipal: number
  numEspirasAuxiliar: number
  fio: {
    principal: string
    auxiliar: string
  }
  capacitor: string
  ligacao: {
    pagina: number
  }
  observacoes?: string
  dataEntrada: string
  cliente: string
  status: 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDO'
  imagens?: string[]  // URLs das imagens
}

// Tipo para o formulário de criação/edição
export type MotorFormData = Omit<Motor, 'id' | 'dataEntrada' | 'status'> & {
  id?: string
}

// Tipo para filtragem e ordenação
export type MotorSortKeys = 
  | 'cliente'
  | 'marca'
  | 'modelo'
  | 'tipo'
  | 'cv'
  | 'dataEntrada'
  | 'status'
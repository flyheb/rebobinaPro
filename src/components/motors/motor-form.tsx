"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Motor, MotorFormData } from "@/types/motor"
import { useMotorStore } from "@/stores/useMotorStore"
import { toast } from "react-hot-toast"
import { Loader2 } from "lucide-react"

const motorSchema = z.object({
  cliente: z.string().min(1, "Cliente é obrigatório"),
  marca: z.string().min(1, "Marca é obrigatória"),
  modelo: z.string().min(1, "Modelo é obrigatório"),
  cv: z.string().min(1, "Potência é obrigatória"),
  tensao: z.array(z.string()).min(1, "Tensão é obrigatória"),
  amperagem: z.array(z.string()).min(1, "Corrente é obrigatória"),
  comprimento: z.string().min(1, "Comprimento é obrigatório"),
  diametro: z.string().min(1, "Diâmetro é obrigatório"),
  rpm: z.string().min(1, "RPM é obrigatório"),
  tipo: z.enum(["MONO", "TRIFÁSICO"]),
  numRanhuras: z.number().min(1, "Número de ranhuras é obrigatório"),
  passePrincipal: z.array(z.string()),
  passeAuxiliar: z.array(z.string()),
  numEspirasPrincipal: z.number().min(1, "Número de espiras principal é obrigatório"),
  numEspirasAuxiliar: z.number().optional(),
  fio: z.object({
    principal: z.string().min(1, "Bitola do fio principal é obrigatória"),
    auxiliar: z.string().optional(),
  }),
  capacitor: z.string().optional(),
  ligacao: z.object({
    pagina: z.number(),
  }),
  observacoes: z.string().optional(),
})

interface MotorFormProps {
  motor?: Motor
  onSubmit: (data: MotorFormData) => void
  onCancel: () => void
  isLoading: boolean
}

export function MotorForm({ motor, onSubmit, onCancel, isLoading }: MotorFormProps) {
  const form = useForm<MotorFormData>({
    resolver: zodResolver(motorSchema),
    defaultValues: motor || {
      tipo: "TRIFÁSICO",
      tensao: [],
      amperagem: [],
      passePrincipal: [],
      passeAuxiliar: [],
      fio: {
        principal: "",
        auxiliar: "",
      },
      ligacao: {
        pagina: 1,
      },
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-8">
          {/* Seções do formulário */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Informações Básicas</h3>
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="cliente"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cliente</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do cliente" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="marca"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marca</FormLabel>
                    <FormControl>
                      <Input placeholder="Marca do motor" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="modelo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Modelo</FormLabel>
                    <FormControl>
                      <Input placeholder="Modelo do motor" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tipo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="MONO">Monofásico</SelectItem>
                        <SelectItem value="TRIFÁSICO">Trifásico</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Características Técnicas */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Características Técnicas</h3>
            <div className="grid grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="cv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Potência (CV)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tensao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tensão (V)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Ex: 220,380,440" 
                        {...field}
                        onChange={(e) => field.onChange(e.target.value.split(','))}
                      />
                    </FormControl>
                    <FormDescription>Separe os valores por vírgula</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amperagem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Corrente (A)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Ex: 5,10,15" 
                        {...field}
                        onChange={(e) => field.onChange(e.target.value.split(','))}
                      />
                    </FormControl>
                    <FormDescription>Separe os valores por vírgula</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Dimensões e Características Físicas */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Dimensões</h3>
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="comprimento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comprimento (mm)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 150" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="diametro"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Diâmetro do núcleo (mm)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 80" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rpm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rotação (RPM)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 1750" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Informações de Bobinagem */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Dados de Bobinagem</h3>
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="numRanhuras"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número de Ranhuras</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Ex: 36" 
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="numEspirasPrincipal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Espiras Principal</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Ex: 100" 
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.watch("tipo") === "MONO" && (
                <FormField
                  control={form.control}
                  name="numEspirasAuxiliar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Espiras Auxiliar</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Ex: 50" 
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          </div>

          {/* Fios e Capacitor */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Fios e Capacitor</h3>
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="fio.principal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bitola do Fio Principal</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 22 AWG" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.watch("tipo") === "MONO" && (
                <>
                  <FormField
                    control={form.control}
                    name="fio.auxiliar"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bitola do Fio Auxiliar</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: 24 AWG" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="capacitor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Capacitor</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: 30µF 380V" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>
          </div>

          {/* Ligação e Observações */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Ligação e Observações</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <FormField
                  control={form.control}
                  name="ligacao.pagina"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Página do Rebobinador</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Ex: 42" 
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="observacoes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observações</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Observações adicionais..."
                        className="h-20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        {/* Botões fixos no rodapé */}
        <div className="sticky bottom-0 flex justify-end gap-4 pt-6 pb-2 bg-background border-t mt-8">
          <Button variant="outline" onClick={onCancel} disabled={isLoading}>
            Cancelar
          </Button>
          <Button 
            type="submit" 
            className="bg-[#28a745] hover:bg-[#218838] min-w-[120px]"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {motor ? "Atualizando..." : "Cadastrando..."}
              </>
            ) : (
              motor ? "Atualizar" : "Cadastrar"
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
} 
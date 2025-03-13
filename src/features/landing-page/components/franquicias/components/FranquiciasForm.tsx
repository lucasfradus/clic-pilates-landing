'use client'

import {
  toast
} from 'sonner'
import {
  useForm
} from 'react-hook-form'
import {
  zodResolver
} from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useState } from 'react'
import { CheckIcon, X } from 'lucide-react'
import {
  Button
} from '@/components/ui/button'
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Input
} from '@/components/ui/input'
import {
  Textarea
} from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { TextShimmerWave } from '@/components/motion-primitives/text-shimmer-wave'

const formSchema = z.object({
  name: z.string().min(1, 'Por favor ingresa tu nombre').max(35),
  email: z.string().email('Por favor ingresa un email válido'),
  age: z.string({
    required_error: 'Ingresa tu edad' // Set error message for empty field
  })
    .min(1, 'Ingresa tu edad')
    .transform((val) => val === '' ? undefined : parseInt(val, 10))
    .pipe(
      z.number()
        .min(1, 'Ingresa tu edad')
        .max(120, 'La edad debe ser menor a 120 años')
    ),
  phone: z.string().min(1, 'El teléfono es requerido'),
  occupation: z.string().max(30).optional(),
  location: z.string().min(5, 'Por favor especifica una ubicación').max(30),
  investment: z.string().min(1, 'Selecciona un nivel de inversión'),
  como_nos_conociste: z.string().optional(),
  why: z.string().optional()
})

export default function FranquiciasForm (): React.JSX.Element {
  const [formStatus, setFormStatus] = useState<'initial' | 'loading' | 'submitted'>('initial')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      age: undefined,
      phone: '',
      occupation: '',
      location: '',
      investment: '',
      como_nos_conociste: '',
      why: ''
    }
  })

  function onSubmit (values: z.infer<typeof formSchema>): void {
    try {
      setFormStatus('loading')
      console.log(values)

      // Simulate API call with delay
      setTimeout(() => {
        // Show custom toast with CheckIcon
        toast(
          <div className='flex items-start'>
            <div className='mr-3 rounded-full bg-accent p-2'>
              <CheckIcon className='h-4 w-4 text-background' />
            </div>
            <div>
              <p className='font-medium'>Recibimos tu consulta</p>
              <p className='text-sm text-muted-foreground'>Te contactaremos a la brevedad</p>
            </div>
          </div>
        )

        // Reset form and update status
        form.reset()
        setFormStatus('submitted')
      }, 1500)
    } catch (error) {
      console.error('Form submission error', error)
      toast(
        <div className='flex items-start'>
          <div className='mr-3 rounded-full bg-accent p-2'>
            <X className='h-4 w-4 text-background' />
          </div>
          <div>
            <p className='font-medium'>Ocurrió un error</p>
            <p className='text-sm text-muted-foreground'>No recibimos tu consulta </p>
          </div>
        </div>
      )
      setFormStatus('initial')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 md:space-y-5 w-full px-12 lg:px-14 mx-auto'>
        <h3 className='text-2xl md:text-3xl font-semibold text-primary uppercase mb-6 md:mb-10'>Franquicias</h3>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div className='col-span-1'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre y Apellido</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Juan Pérez'
                      type='text'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='col-span-1'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='juanperez@gmail.com'
                      type='email'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
          <div className='col-span-1'>
            <FormField
              control={form.control}
              name='age'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Edad</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='35'
                      type='number'
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                      value={field.value !== undefined && field.value !== null ? field.value : ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='col-span-1'>
            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem className='flex flex-col items-start'>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl className='w-full'>
                    <Input
                      placeholder='+54 11 1234-5678'
                      type='tel'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='col-span-1'>
            <FormField
              control={form.control}
              name='occupation'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ocupación</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Empresario'
                      type='text'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div className='col-span-1'>
            <FormField
              control={form.control}
              name='location'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>¿En dónde te gustaría abrir?</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Tigre, Buenos Aires'
                      className='resize-none'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='col-span-1'>
            <FormField
              control={form.control}
              name='como_nos_conociste'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>¿Cómo nos conociste?</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      const handleComoNosConociste = (): void => {
                        field.onChange(value)
                      }
                      handleComoNosConociste()
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Instagram' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='instagram'>Instagram</SelectItem>
                      <SelectItem value='amigo'>Un amigo</SelectItem>
                      <SelectItem value='google'>Google</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name='investment'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Inversión</FormLabel>
              <Select
                onValueChange={(value) => {
                  const handleInvestmentChange = (): void => {
                    field.onChange(value)
                  }
                  handleInvestmentChange()
                }}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Cuánto estás dispuesto a invertir' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='45000-65000'>45.000 a 65.000 USD</SelectItem>
                  <SelectItem value='65000-85000'>65.000 a 85.000 USD</SelectItem>
                  <SelectItem value='otro'>Otro</SelectItem>
                </SelectContent>
              </Select>
              {/* <FormDescription>Nivel de inversión disponible</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='why'
          render={({ field }) => (
            <FormItem>
              <FormLabel>¿Por qué queres abrir un Clic Studio Pilates?</FormLabel>
              <FormControl>
                <Textarea
                  placeholder=''
                  className='resize-none'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          disabled={formStatus !== 'initial'}
          className='w-full cursor-pointer py-4 md:py-6'
        >
          {formStatus === 'initial'
            ? (
                'Enviar'
              )
            : formStatus === 'loading'
              ? (
                <TextShimmerWave
                  className='[--base-color:#FDFBFA] [--base-gradient-color:#FAFAFA]'
                  duration={1}
                  spread={1}
                  zDistance={1}
                  scaleDistance={1.1}
                  rotateYDistance={20}
                >
                  Enviando consulta...
                </TextShimmerWave>
                )
              : (
                  'Recibimos tu consulta'
                )}
        </Button>
      </form>
    </Form>
  )
}

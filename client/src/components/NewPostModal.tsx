import * as Dialog from '@radix-ui/react-dialog'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'phosphor-react'

const newPostFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

type NewTransactionFormInputs = z.infer<typeof newPostFormSchema>

export function NewPostModal() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newPostFormSchema),
  })

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className='fixed w-screen h-screen inset-0 bg-black/75'/>

      <Dialog.Content className='min-w-[512px] rounded-md py-8 px-12 '>
        <Dialog.Title>Nova transação</Dialog.Title>

        <Dialog.Close className='absolute transparent border-none top-4 right-4 cursor-pointer'>
          <X size={24} />
        </Dialog.Close>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register('description')}
          />

          <input
            type="number"
            placeholder="Preço"
            required
            {...register('price', { valueAsNumber: true })}
          />

          <input
            type="text"
            placeholder="Categoria"
            required
            {...register('category')}
          />

          <button type="submit" disabled={isSubmitting}>
            Postar
          </button>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}

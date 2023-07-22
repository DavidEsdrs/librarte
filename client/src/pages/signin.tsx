import Image from "next/image";

import bg from '@/assets/image.png'
import Head from "next/head";
import { useForm } from "react-hook-form";
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormInput } from "@/components/FormInput";
import { ErrorMessage } from "@/components/ErrorMessage";

const signInFormSchema = z.object({
  email: z.string()
    .nonempty("O e-mail é obrigatório")
    .email("Formato de email inválido")
    .toLowerCase(),

  password: z.string()
    .nonempty("A senha é obrigatória")
})

type SignUpFormData = z.infer<typeof signInFormSchema>

export default function SignIn() {
  const { 
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signInFormSchema)
  })

  function handleSignIn({ email, password }: SignUpFormData) {
    console.log({ email, password })
  }

  return (
    <>
      <Head>
        <title>Librarte | Sign In</title>
      </Head>

      <main className="flex h-full w-full p-4">
        <Image src={bg} alt="" className="bg-cover"/>

        <section className="flex-1 flex justify-center items-center">
          <div>
            <h1 className="text-xl font-bold">Boas vindas!</h1>
            <span className="text-gray-200 text-md">Faça seu login e acesse nosso conteúdo</span>

            <form className="w-[372px] space-y-4 mt-8" onSubmit={handleSubmit(handleSignIn)}>
              <FormInput 
                name="email"
                placeholder="Digite seu email"
                register={register}
              />
              {errors.email && <ErrorMessage message={errors.email.message as string}/>}

              <FormInput 
                name="password"
                placeholder="Digite sua senha"
                type="password"
                register={register}
              />
              {errors.password && <ErrorMessage message={errors.password.message as string}/>}

              <button 
                className="w-full p-4 bg-green-200 rounded-md disabled:opacity-70" 
                type="submit" 
                disabled={isSubmitting}
              >
                Entrar
              </button>
            </form>

          </div>
        </section>
      </main>
    </>
  )
}
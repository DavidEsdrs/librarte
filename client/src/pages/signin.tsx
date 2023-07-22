import Image from "next/image";

import bg from '@/assets/image.png'
import Head from "next/head";
import { useForm } from "react-hook-form";
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormInput } from "@/components/FormInput";
import { ErrorMessage } from "@/components/ErrorMessage";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-toastify";
import { AppError } from "@/utils/AppError";
import { useRouter } from "next/router";
import Link from "next/link";

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
  const router = useRouter()
  const { signIn } = useAuth()

  const { 
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signInFormSchema)
  })

  async function handleSignIn({ email, password }: SignUpFormData) {
    try {
      await signIn({ email, password })
      router.push('/')
    }
    catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível fazer o login. Tente novamente'

      toast.error(title)
    }
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

              <Link href='/signup' className="w-full text-center block">
                Não tem conta? <span className="text-green-100">Cadastre-se</span>
              </Link>
            </form>

          </div>
        </section>
      </main>
    </>
  )
}
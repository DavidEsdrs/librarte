import { FormInput } from "@/components/FormInput";
import Head from "next/head";
import Image from "next/image";
import bg from '@/assets/image.png'
import { useForm } from "react-hook-form";
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ErrorMessage } from "@/components/ErrorMessage";

const signUpFormSchema = z.object({
  name: z.string()
    .nonempty("O nome é obrigatório")
    .min(3, "O campo deve ter mais de 3 caracteres")
    .transform(name => {
      return name.trim().split(' ').map(word => {
        return word[0].toLocaleUpperCase().concat(word.substring(1))
      }).join(' ')
    }),

  username: z.string()
    .nonempty("O username é obrigatório")
    .min(3, "O campo deve ter mais de 3 caracteres"),

  email: z.string()
    .nonempty("O e-mail é obrigatório")
    .email("Formato de email inválido")
    .toLowerCase(),

  password: z.string()
    .nonempty("A senha é obrigatória")
    .min(6, "A senha precisa de no mínimo 6 caracteres"),
})

type SignUpFormData = z.infer<typeof signUpFormSchema>

export default function SignUp() {
  const { 
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema)
  })
  
  async function handleSignUp({ name, username, email, password }: SignUpFormData) {
    
  }

  return (
    <>
      <Head>
        <title>Librarte | Sign Up</title>
      </Head>

      <main className="flex h-full w-full p-4">
        <Image src={bg} alt="" className="bg-cover"/>

        <section className="flex-1 flex justify-center items-center">
          <div>
            <h1 className="text-xl font-bold">Cadastre-se!</h1>
            <span className="text-gray-200 text-md">Faça seu cadastro e acesse nosso conteúdo</span>

            <form className="w-[372px] space-y-4 mt-8" onSubmit={handleSubmit(handleSignUp)}>
              <FormInput 
                name="name"
                placeholder="Digite seu nome completo"
                register={register}
              />
              {errors.name && <ErrorMessage message={errors.name.message as string}/>}

              <FormInput 
                name="username"
                placeholder="Digite seu nome de usuário"
                register={register}
              />
              {errors.username && <ErrorMessage message={errors.username.message as string}/>}

              <FormInput
                name="email"
                placeholder="Digite seu e-mail" 
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
                Cadastrar
              </button>
            </form>

          </div>
        </section>
      </main>
    </>
  )
}
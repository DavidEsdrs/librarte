import { FormInput } from "@/components/FormInput";
import Head from "next/head";
import Image from "next/image";
import bg from '@/assets/image.png'

export default function SignUp() {
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
            <form className="w-[372px] space-y-4 mt-8">
              <FormInput placeholder="Digite seu nome completo"/>
              <FormInput placeholder="Digite seu nome de usuário"/>
              <FormInput placeholder="Digite seu email"/>
              <FormInput placeholder="Digite sua senha" type="password"/>
              <FormInput placeholder="Confirme sua senha" type="password"/>
            </form>

            <button className="w-full p-4 bg-green-200 rounded-md mt-4 ">Cadastrar</button>
          </div>
        </section>
      </main>
    </>
  )
}
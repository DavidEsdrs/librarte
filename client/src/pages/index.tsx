import { PostCard } from "@/components/PostCard";
import { CaretRight, ChartLineUp, Plus } from 'phosphor-react'
import book from '@/assets/book.svg'
import { Sidebar } from "@/components/Sidebar";
import Head from "next/head";
import { GetServerSideProps } from "next";
import * as Dialog  from "@radix-ui/react-dialog";
import { NewPostModal } from "@/components/NewPostModal"

export default function Home() {
  return (
    <>
      <Head>
        <title>Librarte | Home</title>
      </Head>

      <Sidebar />
      <main className="flex-1 flex justify-center overflow-auto p-16">
        <div className="flex w-full max-w-[1420px] flex-col">
          <h1 className="flex items-center text-gray-100 text-2xl font-bold gap-4">
            <ChartLineUp size={32} className="text-green-100"/>
            Início
          </h1>
          
          <div className="flex mt-12">
            <section className="flex-1 space-y-16 flex flex-col items-center xl:items-start">
              <article className="space-y-4">
                <div className="flex justify-between">
                  <h2>Timeline</h2>
                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <button className="flex gap-2 text-green-100 hover:opacity-70">
                        Adicionar post
                        <Plus size={24}/>
                      </button>
                    </Dialog.Trigger>

                    <NewPostModal />
                  </Dialog.Root>
                </div>
                <PostCard 
                  creator={{
                    name: "Matheus Oliveira",
                    createdAt: "Hoje",
                  }}
                  bookDescription={{
                    image: book,
                    title:"Entendendo Algoritmos",
                    author:"Aditya Bhargava",
                    description: "Nec tempor nunc in egestas. Euismod nisi eleifend at et in sagittis. Penatibus id vestibulum imperdiet a at imperdiet lectu..."
                  }}
                />
              </article>
            </section>

            <section className="w-[372px] hidden xl:block self-start space-y-6 px-6">
              <div className="flex justify-between items-center">
                <h2>Livros populares</h2>
                <a href="" className="flex items-center gap-2 text-purple-100">
                  Ver todos
                  <CaretRight size={16}/>
                </a>
              </div>
              
              <div className="space-y-3">
                Livros populares aqui
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  )
}
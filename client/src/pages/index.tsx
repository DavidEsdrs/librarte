import { PostCard } from "@/components/PostCard";
import Image from "next/image";
import { CaretRight, ChartLineUp } from 'phosphor-react'

import book from '@/assets/book.svg'

export default function Home() {
  return (
    <div className="flex w-full max-w-[1420px] flex-col">
      <h1 className="flex items-center text-gray-100 text-2xl font-bold gap-4">
        <ChartLineUp size={32} className="text-green-100"/>
        Início
      </h1>

      <div className="flex mt-12">
        <section className="flex-1 space-y-16 flex flex-col items-center xl:items-start">
          <article className="max-w-[608px] space-y-4">
            <h2>Avaliações mais recentes</h2>

            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
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
            <div className="flex gap-8 bg-gray-700 py-5 px-6 rounded-xl">
              <Image src={book} alt="Livro" className="w-[64px] "/>
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex flex-1 flex-col ">
                  <strong>Entendendo Algoritmos</strong>
                  <span className="text-sm text-gray-300">Aditya Bhargava</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      
    </div>
  )
}

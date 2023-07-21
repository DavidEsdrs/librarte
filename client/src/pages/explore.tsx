import { Category } from "@/components/Category";
import { PostCard } from "@/components/PostCard";
import { Binoculars, MagnifyingGlass } from "phosphor-react";
import book from '@/assets/book.svg'
import { Sidebar } from "@/components/Sidebar";
import Head from "next/head";

export default function Explore() {
  return (
    <>
      <Head>
        <title>Librarte | Explore</title>
      </Head>

      <Sidebar />
      <main className="flex-1 flex justify-center overflow-auto p-16">
        <div className="flex w-full max-w-[1420px] flex-col">
          <header className="flex items-center justify-between">
            <h1 className="flex items-center text-gray-100 text-2xl font-bold gap-4">
              <Binoculars size={32} className="text-green-100"/>
              Explorar
            </h1>

            <form className="flex items-center gap-6 border border-gray-500 px-6 py-3 rounded w-[433px]">
              <input className="bg-transparent flex-1 outline-none" type="text" placeholder="Buscar livro ou autor" />

              <button type="submit" >
                <MagnifyingGlass size={20}/>
              </button>
            </form>
          </header>

          <div className="flex flex-start my-12 gap-4">
            <Category title="Computação"/>
            <Category title="Educação"/>
            <Category title="Fantasia"/>
            <Category title="Ficção científica"/>
            <Category title="Horror"/>
          </div>

          <div className="grid grid-cols-4 gap-8">
            <PostCard.Root>
              <PostCard.Content 
                image={book}
                title="Entendendo Algoritmos"
                author="Aditya Bhargava"
              />
            </PostCard.Root>
          </div>
        </div>
      </main>
    </>
  )
} 
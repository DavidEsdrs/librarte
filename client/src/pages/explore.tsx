import { Category } from "@/components/Category";
import { Binoculars } from "phosphor-react";
import { Sidebar } from "@/components/Sidebar";
import Head from "next/head";
import { BookCard } from "@/components/BookCard";
import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";

const categories = ["Todos", "Computação", "Educação", "Fantasia", 'Ficção científica', 'Horror', "Ação", "Romance", "Aventura", "Drama", "Liturgia", "Liturgia" , "Liturgia", "Liturgia" , "Liturgia", "Liturgia", "Liturgia"]

export default function Explore() {
  const [activeCategory, setActiveCategory] = useState('Todos')

  function handleSetActiveCategory(categoryTitle: string) {
    setActiveCategory(categoryTitle)
  }

  return (
    <>
      <Head>
        <title>Librarte | Explore</title>
      </Head>

      <Sidebar />
      <main className="flex-1 flex justify-center overflow-auto p-16">
        <div className="flex w-full max-w-[1420px] flex-col ">
          <header className="flex items-center justify-between">
            <h1 className="flex items-center text-gray-100 text-2xl font-bold gap-4">
              <Binoculars size={32} className="text-green-100"/>
              Explorar
            </h1>

            <div className="w-[488px]">
              <SearchBar />
            </div>
          </header>

          <div className="flex flex-start my-12 gap-4 overflow-auto pb-3">
            {categories.map(category => (
              <Category 
                key={category} 
                title={category} 
                isActive={category === activeCategory} 
                onClick={() => handleSetActiveCategory(category)}
              />
            ))}
          </div>

          <div className="grid lg:grid-cols-2 2xl:grid-cols-4 gap-8">
            <BookCard />
            <BookCard />
            <BookCard />
            <BookCard />
            <BookCard />
          </div>
        </div>
      </main>
    </>
  )
} 
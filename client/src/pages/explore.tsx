import { Category } from "@/components/Category";
import { PostCard } from "@/components/PostCard";
import { Binoculars, MagnifyingGlass } from "phosphor-react";

export default function Explore() {
  return (
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

      <div className="grid grid-cols-3 gap-8">
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
    </div>
  )
} 
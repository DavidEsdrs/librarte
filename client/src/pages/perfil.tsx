import { PostCard } from "@/components/PostCard";
import { BookOpen, Bookmark, BookmarkSimple, Books, CaretRight, MagnifyingGlass, User, UserList } from "phosphor-react";

export default function Perfil() {
  return (
    <div className="flex w-full max-w-[1420px] flex-col">
      <h1 className="flex items-center text-gray-100 text-2xl font-bold gap-4">
        <User size={32} className="text-green-100"/>
        Perfil
      </h1>

      <div className="flex mt-12 gap-16">
        <section className="flex-1 flex flex-col items-center xl:items-start">
          <form className="flex items-center gap-6 border border-gray-500 px-6 py-3 rounded w-full">
            <input className="bg-transparent flex-1 outline-none" type="text" placeholder="Buscar livro ou autor" />

            <button type="submit" >
              <MagnifyingGlass size={20}/>
            </button>
          </form>

          <div className="space-y-8 mt-16 w-full">
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
          </div>
        </section>

        <section className="w-[372px] hidden xl:block self-start border-l border-gray-700">
          <div className="flex flex-col items-center">
            <div className="text-center">
              <strong>Cristofer Rosser</strong>
              <p className="text-gray-400 text-sm">membro desde 2019</p>
            </div>

            <div className="mt-16 space-y-8">
              <div className="flex gap-4 items-center">
                <BookOpen size={32} className="text-green-100"/>
                <div>
                  <strong>3853</strong>
                  <span className="block text-sm text-gray-300">Páginas lidas</span>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <Books size={32} className="text-green-100"/>
                <div>
                  <strong>10</strong>
                  <span className="block text-sm text-gray-300">Livros avaliados</span>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <UserList size={32} className="text-green-100"/>
                <div>
                  <strong>3853</strong>
                  <span className="block text-sm text-gray-300">Autores lidos</span>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <BookmarkSimple size={32} className="text-green-100"/>
                <div>
                  <strong>3853</strong>
                  <span className="block text-sm text-gray-300">Categoria mais lida</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
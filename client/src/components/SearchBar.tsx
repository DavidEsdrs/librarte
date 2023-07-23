import { MagnifyingGlass } from "phosphor-react";

export function SearchBar() {
  return (
    <form className="flex items-center gap-6 border border-gray-500 px-6 py-3 rounded w-full">
      <input className="bg-transparent flex-1 outline-none" type="text" placeholder="Buscar livro ou autor" />

      <button type="submit" >
        <MagnifyingGlass size={20}/>
      </button>
    </form>
  )
}
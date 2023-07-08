import Image from "next/image";

import book from '@/assets/book.svg'

export function PostCard() {
  return (
    <div className="flex flex-col h-72 w-full bg-gray-700 py-6 px-6 rounded-xl items-center justify-between">
      <div className="w-full flex justify-between items-center">
        <div className="flex gap-4">
          <div className="h-[40px] w-[40px] rounded-full bg-gray-800"></div>
          <div>
            <p>Jason Dias</p>
            <time className="text-gray-300 text-sm">Hoje</time>
          </div>
        </div>
        <p>estrelas</p>
      </div>
      
      <div className="flex gap-8">
        <Image src={book} alt="Livro"/>
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex flex-1 flex-col ">
            <strong>Entendendo Algoritmos</strong>
            <span className="text-sm text-gray-300">Aditya Bhargava</span>
            <p className="text-sm text-gray-300 mt-6">Nec tempor nunc in egestas. Euismod nisi eleifend at et in sagittis. Penatibus id vestibulum imperdiet a at imperdiet lectu...</p>
          </div>
        </div>
      </div>
    </div>
  )
}
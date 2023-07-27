import book from '@/assets/book.svg'
import Image from 'next/image'

export function BookCard() {
  return (
    <div className="flex rounded-md bg-gray-700 w-full h-[184px] py-4 px-5 gap-5 items-center">
      <Image src={book} alt="book"/>

      <div className='flex flex-col h-full'>
        <strong>A revolução dos bichos</strong>
        <span className='text-sm text-gray-400 '>George Owell</span>
        <span className='mt-auto'>Estrelas</span>
      </div>      
    </div>
  )
}
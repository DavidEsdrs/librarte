import Image from "next/image"

type Creator = {
  name: string,
  createdAt: string,
}

type BookDescription = {
  image: string,
  title: string,
  author: string,
  description: string
}
  
interface PostCardProps {
  creator: Creator
  bookDescription: BookDescription
}

export function PostCard({ creator, bookDescription }: PostCardProps) {
  return (
    <div className="flex flex-col w-full bg-gray-700 py-6 px-6 rounded-xl items-center justify-between gap-8 max-w-[608px]">
      <div className="w-full flex justify-between items-center">
        <div className="flex gap-4">
          <div className="h-[40px] w-[40px] rounded-full bg-gray-800"></div>
          <div>
            <p>{creator.name}</p>
            <time className="text-gray-300 text-sm">{creator.createdAt}</time>
          </div>
        </div>
        <p>estrelas</p>
      </div>

      <div className="flex gap-8">
        <Image src={bookDescription.image} alt="Livro"/>
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex flex-col ">
            <strong>{bookDescription.title}</strong>
            <span className="text-sm text-gray-300 mt-2">{bookDescription.author}</span>
            <p className="text-sm text-gray-300 mt-6">{bookDescription.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
import Image from "next/image";

interface PostCardContent {
  image: string,
  title: string,
  author: string,
  description?: string
}

export function PostCardContent({ image, title, author, description }: PostCardContent) {
  return (
    <div className="flex gap-8">
      <Image src={image} alt="Livro"/>
      <div className="flex-1 flex flex-col gap-2">
        <div className="flex flex-col ">
          <strong>{title}</strong>
          <span className="text-sm text-gray-300 mt-2">{author}</span>
          {description && <p className="text-sm text-gray-300 mt-6">{description}</p>}
        </div>
      </div>
    </div>
  )
}
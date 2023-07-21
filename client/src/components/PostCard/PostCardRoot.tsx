import { ReactNode } from "react"

interface PostCardRootProps {
  children: ReactNode
}

export function PostCardRoot({ children }: PostCardRootProps) {
  return (
    <div className="flex flex-col w-full bg-gray-700 py-6 px-6 rounded-xl items-center justify-between gap-8 max-w-[608px]">
      {children}
    </div>
  )
}
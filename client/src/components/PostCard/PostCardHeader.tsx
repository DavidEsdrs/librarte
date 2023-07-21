export function PostCardHeader() {
  return (
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
  )
}
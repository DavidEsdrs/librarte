interface CategoryProps {
  title: string
}

export function Category({ title }: CategoryProps) {
  return (
    <button className="text-purple-100 font-normal border border-purple-100 rounded-2xl py-1 px-4">
      {title}
    </button>
  )
}
interface CategoryProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  isActive: boolean
}

export function Category({ title, isActive, ...rest }: CategoryProps) {

  return (
    <button 
      className={`
      text-purple-100
        font-normal border
      border-purple-100
        rounded-2xl 
        py-1 
        px-4
        ${isActive && 'text-white bg-purple-200 border-transparent'}
      `}
      {...rest}
    >
      {title}
    </button>
  )
}
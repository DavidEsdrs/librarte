interface ErrorMessageProps {
  message: string
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="bg-red-500 w-full rounded p-2">
      <span className="text-white">{message}</span>
    </div>
  )
}
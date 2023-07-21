interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string,
}

export function FormInput({ placeholder, ...rest }: FormInputProps) {
  return (
    <input 
      placeholder={placeholder}
      {...rest}
      className="block w-full rounded-md p-4 bg-gray-600 text-gray-200"
    />
  )
}
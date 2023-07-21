import { UseFormRegister, FieldValues } from "react-hook-form";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  placeholder: string,
  register: UseFormRegister<any>
}

export function FormInput({ name, placeholder, register, ...rest }: FormInputProps) {
  return (
    <input 
      placeholder={placeholder}
      {...rest}
      {...register(name)}
      className="block w-full rounded-md p-4 bg-gray-600 text-gray-200"
    />
  )
}
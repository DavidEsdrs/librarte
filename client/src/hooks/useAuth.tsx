import { UserDTO } from "@/dtos/UserDTO";
import { api } from "@/services/api";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

interface UserLogin {
  email: string,
  password: string
}

interface AuthContextProps {
  user: UserDTO | null
  isAuthenticated: boolean
  signIn: (data: UserLogin) => Promise<void>
}

const AuthContext = createContext({} as AuthContextProps)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserDTO | null>(null) 

  const isAuthenticated = !!user

  async function signIn({ email, password }: UserLogin) {
    const { data } = await api.post('auth/login', {
      email, 
      password 
    })

    if (data.user) {
      setUser(data.user)
    }
  }
  
  async function fetchUser() {
    const { data } = await api.get('users')
    if (data) {
      setUser(data)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
import { ReactNode, createContext, useContext, useState } from "react";

interface NewUser {
  name: string;
  username: string;
  email: string;
  password: string;
}

interface AuthContextProps {
  createAccount: (data: NewUser) => Promise<void>
}

const AuthContext = createContext({} as AuthContextProps)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState(null) 

  async function createAccount({ name, username, email, password }: NewUser) {
    
  }

  return (
    <AuthContext.Provider value={{ createAccount }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
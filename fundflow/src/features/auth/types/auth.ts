export interface User {
  id: string
  email: string
  name?: string
  avatar?: string
  emailVerified?: boolean
  createdAt: string
  updatedAt: string
}

export interface Session {
  user: User
  expires: string
  accessToken?: string
}

export interface AuthState {
  user: User | null
  session: Session | null
  isLoading: boolean
  isAuthenticated: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  name: string
  confirmPassword: string
}

export interface AuthProvider {
  id: string
  name: string
  type: "oauth" | "email"
}
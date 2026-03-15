// API client utilities for making HTTP requests

interface ApiClientConfig {
  baseURL?: string
  timeout?: number
  headers?: Record<string, string>
}

interface ApiResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: Record<string, string>
}

interface ApiError {
  message: string
  status: number
  code?: string
  details?: any
}

export class ApiClient {
  private baseURL: string
  private timeout: number
  private defaultHeaders: Record<string, string>

  constructor(config: ApiClientConfig = {}) {
    this.baseURL = config.baseURL || "/api"
    this.timeout = config.timeout || 30000
    this.defaultHeaders = {
      "Content-Type": "application/json",
      ...config.headers,
    }
  }

  private async request<T>(
    method: string,
    endpoint: string,
    data?: any,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`
    const controller = new AbortController()
    
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)

    try {
      const response = await fetch(url, {
        method,
        headers: {
          ...this.defaultHeaders,
          ...options.headers,
        },
        body: data ? JSON.stringify(data) : undefined,
        signal: controller.signal,
        ...options,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        const error: ApiError = {
          message: errorData.message || response.statusText,
          status: response.status,
          code: errorData.code,
          details: errorData,
        }
        throw error
      }

      const responseData = await response.json()
      
      return {
        data: responseData,
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
      }
    } catch (error) {
      clearTimeout(timeoutId)
      
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          throw new Error("Request timeout")
        }
        throw error
      }
      throw new Error("Unknown error occurred")
    }
  }

  async get<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>("GET", endpoint, undefined, options)
  }

  async post<T>(endpoint: string, data?: any, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>("POST", endpoint, data, options)
  }

  async put<T>(endpoint: string, data?: any, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>("PUT", endpoint, data, options)
  }

  async patch<T>(endpoint: string, data?: any, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>("PATCH", endpoint, data, options)
  }

  async delete<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>("DELETE", endpoint, undefined, options)
  }

  setAuthToken(token: string): void {
    this.defaultHeaders.Authorization = `Bearer ${token}`
  }

  removeAuthToken(): void {
    delete this.defaultHeaders.Authorization
  }
}

// Create a singleton instance
export const apiClient = new ApiClient()

// Helper functions for common API operations
export async function fetchData<T>(endpoint: string): Promise<T> {
  const response = await apiClient.get<T>(endpoint)
  return response.data
}

export async function postData<T>(endpoint: string, data: any): Promise<T> {
  const response = await apiClient.post<T>(endpoint, data)
  return response.data
}

export async function updateData<T>(endpoint: string, data: any): Promise<T> {
  const response = await apiClient.put<T>(endpoint, data)
  return response.data
}

export async function deleteData(endpoint: string): Promise<void> {
  await apiClient.delete(endpoint)
}

// Transaction-specific API calls
export const transactionApi = {
  getAll: (params?: any) => fetchData(`/transactions?${new URLSearchParams(params)}`),
  getById: (id: string) => fetchData(`/transactions/${id}`),
  create: (data: any) => postData("/transactions", data),
  update: (id: string, data: any) => updateData(`/transactions/${id}`, data),
  delete: (id: string) => deleteData(`/transactions/${id}`),
  getCategories: () => fetchData("/transactions/categories"),
  import: (data: any) => postData("/transactions/import", data),
}

// Budget-specific API calls
export const budgetApi = {
  getAll: () => fetchData("/budgets"),
  getById: (id: string) => fetchData(`/budgets/${id}`),
  create: (data: any) => postData("/budgets", data),
  update: (id: string, data: any) => updateData(`/budgets/${id}`, data),
  delete: (id: string) => deleteData(`/budgets/${id}`),
}

// Wallet-specific API calls
export const walletApi = {
  getAll: () => fetchData("/wallets"),
  getById: (id: string) => fetchData(`/wallets/${id}`),
  create: (data: any) => postData("/wallets", data),
  update: (id: string, data: any) => updateData(`/wallets/${id}`, data),
  delete: (id: string) => deleteData(`/wallets/${id}`),
}

// Analytics-specific API calls
export const analyticsApi = {
  getSummary: () => fetchData("/analytics/summary"),
  getTrends: (period?: string) => fetchData(`/analytics/trends?period=${period || "6months"}`),
}

// Goal-specific API calls
export const goalApi = {
  getAll: () => fetchData("/goals"),
  getById: (id: string) => fetchData(`/goals/${id}`),
  create: (data: any) => postData("/goals", data),
  update: (id: string, data: any) => updateData(`/goals/${id}`, data),
  delete: (id: string) => deleteData(`/goals/${id}`),
}

// Export-specific API calls
export const exportApi = {
  csv: (params?: any) => fetchData(`/export/csv?${new URLSearchParams(params)}`),
  pdf: (params?: any) => fetchData(`/export/pdf?${new URLSearchParams(params)}`),
}
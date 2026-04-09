export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

async function fetchApi(endpoint: string, method: HttpMethod, body?: any) {
  const token = localStorage.getItem("token");
  
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Something went wrong");
  }
  
  // For DELETE or empty responses
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

export const api = {
  auth: {
    signup: (data: any) => fetchApi("/api/users/signup", "POST", data),
    login: (data: any) => fetchApi("/api/users/login", "POST", data),
  },
  accounts: {
    create: (data: any) => fetchApi("/api/accounts/create", "POST", data),
    getAll: () => fetchApi("/api/accounts/all", "GET"),
    getById: (id: string) => fetchApi(`/api/accounts/get/${id}`, "GET"),
    update: (id: string, data: any) => fetchApi(`/api/accounts/update/${id}`, "PUT", data),
    delete: (id: string) => fetchApi(`/api/accounts/delete/${id}`, "DELETE"),
  },
  budgets: {
    create: (data: any) => fetchApi("/api/budgets", "POST", data),
    getAll: () => fetchApi("/api/budgets", "GET"),
    getById: (id: string) => fetchApi(`/api/budgets/${id}`, "GET"),
    update: (id: string, data: any) => fetchApi(`/api/budgets/${id}`, "PUT", data),
    delete: (id: string) => fetchApi(`/api/budgets/${id}`, "DELETE"),
  },
  transactions: {
    create: (data: any) => fetchApi("/api/transactions", "POST", data),
    getAll: (page = 0, size = 20) => fetchApi(`/api/transactions?page=${page}&size=${size}&sort=transactionDate,desc`, "GET"),
    getByAccount: (accountId: string) => fetchApi(`/api/transactions/account/${accountId}`, "GET"),
    delete: (id: string) => fetchApi(`/api/transactions/${id}`, "DELETE"),
  }
};

const BASE_URL = 'http://localhost:3000';

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) { 
    super(message);
    this.name = 'ApiError';
    this.status = status; 
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = 'Ocorreu um erro na requisição.';
    try {
      const parsed = JSON.parse(errorText);
      if (parsed.message) errorMessage = parsed.message;
    } catch {
      if (errorText) errorMessage = errorText;
    }
    throw new ApiError(response.status, errorMessage);
  }
  
  const text = await response.text();
  if (!text) {
    return {} as T;
  }
  
  return JSON.parse(text);
}

function getHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  try {
    const storage = localStorage.getItem('auth-storage');
    if (storage) {
      const parsed = JSON.parse(storage);
      const token = parsed.state?.token;
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }
  } catch {
    // Fail silently
  }

  return headers;
}

export const apiClient = {
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return handleResponse<T>(response);
  },

  async post<T>(endpoint: string, body: unknown): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(body),
    });
    return handleResponse<T>(response);
  },

  async patch<T>(endpoint: string, body: unknown): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify(body),
    });
    return handleResponse<T>(response);
  },

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return handleResponse<T>(response);
  },
};
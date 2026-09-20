export const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const getStoredUser = () => {
  if (typeof window === 'undefined') {
    return { id: 'user-1', balance: 2500 };
  }

  try {
    return JSON.parse(localStorage.getItem('primebet-user') || '{}');
  } catch {
    return { id: 'user-1', balance: 2500 };
  }
};

export const saveStoredUser = (user: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('primebet-user', JSON.stringify(user));
  }
};

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    throw new Error(`API request failed for ${path}: ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

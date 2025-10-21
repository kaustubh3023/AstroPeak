export interface AdminStats {
  totalUsers: number;
  totalRequests: number;
  queuedRequests: number;
  fulfilledRequests: number;
}

export interface User {
  id: number;
  uid: string;
  phone: string;
  name?: string;
  gender?: string;
  age?: string;
  dob?: string;
  zodiacSign?: string;
}

export interface ServiceRequest {
  id: number;
  uid: string;
  name: string;
  phone: string;
  serviceType: string;
  message: string;
  status: 'queued' | 'fulfilled' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

const API_BASE = 'https://astropeak.onrender.com';

let adminHeaders: Record<string, string> = {
  'Content-Type': 'application/json',
};

// Call this after login to set headers for all admin requests
export function setAdminCredentials(username: string, password: string) {
  adminHeaders = {
    'Content-Type': 'application/json',
    username,
    password,
  };
}

export const adminApi = {
  async login(credentials: LoginCredentials) {
    const response = await fetch(`${API_BASE}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) throw new Error('Login failed');
    const data = await response.json();
    if (data.success) {
      // set headers for future requests
      setAdminCredentials(credentials.username, credentials.password);
    }
    return data;
  },

  async getStats(): Promise<AdminStats> {
    const response = await fetch(`${API_BASE}/api/admin/stats`, {
      headers: adminHeaders,
    });
    if (!response.ok) throw new Error('Failed to fetch stats');
    return response.json();
  },

  async getUsers(): Promise<User[]> {
    const response = await fetch(`${API_BASE}/api/admin/users`, {
      headers: adminHeaders,
    });
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  },

  async getRequests(): Promise<ServiceRequest[]> {
    const response = await fetch(`${API_BASE}/api/admin/requests`, {
      headers: adminHeaders,
    });
    if (!response.ok) throw new Error('Failed to fetch requests');
    return response.json();
  },

  async updateRequestStatus(id: number, status: 'queued' | 'fulfilled' | 'cancelled') {
    const response = await fetch(`${API_BASE}/api/admin/requests/${id}/status`, {
      method: 'PATCH',
      headers: adminHeaders,
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error('Failed to update request status');
  },

  async deleteRequest(id: number) {
    const response = await fetch(`${API_BASE}/api/admin/requests/${id}`, {
      method: 'DELETE',
      headers: adminHeaders,
    });
    if (!response.ok) throw new Error('Failed to delete request');
  },
};

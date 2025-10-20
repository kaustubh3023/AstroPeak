import { apiRequest } from './queryClient';

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

const defaultHeaders = {
  'Content-Type': 'application/json',
};

// Use direct URL to backend server to avoid proxy issues
const API_BASE = 'https://astropeak.onrender.com';

export const adminApi = {
  async login(credentials: LoginCredentials): Promise<{ message: string; success: boolean }> {
    const response = await fetch(`${API_BASE}/api/admin/login`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(credentials),
      credentials: 'include',
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to login: ${errorText}`);
    }
    return response.json();
  },

  async logout(): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE}/api/admin/logout`, {
      method: 'POST',
      headers: defaultHeaders,
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to logout');
    return response.json();
  },

  async checkStatus(): Promise<{ isAdmin: boolean }> {
    const response = await fetch(`${API_BASE}/api/admin/status`, {
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to check status');
    return response.json();
  },

  async getStats(): Promise<AdminStats> {
    const response = await fetch(`${API_BASE}/api/admin/stats`, {
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch stats');
    return response.json();
  },

  async getUsers(): Promise<User[]> {
    const response = await fetch(`${API_BASE}/api/admin/users`, {
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  },

  async getRequests(): Promise<ServiceRequest[]> {
    const response = await fetch(`${API_BASE}/api/admin/requests`, {
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch requests');
    return response.json();
  },

  async updateRequestStatus(id: number, status: 'queued' | 'fulfilled' | 'cancelled'): Promise<void> {
    const response = await fetch(`${API_BASE}/api/admin/requests/${id}/status`, {
      method: 'PATCH',
      headers: defaultHeaders,
      body: JSON.stringify({ status }),
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to update request status');
  },

  async deleteRequest(id: number): Promise<void> {
    const response = await fetch(`${API_BASE}/api/admin/requests/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to delete request');
  },
};

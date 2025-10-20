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

// Use your backend domain here
const API_BASE = 'https://astropeak.onrender.com';

export const adminApi = {
  // Simple username + password login
  async login(credentials: LoginCredentials): Promise<{ message: string; success: boolean }> {
    const response = await fetch(`${API_BASE}/api/admin/login`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Login failed: ${errorText}`);
    }

    return response.json();
  },

  // You don’t need logout/status if there’s no cookie/session,
  // but keeping these for frontend UI consistency is fine
  async checkStatus(): Promise<{ isAdmin: boolean }> {
    return { isAdmin: true }; // Always true once logged in
  },

  async getStats(): Promise<AdminStats> {
    const response = await fetch(`${API_BASE}/api/admin/stats`);
    if (!response.ok) throw new Error('Failed to fetch stats');
    return response.json();
  },

  async getUsers(): Promise<User[]> {
    const response = await fetch(`${API_BASE}/api/admin/users`);
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  },

  async getRequests(): Promise<ServiceRequest[]> {
    const response = await fetch(`${API_BASE}/api/admin/requests`);
    if (!response.ok) throw new Error('Failed to fetch requests');
    return response.json();
  },

  async updateRequestStatus(id: number, status: 'queued' | 'fulfilled' | 'cancelled'): Promise<void> {
    const response = await fetch(`${API_BASE}/api/admin/requests/${id}/status`, {
      method: 'PATCH',
      headers: defaultHeaders,
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error('Failed to update request status');
  },

  async deleteRequest(id: number): Promise<void> {
    const response = await fetch(`${API_BASE}/api/admin/requests/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete request');
  },
};

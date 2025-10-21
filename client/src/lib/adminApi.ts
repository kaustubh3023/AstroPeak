// lib/adminApi.ts

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

// Store admin credentials in-memory
let adminUsername = '';
let adminPassword = '';

// Set credentials after login
export function setAdminCredentials(username: string, password: string) {
  adminUsername = username;
  adminPassword = password;
}

function getAdminHeaders() {
  return {
    'Content-Type': 'application/json',
    username: adminUsername,
    password: adminPassword,
  };
}

export const adminApi = {
  // Admin login
  async login(credentials: LoginCredentials) {
    const res = await fetch(`${API_BASE}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!res.ok) throw new Error('Login failed');

    // Save credentials to use in future requests
    setAdminCredentials(credentials.username, credentials.password);
    return res.json();
  },

  // Get all users
  async getUsers(): Promise<User[]> {
    const res = await fetch(`${API_BASE}/api/admin/users`, { headers: getAdminHeaders() });
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
  },

  // Get all service requests
  async getRequests(): Promise<ServiceRequest[]> {
    const res = await fetch(`${API_BASE}/api/admin/requests`, { headers: getAdminHeaders() });
    if (!res.ok) throw new Error('Failed to fetch requests');
    return res.json();
  },

  // Get stats
  async getStats(): Promise<AdminStats> {
    const res = await fetch(`${API_BASE}/api/admin/stats`, { headers: getAdminHeaders() });
    if (!res.ok) throw new Error('Failed to fetch stats');
    return res.json();
  },

  // Update request status
  async updateRequestStatus(id: number, status: 'queued' | 'fulfilled' | 'cancelled') {
    const res = await fetch(`${API_BASE}/api/admin/requests/${id}/status`, {
      method: 'PATCH',
      headers: getAdminHeaders(),
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error('Failed to update request status');
  },

  // Delete request
  async deleteRequest(id: number) {
    const res = await fetch(`${API_BASE}/api/admin/requests/${id}`, {
      method: 'DELETE',
      headers: getAdminHeaders(),
    });
    if (!res.ok) throw new Error('Failed to delete request');
  },
};

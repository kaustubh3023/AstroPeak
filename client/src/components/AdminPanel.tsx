import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi, type AdminStats, type User, type ServiceRequest } from '@/lib/adminApi';
import AdminLogin from './AdminLogin';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from '@/hooks/use-toast';
import { RefreshCw, LogOut, Trash2 } from 'lucide-react';

export default function AdminPanel() {
  const [selectedTab, setSelectedTab] = useState('stats');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const queryClient = useQueryClient();

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: adminApi.getStats,
    enabled: isAuthenticated,
  });

  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: adminApi.getUsers,
    enabled: isAuthenticated,
  });

  const { data: requests, isLoading: requestsLoading } = useQuery({
    queryKey: ['admin-requests'],
    queryFn: adminApi.getRequests,
    enabled: isAuthenticated,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: 'queued' | 'fulfilled' | 'cancelled' }) =>
      adminApi.updateRequestStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-requests'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
      toast({ title: 'Status updated successfully' });
    },
    onError: () => toast({ title: 'Failed to update status', variant: 'destructive' }),
  });

  const deleteRequestMutation = useMutation({
    mutationFn: adminApi.deleteRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-requests'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
      toast({ title: 'Request deleted successfully' });
    },
    onError: () => toast({ title: 'Failed to delete request', variant: 'destructive' }),
  });

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
    queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    queryClient.invalidateQueries({ queryKey: ['admin-requests'] });
  };

  const refreshAll = () => {
    queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
    queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    queryClient.invalidateQueries({ queryKey: ['admin-requests'] });
  };

  const getStatusBadge = (status: string) => {
    const variants = { queued: 'secondary', fulfilled: 'default', cancelled: 'destructive' } as const;
    return <Badge variant={variants[status as keyof typeof variants] || 'secondary'}>{status}</Badge>;
  };

  if (isCheckingAuth) return <p>Loading...</p>;
  if (!isAuthenticated) return <AdminLogin onLoginSuccess={handleLoginSuccess} />;

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <div className="flex gap-2">
          <Button onClick={refreshAll} variant="outline">
            <RefreshCw className="w-4 h-4 mr-1" />
            Refresh
          </Button>
          <Button onClick={() => setIsAuthenticated(false)} variant="outline">
            <LogOut className="w-4 h-4 mr-1" />
            Logout
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="stats">
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div>Total Users: {stats?.totalUsers || 0}</div>
            <div>Total Requests: {stats?.totalRequests || 0}</div>
            <div>Queued: {stats?.queuedRequests || 0}, Fulfilled: {stats?.fulfilledRequests || 0}</div>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Zodiac Sign</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users?.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name || 'N/A'}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.gender || 'N/A'}</TableCell>
                  <TableCell>{user.age || 'N/A'}</TableCell>
                  <TableCell>{user.zodiacSign || 'N/A'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="requests">
          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests?.map((req) => (
                <TableRow key={req.id}>
                  <TableCell>{req.id}</TableCell>
                  <TableCell>{req.name}</TableCell>
                  <TableCell>{req.phone}</TableCell>
                  <TableCell>{req.serviceType}</TableCell>
                  <TableCell>{getStatusBadge(req.status)}</TableCell>
                  <TableCell className="flex gap-2">
                    <Select
                      value={req.status}
                      onValueChange={(value: 'queued' | 'fulfilled' | 'cancelled') =>
                        updateStatusMutation.mutate({ id: req.id, status: value })
                      }
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="queued">Queued</SelectItem>
                        <SelectItem value="fulfilled">Fulfilled</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete request?</AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteRequestMutation.mutate(req.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
}

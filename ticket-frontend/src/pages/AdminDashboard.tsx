import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: ''
  });
  const { toast } = useToast();

  // Mock users data
  const [users, setUsers] = useState([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@company.com',
      role: 'staff',
      status: 'active',
      lastLogin: '2024-01-15',
      ticketsCreated: 5,
      joinedDate: '2023-06-10'
    },
    {
      id: '2',
      name: 'Jane Doe',
      email: 'jane.doe@company.com',
      role: 'staff',
      status: 'active',
      lastLogin: '2024-01-14',
      ticketsCreated: 3,
      joinedDate: '2023-08-15'
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike.wilson@company.com',
      role: 'it_support',
      status: 'active',
      lastLogin: '2024-01-15',
      ticketsCreated: 1,
      joinedDate: '2023-03-20'
    },
    {
      id: '4',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      role: 'staff',
      status: 'inactive',
      lastLogin: '2023-12-20',
      ticketsCreated: 8,
      joinedDate: '2023-01-05'
    },
    {
      id: '5',
      name: 'Admin User',
      email: 'admin@company.com',
      role: 'admin',
      status: 'active',
      lastLogin: '2024-01-15',
      ticketsCreated: 0,
      joinedDate: '2022-11-01'
    }
  ]);

  // Mock tickets summary data
  const ticketsSummary = {
    total: 25,
    open: 8,
    inProgress: 5,
    resolved: 12
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleUserStatus = (userId: string) => {
    setUsers(users.map(user =>
      user.id === userId
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));

    const user = users.find(u => u.id === userId);
    const newStatus = user?.status === 'active' ? 'inactive' : 'active';
    
    toast({
      title: "User Status Updated",
      description: `${user?.name} has been ${newStatus === 'active' ? 'activated' : 'deactivated'}`,
    });
  };

  const deleteUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    setUsers(users.filter(user => user.id !== userId));
    
    toast({
      title: "User Deleted",
      description: `${user?.name} has been removed from the system`,
      variant: "destructive",
    });
  };

  const createUser = () => {
    const user = {
      id: Date.now().toString(),
      ...newUser,
      status: 'active',
      lastLogin: 'Never',
      ticketsCreated: 0,
      joinedDate: new Date().toISOString().split('T')[0]
    };

    setUsers([...users, user]);
    setNewUser({ name: '', email: '', role: '' });
    
    toast({
      title: "User Created",
      description: `${user.name} has been added to the system`,
    });
  };

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      admin: { variant: 'default' as const, label: 'Administrator', className: 'bg-purple-100 text-purple-800 border-purple-300' },
      it_support: { variant: 'secondary' as const, label: 'IT Support', className: 'bg-blue-100 text-blue-800 border-blue-300' },
      staff: { variant: 'outline' as const, label: 'Staff', className: 'bg-gray-100 text-gray-800 border-gray-300' }
    };
    
    const config = roleConfig[role as keyof typeof roleConfig];
    return <Badge variant={config.variant} className={config.className}>{config.label}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' 
      ? <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-300">Active</Badge>
      : <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Inactive</Badge>;
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-inter text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage users and system overview</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-foreground">{users.length}</div>
              <p className="text-sm text-muted-foreground">Total Users</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">{users.filter(u => u.status === 'active').length}</div>
              <p className="text-sm text-muted-foreground">Active Users</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">{ticketsSummary.total}</div>
              <p className="text-sm text-muted-foreground">Total Tickets</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-red-600">{ticketsSummary.open}</div>
              <p className="text-sm text-muted-foreground">Open Tickets</p>
            </CardContent>
          </Card>
        </div>

        {/* User Management */}
        <Card className="shadow-medium">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">👥</span>
                  User Management
                </CardTitle>
                <CardDescription>Manage user accounts and permissions</CardDescription>
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="red-accent">Add New User</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New User</DialogTitle>
                    <DialogDescription>Add a new user to the system</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="newName">Full Name</Label>
                      <Input
                        id="newName"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        placeholder="Enter full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newEmail">Email</Label>
                      <Input
                        id="newEmail"
                        type="email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        placeholder="Enter email address"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newRole">Role</Label>
                      <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="staff">Staff</SelectItem>
                          <SelectItem value="it_support">IT Support</SelectItem>
                          <SelectItem value="admin">Administrator</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setNewUser({ name: '', email: '', role: '' })}>
                        Cancel
                      </Button>
                      <Button 
                        onClick={createUser}
                        disabled={!newUser.name || !newUser.email || !newUser.role}
                      >
                        Create User
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {/* Search */}
            <div className="mb-6">
              <Input
                placeholder="Search users by name, email, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
            </div>

            {/* Users Table */}
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/50">
                    <TableHead className="font-semibold">User</TableHead>
                    <TableHead className="font-semibold">Role</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Last Login</TableHead>
                    <TableHead className="font-semibold">Tickets</TableHead>
                    <TableHead className="font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id} className="hover:bg-secondary/30">
                      <TableCell>
                        <div>
                          <div className="font-medium text-foreground">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getRoleBadge(user.role)}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(user.status)}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {user.lastLogin}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.ticketsCreated}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant={user.status === 'active' ? 'outline' : 'default'}
                            onClick={() => toggleUserStatus(user.id)}
                          >
                            {user.status === 'active' ? 'Deactivate' : 'Activate'}
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteUser(user.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredUsers.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No users found</p>
                  <p className="text-sm mt-1">Try adjusting your search</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
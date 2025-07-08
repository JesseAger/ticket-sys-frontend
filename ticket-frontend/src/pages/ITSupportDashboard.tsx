import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const ITSupportDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [resolution, setResolution] = useState('');
  const { toast } = useToast();

  // Mock tickets data
  const [tickets, setTickets] = useState([
    {
      id: 'TKT-001',
      title: 'Computer not starting up',
      description: 'My work computer won\'t boot up after the power outage yesterday. The screen remains black.',
      status: 'open',
      priority: 'high',
      category: 'hardware',
      user: 'John Smith',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15',
      resolution: ''
    },
    {
      id: 'TKT-002',
      title: 'Software installation request',
      description: 'Need Adobe Photoshop installed on my workstation for the marketing project.',
      status: 'in_progress',
      priority: 'medium',
      category: 'software',
      user: 'Jane Doe',
      createdAt: '2024-01-12',
      updatedAt: '2024-01-14',
      resolution: 'Installation in progress. Will complete by tomorrow.'
    },
    {
      id: 'TKT-003',
      title: 'Network connectivity issues',
      description: 'Unable to access shared network drives and internet is very slow.',
      status: 'resolved',
      priority: 'high',
      category: 'network',
      user: 'Mike Wilson',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-13',
      resolution: 'Network switch was reset and all connections restored. Issue resolved.'
    },
    {
      id: 'TKT-004',
      title: 'Email access problems',
      description: 'Cannot log into Outlook. Getting authentication errors.',
      status: 'open',
      priority: 'low',
      category: 'access',
      user: 'Sarah Johnson',
      createdAt: '2024-01-14',
      updatedAt: '2024-01-14',
      resolution: ''
    }
  ]);

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const updateTicketStatus = (ticketId: string, newStatus: string) => {
    setTickets(tickets.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] }
        : ticket
    ));
    
    toast({
      title: "Status Updated",
      description: `Ticket ${ticketId} status changed to ${newStatus.replace('_', ' ')}`,
    });
  };

  const updateResolution = (ticketId: string, newResolution: string) => {
    setTickets(tickets.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, resolution: newResolution, updatedAt: new Date().toISOString().split('T')[0] }
        : ticket
    ));
    
    toast({
      title: "Resolution Updated",
      description: `Resolution notes added for ticket ${ticketId}`,
    });
    
    setResolution('');
    setSelectedTicket(null);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      open: { variant: 'outline' as const, label: 'Open', className: 'border-red-300 text-red-700' },
      in_progress: { variant: 'default' as const, label: 'In Progress', className: 'bg-blue-500' },
      resolved: { variant: 'secondary' as const, label: 'Resolved', className: 'bg-green-500 text-white' },
      closed: { variant: 'secondary' as const, label: 'Closed', className: 'bg-gray-500 text-white' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge variant={config.variant} className={config.className}>{config.label}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      low: { className: 'bg-green-100 text-green-800 border-green-300', label: 'Low' },
      medium: { className: 'bg-yellow-100 text-yellow-800 border-yellow-300', label: 'Medium' },
      high: { className: 'bg-red-100 text-red-800 border-red-300', label: 'High' }
    };
    
    const config = priorityConfig[priority as keyof typeof priorityConfig];
    return <Badge variant="outline" className={config.className}>{config.label}</Badge>;
  };

  const getStatusCounts = () => {
    return {
      total: tickets.length,
      open: tickets.filter(t => t.status === 'open').length,
      inProgress: tickets.filter(t => t.status === 'in_progress').length,
      resolved: tickets.filter(t => t.status === 'resolved').length
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="min-h-screen bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-inter text-foreground">IT Support Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage and resolve support tickets</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-foreground">{statusCounts.total}</div>
              <p className="text-sm text-muted-foreground">Total Tickets</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-red-600">{statusCounts.open}</div>
              <p className="text-sm text-muted-foreground">Open</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">{statusCounts.inProgress}</div>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">{statusCounts.resolved}</div>
              <p className="text-sm text-muted-foreground">Resolved</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Filter Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="search">Search</Label>
                <Input
                  id="search"
                  placeholder="Search by title, user, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tickets List */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">🎫</span>
              Support Tickets ({filteredTickets.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTickets.map((ticket) => (
                <div key={ticket.id} className="border border-border rounded-lg p-6 hover:shadow-soft transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-foreground text-lg">{ticket.title}</h4>
                        <span className="text-sm text-muted-foreground">#{ticket.id}</span>
                      </div>
                      <p className="text-muted-foreground mb-3 line-clamp-2">{ticket.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>👤 {ticket.user}</span>
                        <span>📅 {ticket.createdAt}</span>
                        <span className="capitalize">📂 {ticket.category}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 min-w-fit">
                      {getStatusBadge(ticket.status)}
                      {getPriorityBadge(ticket.priority)}
                    </div>
                  </div>

                  {ticket.resolution && (
                    <div className="bg-accent p-3 rounded-md mb-4">
                      <p className="text-sm font-medium text-foreground mb-1">Resolution Notes:</p>
                      <p className="text-sm text-muted-foreground">{ticket.resolution}</p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {ticket.status !== 'resolved' && ticket.status !== 'closed' && (
                      <>
                        <Button
                          size="sm"
                          variant="default"
                          onClick={() => updateTicketStatus(ticket.id, 'in_progress')}
                          disabled={ticket.status === 'in_progress'}
                        >
                          Mark In Progress
                        </Button>
                        <Button
                          size="sm"
                          variant="success"
                          onClick={() => updateTicketStatus(ticket.id, 'resolved')}
                        >
                          Mark Resolved
                        </Button>
                      </>
                    )}
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedTicket(ticket)}
                        >
                          Add Resolution
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Resolution Notes</DialogTitle>
                          <DialogDescription>
                            Update resolution notes for ticket {selectedTicket?.id}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Textarea
                            placeholder="Enter resolution details..."
                            value={resolution}
                            onChange={(e) => setResolution(e.target.value)}
                            rows={4}
                          />
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              onClick={() => {
                                setSelectedTicket(null);
                                setResolution('');
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={() => selectedTicket && updateResolution(selectedTicket.id, resolution)}
                              disabled={!resolution.trim()}
                            >
                              Save Resolution
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))}
              
              {filteredTickets.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <p className="text-lg">No tickets found</p>
                  <p className="text-sm mt-1">Try adjusting your filters</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ITSupportDashboard;
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const StaffDashboard = () => {
  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
    priority: '',
    category: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Mock tickets data
  const [tickets] = useState([
    {
      id: 'TKT-001',
      title: 'Computer not starting up',
      status: 'open',
      priority: 'high',
      category: 'hardware',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 'TKT-002', 
      title: 'Software installation request',
      status: 'in_progress',
      priority: 'medium',
      category: 'software',
      createdAt: '2024-01-12',
      updatedAt: '2024-01-14'
    },
    {
      id: 'TKT-003',
      title: 'Network connectivity issues',
      status: 'resolved',
      priority: 'high',
      category: 'network',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-13'
    }
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Ticket Created Successfully",
        description: `Your support ticket has been submitted and assigned ID: TKT-${Date.now().toString().slice(-3)}`,
      });
      
      setNewTicket({
        title: '',
        description: '',
        priority: '',
        category: ''
      });
      
    } catch (error) {
      toast({
        title: "Error Creating Ticket",
        description: "There was an error submitting your ticket. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewTicket({
      ...newTicket,
      [e.target.name]: e.target.value
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      open: { variant: 'outline' as const, label: 'Open' },
      in_progress: { variant: 'default' as const, label: 'In Progress' },
      resolved: { variant: 'secondary' as const, label: 'Resolved' },
      closed: { variant: 'secondary' as const, label: 'Closed' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      low: { className: 'bg-green-100 text-green-800', label: 'Low' },
      medium: { className: 'bg-yellow-100 text-yellow-800', label: 'Medium' },
      high: { className: 'bg-red-100 text-red-800', label: 'High' }
    };
    
    const config = priorityConfig[priority as keyof typeof priorityConfig];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-inter text-foreground">Staff Dashboard</h1>
          <p className="text-muted-foreground mt-2">Create and manage your IT support tickets</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Create New Ticket */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🎫</span>
                Create New Ticket
              </CardTitle>
              <CardDescription>
                Submit a new IT support request for technical assistance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Issue Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Brief description of the issue"
                    value={newTicket.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select 
                      value={newTicket.priority} 
                      onValueChange={(value) => setNewTicket({...newTicket, priority: value})}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select 
                      value={newTicket.category} 
                      onValueChange={(value) => setNewTicket({...newTicket, category: value})}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hardware">Hardware</SelectItem>
                        <SelectItem value="software">Software</SelectItem>
                        <SelectItem value="network">Network</SelectItem>
                        <SelectItem value="access">Access/Security</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Detailed Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Please provide detailed information about the issue..."
                    value={newTicket.description}
                    onChange={handleInputChange}
                    rows={4}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="red-accent"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating Ticket...' : 'Create Ticket'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* My Tickets */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">📋</span>
                My Tickets
              </CardTitle>
              <CardDescription>
                View the status of your submitted tickets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tickets.map((ticket) => (
                  <div key={ticket.id} className="border border-border rounded-lg p-4 hover:shadow-soft transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-foreground">{ticket.title}</h4>
                        <p className="text-sm text-muted-foreground">ID: {ticket.id}</p>
                      </div>
                      <div className="flex gap-2">
                        {getStatusBadge(ticket.status)}
                        {getPriorityBadge(ticket.priority)}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span className="capitalize">{ticket.category}</span>
                      <span>Updated: {ticket.updatedAt}</span>
                    </div>
                  </div>
                ))}
                
                {tickets.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No tickets submitted yet</p>
                    <p className="text-sm mt-1">Create your first support ticket to get started</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
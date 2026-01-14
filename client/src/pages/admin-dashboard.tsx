import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { useTranslation } from "@/hooks/use-translation";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { User, ProjectWithClient, Inquiry, InsertProject } from "@shared/schema";
import {
  Loader2,
  Plus,
  Users,
  FolderOpen,
  MessageSquare,
  Settings,
  Mail,
  Building,
  Calendar,
  DollarSign,
  Eye,
  Edit,
  Trash2
} from "lucide-react";
import { Redirect } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const createProjectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  serviceType: z.string().min(1, "Service type is required"),
  clientId: z.coerce.number().min(1, "Client is required"),
  budget: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export default function AdminDashboard() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedProject, setSelectedProject] = useState<ProjectWithClient | null>(null);
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);

  // Redirect non-admin users
  if (!user || user.role !== "admin") {
    return <Redirect to="/dashboard" />;
  }

  const { data: users, isLoading: usersLoading } = useQuery<User[]>({
    queryKey: ["/api/users"],
  });

  const { data: projects, isLoading: projectsLoading } = useQuery<ProjectWithClient[]>({
    queryKey: ["/api/projects"],
  });

  const { data: inquiries, isLoading: inquiriesLoading } = useQuery<Inquiry[]>({
    queryKey: ["/api/inquiries"],
  });

  const createProjectForm = useForm({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      title: "",
      description: "",
      serviceType: "",
      clientId: "",
      budget: "",
      startDate: "",
      endDate: "",
    },
  });

  const createProjectMutation = useMutation({
    mutationFn: async (data: any) => {
      const projectData = {
        ...data,
        clientId: parseInt(data.clientId),
        budget: data.budget ? parseInt(data.budget.replace(/[^0-9]/g, "")) * 100 : null,
        startDate: data.startDate || null,
        endDate: data.endDate || null,
      };
      const res = await apiRequest("POST", "/api/projects", projectData);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      setIsCreateProjectOpen(false);
      createProjectForm.reset();
      toast({
        title: "Success",
        description: "Project created successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateProjectStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const res = await apiRequest("PATCH", `/api/projects/${id}`, { status });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({
        title: "Success",
        description: "Project status updated",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateInquiryStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const res = await apiRequest("PATCH", `/api/inquiries/${id}`, { status });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/inquiries"] });
      toast({
        title: "Success",
        description: "Inquiry status updated",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
      case "converted":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "in_progress":
      case "contacted":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "pending":
      case "new":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "cancelled":
      case "closed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const formatBudget = (budget: number | null) => {
    if (!budget) return "TBD";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(budget / 100);
  };

  const formatDate = (date: string | Date | null) => {
    if (!date) return "TBD";
    return new Date(date).toLocaleDateString();
  };

  const onCreateProject = (data: any) => {
    createProjectMutation.mutate(data);
  };

  if (usersLoading || projectsLoading || inquiriesLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Users",
      value: users?.length || 0,
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Active Projects",
      value: projects?.filter(p => p.status === "in_progress").length || 0,
      icon: FolderOpen,
      color: "text-green-600",
    },
    {
      title: "New Inquiries",
      value: inquiries?.filter(i => i.status === "new").length || 0,
      icon: MessageSquare,
      color: "text-yellow-600",
    },
    {
      title: "Total Revenue",
      value: formatBudget(
        projects?.reduce((sum, p) => sum + (p.budget || 0), 0) || 0
      ),
      icon: DollarSign,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />

      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Manage users, projects, and business operations
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                    </div>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Projects */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {projects?.slice(0, 5).map((project) => (
                        <div key={project.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{project.title}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {project.client?.firstName} {project.client?.lastName}
                            </p>
                          </div>
                          <Badge className={getStatusColor(project.status)}>
                            {project.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Inquiries */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Inquiries</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {inquiries?.slice(0, 5).map((inquiry) => (
                        <div key={inquiry.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">
                              {inquiry.firstName} {inquiry.lastName}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {inquiry.serviceInterest}
                            </p>
                          </div>
                          <Badge className={getStatusColor(inquiry.status)}>
                            {inquiry.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="projects" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Projects Management</h2>
                <Dialog open={isCreateProjectOpen} onOpenChange={setIsCreateProjectOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Project
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Create New Project</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={createProjectForm.handleSubmit(onCreateProject)} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Project Title</Label>
                          <Input
                            id="title"
                            {...createProjectForm.register("title")}
                            className={createProjectForm.formState.errors.title ? "border-destructive" : ""}
                          />
                          {createProjectForm.formState.errors.title && (
                            <p className="text-sm text-destructive">{createProjectForm.formState.errors.title.message}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="serviceType">Service Type</Label>
                          <Select onValueChange={(value) => createProjectForm.setValue("serviceType", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select service type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="automation">Intelligent Automation</SelectItem>
                              <SelectItem value="ml">Machine Learning</SelectItem>
                              <SelectItem value="analytics">Predictive Analytics</SelectItem>
                              <SelectItem value="nlp">Natural Language Processing</SelectItem>
                              <SelectItem value="vision">Computer Vision</SelectItem>
                              <SelectItem value="agents">AI Agent Systems</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          {...createProjectForm.register("description")}
                          className={createProjectForm.formState.errors.description ? "border-destructive" : ""}
                        />
                        {createProjectForm.formState.errors.description && (
                          <p className="text-sm text-destructive">{createProjectForm.formState.errors.description.message}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="clientId">Client</Label>
                          <Select onValueChange={(value) => createProjectForm.setValue("clientId", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select client" />
                            </SelectTrigger>
                            <SelectContent>
                              {users?.filter(u => u.role === "client").map((user) => (
                                <SelectItem key={user.id} value={user.id.toString()}>
                                  {user.firstName} {user.lastName} ({user.company || "No company"})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="budget">Budget (USD)</Label>
                          <Input
                            id="budget"
                            {...createProjectForm.register("budget")}
                            placeholder="50000"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="startDate">Start Date</Label>
                          <Input
                            id="startDate"
                            type="date"
                            {...createProjectForm.register("startDate")}
                          />
                        </div>
                      </div>

                      <div className="flex justify-end space-x-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsCreateProjectOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" disabled={createProjectMutation.isPending}>
                          {createProjectMutation.isPending ? "Creating..." : "Create Project"}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="space-y-4 p-6">
                    {projects?.map((project) => (
                      <div
                        key={project.id}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-6"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                              {project.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-2">
                              {project.description}
                            </p>
                            <p className="text-sm text-gray-500">
                              Client: {project.client?.firstName} {project.client?.lastName}
                              {project.client?.company && ` (${project.client.company})`}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Select
                              value={project.status}
                              onValueChange={(status) =>
                                updateProjectStatusMutation.mutate({ id: project.id, status })
                              }
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="in_progress">In Progress</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Service:</span>
                            <span className="ml-2">{project.serviceType}</span>
                          </div>
                          <div>
                            <span className="font-medium">Budget:</span>
                            <span className="ml-2">{formatBudget(project.budget)}</span>
                          </div>
                          <div>
                            <span className="font-medium">Start:</span>
                            <span className="ml-2">{formatDate(project.startDate)}</span>
                          </div>
                          <div>
                            <span className="font-medium">End:</span>
                            <span className="ml-2">{formatDate(project.endDate)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="inquiries" className="space-y-6">
              <h2 className="text-2xl font-bold">Inquiries Management</h2>

              <Card>
                <CardContent className="p-0">
                  <div className="space-y-4 p-6">
                    {inquiries?.map((inquiry) => (
                      <div
                        key={inquiry.id}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-6"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                              {inquiry.firstName} {inquiry.lastName}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                              <div>
                                <Mail className="h-4 w-4 inline mr-2" />
                                {inquiry.email}
                              </div>
                              {inquiry.company && (
                                <div>
                                  <Building className="h-4 w-4 inline mr-2" />
                                  {inquiry.company}
                                </div>
                              )}
                              {inquiry.serviceInterest && (
                                <div>
                                  <Settings className="h-4 w-4 inline mr-2" />
                                  {inquiry.serviceInterest}
                                </div>
                              )}
                              <div>
                                <Calendar className="h-4 w-4 inline mr-2" />
                                {formatDate(inquiry.createdAt)}
                              </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300">
                              {inquiry.message}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Select
                              value={inquiry.status}
                              onValueChange={(status) =>
                                updateInquiryStatusMutation.mutate({ id: inquiry.id, status })
                              }
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="new">New</SelectItem>
                                <SelectItem value="contacted">Contacted</SelectItem>
                                <SelectItem value="converted">Converted</SelectItem>
                                <SelectItem value="closed">Closed</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <h2 className="text-2xl font-bold">Users Management</h2>

              <Card>
                <CardContent className="p-0">
                  <div className="space-y-4 p-6">
                    {users?.map((user) => (
                      <div
                        key={user.id}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-6"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                              {user.firstName} {user.lastName}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <Mail className="h-4 w-4 inline mr-2" />
                                {user.email}
                              </div>
                              <div>
                                <Users className="h-4 w-4 inline mr-2" />
                                {user.username}
                              </div>
                              {user.company && (
                                <div>
                                  <Building className="h-4 w-4 inline mr-2" />
                                  {user.company}
                                </div>
                              )}
                              <div>
                                <Calendar className="h-4 w-4 inline mr-2" />
                                Joined {formatDate(user.createdAt)}
                              </div>
                              <div>
                                <Badge className={user.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"}>
                                  {user.role}
                                </Badge>
                              </div>
                              <div>
                                <Badge className={user.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                                  {user.isActive ? "Active" : "Inactive"}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
}

import { useQuery, useMutation } from "@tanstack/react-query";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { useTranslation } from "@/hooks/use-translation";
import { queryClient } from "@/lib/queryClient";
import { ProjectWithClient } from "@shared/schema";
import { Loader2, Plus, Calendar, DollarSign, User, AlertCircle } from "lucide-react";
import { Redirect } from "wouter";

export default function ClientDashboard() {
  const { user } = useAuth();
  const { t } = useTranslation();

  // Redirect non-authenticated users
  if (!user) {
    return <Redirect to="/auth" />;
  }

  const { data: projects, isLoading } = useQuery<ProjectWithClient[]>({
    queryKey: ["/api/projects"],
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "in_progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "cancelled":
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

  const formatDate = (date: string | null) => {
    if (!date) return "TBD";
    return new Date(date).toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t("dashboard.welcome")}, {user.firstName}!
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Manage your AI projects and track progress
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Total Projects
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {projects?.length || 0}
                    </p>
                  </div>
                  <User className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      In Progress
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {projects?.filter(p => p.status === "in_progress").length || 0}
                    </p>
                  </div>
                  <Calendar className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Completed
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {projects?.filter(p => p.status === "completed").length || 0}
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Pending
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {projects?.filter(p => p.status === "pending").length || 0}
                    </p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Projects Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">{t("dashboard.projects")}</CardTitle>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Request Project
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {!projects || projects.length === 0 ? (
                <div className="text-center py-12">
                  <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    {t("dashboard.noProjects")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {t("dashboard.createFirst")}
                  </p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Request Your First Project
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            {project.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300">
                            {project.description}
                          </p>
                        </div>
                        <Badge className={getStatusColor(project.status)}>
                          {project.status.replace("_", " ").toUpperCase()}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {t("dashboard.serviceType")}:
                          </span>
                          <span className="ml-2 text-gray-600 dark:text-gray-300">
                            {project.serviceType}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {t("dashboard.budget")}:
                          </span>
                          <span className="ml-2 text-gray-600 dark:text-gray-300">
                            {formatBudget(project.budget)}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {t("dashboard.startDate")}:
                          </span>
                          <span className="ml-2 text-gray-600 dark:text-gray-300">
                            {formatDate(project.startDate)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}

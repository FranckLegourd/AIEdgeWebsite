import { useState, useEffect } from "react";
import { Redirect } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { useTranslation } from "@/hooks/use-translation";
import { useTheme } from "@/hooks/use-theme";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema } from "@shared/schema";
import { z } from "zod";
import { Sun, Moon, Brain, Zap, Shield } from "lucide-react";
import logoLight from "@assets/logo_light.png";
import logoDark from "@assets/logo_dark.png";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

const registerSchema = insertUserSchema.extend({
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const { user, loginMutation, registerMutation } = useAuth();
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  // Redirect if already logged in
  if (user) {
    return <Redirect to="/" />;
  }

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const registerForm = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      company: "",
      role: "client",
      isActive: true,
    },
  });

  const onLogin = (data: z.infer<typeof loginSchema>) => {
    loginMutation.mutate(data);
  };

  const onRegister = (data: z.infer<typeof registerSchema>) => {
    const { confirmPassword, ...userData } = data;
    registerMutation.mutate(userData);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Auth forms */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white dark:bg-gray-900">
        <div className="w-full max-w-md space-y-6">
          {/* Theme toggle */}
          <div className="flex justify-between items-center">
            <img 
              src={theme === 'dark' ? logoDark : logoLight} 
              alt="AI Edge International" 
              className="h-8"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2"
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">{t("auth.login")}</TabsTrigger>
              <TabsTrigger value="register">{t("auth.register")}</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-center">{t("auth.loginTitle")}</CardTitle>
                  <p className="text-center text-muted-foreground">{t("auth.loginSubtitle")}</p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-username">{t("auth.username")}</Label>
                      <Input
                        id="login-username"
                        {...loginForm.register("username")}
                        className={loginForm.formState.errors.username ? "border-destructive" : ""}
                      />
                      {loginForm.formState.errors.username && (
                        <p className="text-sm text-destructive">{loginForm.formState.errors.username.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-password">{t("auth.password")}</Label>
                      <Input
                        id="login-password"
                        type="password"
                        {...loginForm.register("password")}
                        className={loginForm.formState.errors.password ? "border-destructive" : ""}
                      />
                      {loginForm.formState.errors.password && (
                        <p className="text-sm text-destructive">{loginForm.formState.errors.password.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={loginMutation.isPending}
                    >
                      {loginMutation.isPending ? "Signing in..." : t("auth.loginButton")}
                    </Button>
                  </form>

                  <p className="text-center text-sm text-muted-foreground mt-4">
                    {t("auth.switchToRegister")}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-center">{t("auth.registerTitle")}</CardTitle>
                  <p className="text-center text-muted-foreground">{t("auth.registerSubtitle")}</p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">{t("auth.firstName")}</Label>
                        <Input
                          id="firstName"
                          {...registerForm.register("firstName")}
                          className={registerForm.formState.errors.firstName ? "border-destructive" : ""}
                        />
                        {registerForm.formState.errors.firstName && (
                          <p className="text-sm text-destructive">{registerForm.formState.errors.firstName.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lastName">{t("auth.lastName")}</Label>
                        <Input
                          id="lastName"
                          {...registerForm.register("lastName")}
                          className={registerForm.formState.errors.lastName ? "border-destructive" : ""}
                        />
                        {registerForm.formState.errors.lastName && (
                          <p className="text-sm text-destructive">{registerForm.formState.errors.lastName.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="username">{t("auth.username")}</Label>
                      <Input
                        id="username"
                        {...registerForm.register("username")}
                        className={registerForm.formState.errors.username ? "border-destructive" : ""}
                      />
                      {registerForm.formState.errors.username && (
                        <p className="text-sm text-destructive">{registerForm.formState.errors.username.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">{t("auth.email")}</Label>
                      <Input
                        id="email"
                        type="email"
                        {...registerForm.register("email")}
                        className={registerForm.formState.errors.email ? "border-destructive" : ""}
                      />
                      {registerForm.formState.errors.email && (
                        <p className="text-sm text-destructive">{registerForm.formState.errors.email.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">{t("auth.company")}</Label>
                      <Input
                        id="company"
                        {...registerForm.register("company")}
                        className={registerForm.formState.errors.company ? "border-destructive" : ""}
                      />
                      {registerForm.formState.errors.company && (
                        <p className="text-sm text-destructive">{registerForm.formState.errors.company.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-password">{t("auth.password")}</Label>
                      <Input
                        id="register-password"
                        type="password"
                        {...registerForm.register("password")}
                        className={registerForm.formState.errors.password ? "border-destructive" : ""}
                      />
                      {registerForm.formState.errors.password && (
                        <p className="text-sm text-destructive">{registerForm.formState.errors.password.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        {...registerForm.register("confirmPassword")}
                        className={registerForm.formState.errors.confirmPassword ? "border-destructive" : ""}
                      />
                      {registerForm.formState.errors.confirmPassword && (
                        <p className="text-sm text-destructive">{registerForm.formState.errors.confirmPassword.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={registerMutation.isPending}
                    >
                      {registerMutation.isPending ? "Creating account..." : t("auth.registerButton")}
                    </Button>
                  </form>

                  <p className="text-center text-sm text-muted-foreground mt-4">
                    {t("auth.switchToLogin")}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Right side - Hero section */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
            alt="Abstract AI technology" 
            className="w-full h-full object-cover opacity-20" 
          />
        </div>
        
        <div className="relative z-10 p-12 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-6">
            Transform Your Business with AI
          </h2>
          <p className="text-xl mb-8 leading-relaxed">
            Join hundreds of companies leveraging our cutting-edge AI solutions to drive innovation, efficiency, and growth.
          </p>

          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Brain className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Intelligent Automation</h3>
                <p className="text-white/80">Streamline operations with AI-powered workflows</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Rapid Deployment</h3>
                <p className="text-white/80">Get up and running in weeks, not months</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Enterprise Security</h3>
                <p className="text-white/80">Bank-level security and compliance standards</p>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-white/10 rounded-xl backdrop-blur-sm">
            <blockquote className="text-lg italic mb-4 flex items-center gap-2">
              "<img 
                src={logoDark} 
                alt="AI Edge International" 
                className="h-6 inline"
              /> transformed our business processes. We've seen a 300% increase in efficiency."
            </blockquote>
            <cite className="text-white/80">— Sarah Chen, CTO at TechFlow</cite>
          </div>
        </div>
      </div>
    </div>
  );
}

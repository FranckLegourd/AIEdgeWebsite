import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTheme } from "@/hooks/use-theme";
import { useTranslation } from "@/hooks/use-translation";
import { useAuth } from "@/hooks/use-auth";
import { Sun, Moon, Menu, LogOut, User, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logoDark from "@assets/logo_dark.png";
import logoLight from "@assets/logo_light.png";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t, languages } = useTranslation();
  const { user, logoutMutation } = useAuth();

  const navItems = [
    { path: "/", label: t("nav.home") },
    { path: "/services", label: t("nav.services") },
    { path: "/about", label: t("nav.about") },
    { path: "/contact", label: t("nav.contact") },
  ];

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <nav className="fixed top-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex-shrink-0">
              <img 
                src={theme === "light" ? logoLight : logoDark} 
                alt="AI Edge International" 
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    location === item.path
                      ? "text-primary"
                      : "text-gray-700 dark:text-gray-300 hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="ml-4">
                      <User className="h-4 w-4 mr-2" />
                      {user.firstName}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="flex items-center w-full">
                        <Settings className="h-4 w-4 mr-2" />
                        {t("nav.dashboard")}
                      </Link>
                    </DropdownMenuItem>
                    {user.role === "admin" && (
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="flex items-center w-full">
                          <Settings className="h-4 w-4 mr-2" />
                          {t("nav.admin")}
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      {t("nav.logout")}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/auth">
                  <Button size="sm" className="ml-4">
                    {t("nav.clientPortal")}
                  </Button>
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
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

            {/* Language Selector */}
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-20 border-0 bg-transparent">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.code.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Mobile menu button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden p-2">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`px-3 py-2 text-lg font-medium transition-colors duration-200 ${
                        location === item.path
                          ? "text-primary"
                          : "text-gray-700 dark:text-gray-300 hover:text-primary"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}

                  {user ? (
                    <div className="space-y-2 pt-4 border-t">
                      <Link
                        href="/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="block px-3 py-2 text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-primary"
                      >
                        {t("nav.dashboard")}
                      </Link>
                      {user.role === "admin" && (
                        <Link
                          href="/admin"
                          onClick={() => setIsOpen(false)}
                          className="block px-3 py-2 text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-primary"
                        >
                          {t("nav.admin")}
                        </Link>
                      )}
                      <Button
                        variant="ghost"
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                        }}
                        className="w-full justify-start px-3 py-2 text-lg font-medium"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        {t("nav.logout")}
                      </Button>
                    </div>
                  ) : (
                    <Link href="/auth" onClick={() => setIsOpen(false)}>
                      <Button className="w-full mt-4">
                        {t("nav.clientPortal")}
                      </Button>
                    </Link>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

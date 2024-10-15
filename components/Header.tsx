"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { UserButton } from "@clerk/nextjs";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="rounded-full bg-white/10 backdrop-filter backdrop-blur-lg ml-2 sm:ml-4"
    >
      <Sun className="h-4 w-4 sm:h-5 sm:w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 sm:h-5 sm:w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

const Header = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const upscRoutes = [
    { path: '/prelims', label: 'Prelims' },
    { path: '/mains', label: 'Mains' },
    { path: '/interview', label: 'Interview' },
  ];

  const routes = [
    { path: '/blog', label: 'Blog' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
    { path: '/admin/login', label: 'Admin' },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 bg-transparent flex justify-center">
      <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-4 flex justify-center">
        <div className="inline-flex flex-wrap justify-center items-center bg-background/40 backdrop-filter backdrop-blur-xl border border-gray-200/30 dark:border-gray-700/30 rounded-full shadow-lg px-3 sm:px-6 py-2">
          <Link href="/" className="text-xl sm:text-2xl font-bold mr-2 sm:mr-4 text-primary">
            Heroic UPSC
          </Link>
          <div className="hidden md:flex flex-wrap items-center justify-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent">UPSC</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="inline-flex flex-wrap justify-center items-center bg-background/40 backdrop-filter backdrop-blur-xl border border-gray-200/30 dark:border-gray-700/30 rounded-lg shadow-lg p-4">
                      <ul className="grid gap-3 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        {upscRoutes.map((route) => (
                          <li key={route.path}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={route.path}
                                className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/40 hover:text-accent-foreground focus:bg-accent/40 focus:text-accent-foreground ${
                                  pathname === route.path
                                    ? 'text-primary font-semibold'
                                    : 'text-muted-foreground'
                                }`}
                              >
                                <div className="text-sm font-medium leading-none">{route.label}</div>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={`text-sm sm:text-base hover:text-primary transition-colors px-2 py-1 sm:px-3 sm:py-2 ${
                  pathname === route.path
                    ? 'text-primary font-semibold'
                    : 'text-muted-foreground'
                }`}
              >
                {route.label}
              </Link>
            ))}
            <ThemeToggle />
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full bg-white/10 backdrop-filter backdrop-blur-lg ml-2">
                  <Menu className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-4">
                  <div className="font-semibold">UPSC</div>
                  {upscRoutes.map((route) => (
                    <Link
                      key={route.path}
                      href={route.path}
                      className={`text-base hover:text-primary transition-colors pl-4 ${
                        pathname === route.path
                          ? 'text-primary font-semibold'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {route.label}
                    </Link>
                  ))}
                  {routes.map((route) => (
                    <Link
                      key={route.path}
                      href={route.path}
                      className={`text-base hover:text-primary transition-colors ${
                        pathname === route.path
                          ? 'text-primary font-semibold'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {route.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
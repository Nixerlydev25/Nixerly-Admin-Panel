"use client";

import Link from "next/link";
import {
  ChevronRight,
  ChevronUp,
  LogOutIcon,
  Moon,
  SunMoon,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { CustomAxiosError } from "@/services/api";
import { useToast } from "./use-toast";
import Image from "next/image";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import AuthService from "@/services/auth/auth.service";

type Props = {
  children: React.ReactNode;
  links: {
    title: string;
    icon: React.ReactNode;
    children: { title: string; href: string }[];
  }[];
};

export function Navbar({ children, links }: Props) {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const isActive = theme === "light";

  const router = useRouter();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: AuthService.logout,
    onSuccess: (response) => {
      toast({
        title: "logout Successful",
        variant: "sucess",
      });
      router.push("/sign-in");
    },
    onError: (error: CustomAxiosError) => {
      const message = error.response?.data?.message || error.message;
      toast({
        title: message,
        variant: "destructive",
      });
    },
  });

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (title: string) => {
    setOpenDropdown(openDropdown === title ? null : title);
  };

  const path = usePathname();

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Mobile Menu Button */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="bg-primary">
              <Menu className="h-6 w-6 text-white" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] bg-primary p-0">
            <div className="flex h-full min-h-screen flex-col justify-between gap-4">
              <div>
                <div className="mb-6 mt-4 flex h-14 items-center px-4 lg:h-[60px] lg:px-6">
                  <Link href="/" className="flex items-center gap-2 font-semibold">
                    <Image
                      src="/logo.png"
                      width={40}
                      height={40}
                      alt="nixerly"
                    />
                    <span className="text-white">nixerly</span>
                  </Link>
                </div>
                <div className="flex flex-col">
                  <nav className="grid w-full items-start px-2 text-sm font-medium lg:px-4">
                    <p className="mb-4 text-base text-white">Dashboard</p>
                    {links.map((item) => (
                      <div key={item.title} className="my-1">
                        <div
                          onClick={() => toggleDropdown(item.title)}
                          className="hover:pointer flex cursor-pointer items-center justify-between gap-3 py-2 text-white"
                        >
                          <div className="flex items-center gap-3 text-sm text-gray-200">
                            {item.icon}
                            {item.title}
                          </div>
                          <span
                            className={cn("transform transition-transform", {
                              "rotate-180": openDropdown === item.title,
                            })}
                          >
                            <ChevronUp />
                          </span>
                        </div>
                        {openDropdown === item.title && (
                          <div className="ml-4 mt-1">
                            {item?.children.map((child) => (
                              <div
                                key={child.href}
                                className="my-3 flex items-center justify-start"
                              >
                                <Link
                                  href={child.href}
                                  className={`block w-full rounded p-2 px-3 text-sm transition-all text-white ${
                                    path === child.href
                                      ? "bg-[#ffffff33]"
                                      : "bg-transparent border-primary-muted box-border"
                                  }`}
                                  onClick={() => setIsOpen(false)}
                                >
                                  {child.title}
                                </Link>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </nav>
                </div>
              </div>
              <div className="p-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex w-full cursor-pointer gap-3 rounded-md bg-white p-2 dark:border-2 dark:bg-primary-foreground">
                      <div className="w-12">
                        <Avatar>
                          <AvatarImage
                            src="/admin.png"
                            alt="@shadcn"
                            className="h-10 w-10 rounded-full"
                          />
                          <AvatarFallback>Admin</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex w-full items-center justify-between">
                        <div className="text-start">
                          <p className="text-sm">info@nixerly.com</p>
                          <p className="text-sm text-gray-500">admin</p>
                        </div>
                        <div>
                          <ChevronRight className="ml-auto size-4" />
                        </div>
                      </div>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => {
                        mutation.mutate();
                      }}
                    >
                      <LogOutIcon className="mr-2" size={18} />
                      <span>Logout</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={toggleTheme}>
                      <>
                        {isActive ? (
                          <span className="flex cursor-pointer items-center">
                            <Moon className="mr-2" size={18} />
                            Dark
                          </span>
                        ) : (
                          <span className="flex cursor-pointer items-center">
                            <SunMoon className="mr-2" size={18} />
                            Light
                          </span>
                        )}
                      </>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="bg-muted/40 hidden border-r bg-primary dark:bg-primary-foreground md:block">
        <div className="flex h-full min-h-screen flex-col justify-between gap-4">
          <div>
            <div className="mb-6 mt-4 flex h-14 items-center px-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <Image
                  src="/logon.png"
                  width={40}
                  height={40}
                  alt="nixerly"
                ></Image>
                <span className="text-white">nixerly</span>
              </Link>
            </div>
            <div className="flex flex-col">
              <nav className="grid w-full items-start px-2 text-sm font-medium lg:px-4">
                <p className="text-base text-white mb-4">Dashboard</p>
                {links.map((item) => (
                  <div key={item.title} className="my-1">
                    {/* Parent Dropdown */}
                    <div
                      onClick={() => toggleDropdown(item.title)}
                      className="hover:pointer flex cursor-pointer items-center justify-between gap-3 py-2 text-white"
                    >
                      <div className="flex items-center gap-3 text-sm text-gray-200">
                        {item.icon}
                        {item.title}
                      </div>
                      {/* Dropdown Indicator */}
                      <span
                        className={cn("transform transition-transform", {
                          "rotate-180": openDropdown === item.title,
                        })}
                      >
                        <ChevronUp />
                      </span>
                    </div>

                    {/* Child Link (Visible when Dropdown is Open) */}
                    {openDropdown === item.title && (
                      <div className="ml-4 mt-1">
                        {item?.children.map((child) => (
                          <div
                            key={child.href}
                            className="my-3 flex items-center justify-start"
                          >
                            {/* <div className="h-10 w-[2px] rounded-md bg-primary-muted dark:bg-gray-600"></div> */}
                            <Link
                              href={child.href}
                              className={`block w-full rounded p-2 px-3 text-sm transition-all text-white ${
                                path === child.href
                                  ? "bg-[#ffffff33]"
                                  : "bg-transparent border-primary-muted  box-border"
                              }`}
                            >
                              {child.title}
                            </Link>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>
          <div className="p-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex w-full cursor-pointer gap-3 rounded-md bg-white p-2 dark:border-2 dark:bg-primary-foreground">
                  <div className="w-12">
                    <Avatar>
                      <AvatarImage
                        src="/admin.png"
                        alt="@shadcn"
                        className="h-10 w-10 rounded-full"
                      />
                      <AvatarFallback>Admin</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex w-full items-center justify-between ">
                    <div className="text-start">
                      <p className="text-sm">info@nixelry.com</p>
                      <p className="text-sm text-gray-500">admin</p>
                    </div>
                    <div>
                      <ChevronRight className="ml-auto size-4" />
                    </div>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    mutation.mutate();
                  }}
                >
                  <LogOutIcon className="mr-2" size={18} />
                  <span>Logout</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={toggleTheme}>
                  <>
                    {isActive ? (
                      <span className="flex cursor-pointer items-center">
                        <Moon className="mr-2" size={18} />
                        Dark
                      </span>
                    ) : (
                      <span className="flex cursor-pointer items-center">
                        <SunMoon className="mr-2" size={18} />
                        Light
                      </span>
                    )}
                  </>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <main className="flex flex-1 flex-col">{children}</main>
      </div>
    </div>
  );
}

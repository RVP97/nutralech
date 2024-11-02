"use client";

import { Bell, Home, Menu, Phone, Search, User } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function ExpandableNavbarMobileSubmenu() {
  const [activeItem, setActiveItem] = React.useState("home");
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const NavItems = React.useCallback(
    ({ isMobile = false }: { isMobile?: boolean }) => (
      <>
        {[
          { id: "home", icon: Home, label: "Home" },
          { id: "search", icon: Search, label: "Search" },
          {
            id: "notifications",
            icon: Bell,
            label: "Notifications",
            expandable: true,
            subItems: [
              { id: "all", label: "All Notifications" },
              { id: "mentions", label: "Mentions" },
              { id: "unread", label: "Unread" },
            ],
          },
          { id: "profile", icon: User, label: "Profile" },
        ].map(({ id, icon: Icon, label, expandable, subItems }) => (
          <div key={id} className="relative">
            {isMobile ? (
              <div>
                <Button
                  variant="ghost"
                  size="default"
                  className={`w-full justify-start rounded-full transition-all duration-300 ${
                    activeItem === id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-primary/20 hover:text-primary"
                  }`}
                  onClick={() => setActiveItem(id)}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  <span>{label}</span>
                </Button>
              </div>
            ) : (
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    {expandable ? (
                      <>
                        <NavigationMenuTrigger
                          className={`rounded-full transition-all duration-300 ${
                            activeItem === id
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-primary/20 hover:text-primary"
                          }`}
                        >
                          <Icon className="h-5 w-5 md:mr-2" />
                          <span className="hidden md:inline">{label}</span>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="p-4 w-64">
                            <h3 className="font-semibold mb-2">{label}</h3>
                            <ul className="space-y-2">
                              {subItems?.map((subItem) => (
                                <li key={subItem.id}>
                                  <NavigationMenuLink asChild>
                                    <Button
                                      variant="ghost"
                                      className="w-full justify-start"
                                      onClick={() => setActiveItem(subItem.id)}
                                    >
                                      {subItem.label}
                                    </Button>
                                  </NavigationMenuLink>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`rounded-full transition-all duration-300 ${
                          activeItem === id
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-primary/20 hover:text-primary"
                        }`}
                        onClick={() => setActiveItem(id)}
                      >
                        <Icon className="h-5 w-5 md:mr-2" />
                        <span className="hidden md:inline">{label}</span>
                      </Button>
                    )}
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            )}
          </div>
        ))}
      </>
    ),
    [activeItem]
  );

  const handlePhoneClick = () => {
    // Replace with your actual phone action
    console.log("Phone button clicked");
  };

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="w-full max-w-[90%] bg-background/80 backdrop-blur-lg shadow-lg border rounded-3xl">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center flex-1">
              <span className="text-2xl font-bold text-primary mr-4">Logo</span>
              <div className="hidden md:flex space-x-1 justify-center flex-1">
                <NavItems />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={handlePhoneClick}
              >
                <Phone className="h-5 w-5 text-black" />
                <span className="sr-only">Call</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden rounded-full"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </div>
          </div>
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isMenuOpen
                ? "max-h-[500px] opacity-100 pb-4"
                : "max-h-0 opacity-0 pb-0"
            }`}
          >
            <nav className="flex flex-col space-y-2 pt-2">
              <NavItems isMobile />
            </nav>
          </div>
        </div>
      </nav>
    </div>
  );
}

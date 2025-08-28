"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, User } from "lucide-react";
import { Button, Spin, Avatar, Dropdown } from "antd";
import { useUser } from "@/hooks/useUser";
import useAuth from "@/hooks/useAuth";
import {
  LogoutOutlined,
  LoginOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";

const HeaderMain = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: user, isLoading } = useUser();
  const { handleLogout } = useAuth();
  const mobileMenuRef = useRef(null) as any;

  // Generate user initials (max 3 characters)
  const getUserInitials = (name: string) => {
    if (!name) return "U";
    const words = name
      .trim()
      .split(" ")
      .filter((word: string) => word.length > 0);
    let initials = "";

    for (let i = 0; i < Math.min(words.length, 3); i++) {
      initials += words[i][0].toUpperCase();
    }

    return initials || "U";
  };

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        mobileMenuOpen
      ) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // User dropdown menu items for desktop
  const userMenuItems = [
    {
      key: "profile",
      label: "Profile",
      icon: <UserOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
      danger: true,
    },
  ];

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      aria-label="Main navigation"
      className="shadow-xs sticky left-0 top-0 z-50 w-full bg-white py-3.5"
    >
      <div className="container relative">
        <nav
          className="flex items-center justify-between gap-7"
          role="navigation"
        >
          {/* Logo */}
          <div className="flex shrink-0 items-center">
            <div className="relative border-r border-gray-300 pr-7">
              <Link
                href="/"
                className="flex w-50 items-center focus:outline-none focus:ring-2 focus:ring-nirvul-primary-500 rounded-md"
                aria-label="Nirvul home - Your Bengali writing AI assistant"
              >
                <div>
                  <h1 className="text-xl md:text-3xl font-bold text-nirvul-primary-800">
                    নিরভুল (Nirvul)
                  </h1>
                  <p className="text-nirvul-gray-500 text-sm md:text-base">
                    আপনার বাংলা লেখার AI সহযোগী
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center gap-3">
              {isLoading ? (
                <div
                  className="flex items-center gap-2"
                  role="status"
                  aria-label="Loading user information"
                >
                  <Spin size="small" />
                  <span className="sr-only">Loading...</span>
                </div>
              ) : user ? (
                <div className="flex items-center gap-5">
                  {/* User Avatar and Info */}
                  <div className="flex items-center gap-2">
                    <Avatar
                      size="default"
                      className="bg-nirvul-primary-600 text-white font-medium"
                      icon={!user.name ? <UserOutlined /> : null}
                    >
                      {user.name ? getUserInitials(user.name) : null}
                    </Avatar>
                    <div className="hidden lg:block">
                      <p className="text-sm font-medium text-nirvul-gray-900 truncate max-w-32">
                        {user.name || "User"}
                      </p>
                      {user.email && (
                        <p className="text-xs text-nirvul-gray-500 truncate max-w-32">
                          {user.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Desktop Logout - Simple button */}
                  <Button
                    type="primary"
                    size="middle"
                    danger
                    icon={<LogoutOutlined />}
                    onClick={handleLogout}
                    aria-label="Logout from your account"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <>
                  <Button
                    type="default"
                    size="middle"
                    icon={<LoginOutlined />}
                    aria-label="Log in to your account"
                  >
                    <Link href="/login" className="flex items-center">
                      Log In
                    </Link>
                  </Button>
                  <Button
                    type="primary"
                    size="middle"
                    icon={<UserAddOutlined />}
                    aria-label="Create a new account"
                  >
                    <Link href="/register" className="flex items-center">
                      Register
                    </Link>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={handleMobileMenuToggle}
              className="p-2 md:hidden rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-nirvul-primary-500 transition-colors"
              aria-label={
                mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"
              }
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? (
                <X size={24} className="text-nirvul-gray-600" />
              ) : (
                <Menu className="text-nirvul-gray-600" size={24} />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            id="mobile-menu"
            className="absolute left-0 right-0 top-full z-50 mt-0 bg-white px-4 py-6 shadow-lg border-t border-gray-100 transition-all duration-300 md:hidden"
            role="menu"
            aria-label="Mobile navigation menu"
          >
            <div className="flex flex-col gap-4">
              {/* User Info Section for Mobile */}
              {user && (
                <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                  <Avatar
                    size="large"
                    className="bg-nirvul-primary-600 text-white font-medium"
                    icon={!user.name ? <UserOutlined /> : null}
                  >
                    {user.name ? getUserInitials(user.name) : null}
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-medium text-nirvul-gray-900 truncate">
                      {user.name || "User"}
                    </p>
                    {user.email && (
                      <p className="text-sm text-nirvul-gray-500 truncate">
                        {user.email}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                {isLoading ? (
                  <div
                    className="flex justify-center py-4"
                    role="status"
                    aria-label="Loading user information"
                  >
                    <Spin size="default" />
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : user ? (
                  <Button
                    icon={<LogoutOutlined />}
                    type="primary"
                    block
                    danger
                    size="large"
                    className="h-12"
                    onClick={() => {
                      handleLogout();
                      closeMobileMenu();
                    }}
                    aria-label="Logout from your account"
                    role="menuitem"
                  >
                    Logout
                  </Button>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Button
                      type="default"
                      block
                      size="large"
                      className="h-12"
                      icon={<LoginOutlined />}
                      aria-label="Log in to your account"
                      role="menuitem"
                    >
                      <Link
                        href="/login"
                        onClick={closeMobileMenu}
                        className="w-full h-full flex items-center justify-center"
                      >
                        Log In
                      </Link>
                    </Button>
                    <Button
                      type="primary"
                      block
                      size="large"
                      className="h-12"
                      icon={<UserAddOutlined />}
                      aria-label="Create a new account"
                      role="menuitem"
                    >
                      <Link
                        href="/register"
                        onClick={closeMobileMenu}
                        className="w-full h-full flex items-center justify-center"
                      >
                        Register
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Overlay for mobile menu */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-25 z-40 md:hidden"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
        )}
      </div>
    </header>
  );
};

export default HeaderMain;

"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, Sparkles, Crown } from "lucide-react";
import {Avatar } from "antd";
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
      className="sticky left-0 top-0 z-50 w-full bg-white/90 backdrop-blur-xl border-b border-nirvul-gray-200/50 shadow-lg"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-nirvul-primary-25/30 via-white/40 to-nirvul-primary-50/30"></div>
      
      <div className="container relative">
        <nav className="flex items-center justify-between py-4" role="navigation">
          {/* Logo Section */}
          <div className="flex shrink-0 items-center">
            {!user && (
              <div className="relative">
                <Link
                  href="/"
                  className="group flex items-center space-x-3 px-4 py-2 rounded-2xl hover:bg-nirvul-primary-50/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-nirvul-primary-500/50"
                  aria-label="Nirvul home - Your Bengali writing AI assistant"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-nirvul-primary-500 to-nirvul-primary-700 rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-nirvul-primary-800 to-nirvul-primary-600 bg-clip-text text-transparent">
                      নির্ভুল
                    </h1>
                    <p className="text-nirvul-gray-600 text-sm md:text-base font-medium">
                      বাংলা লেখার AI সহযোগী
                    </p>
                  </div>
                </Link>
                
                {/* Decorative line */}
                <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 w-px h-12 bg-gradient-to-b from-transparent via-nirvul-gray-300 to-transparent"></div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center gap-4">
              {isLoading ? (
                <div
                  className="flex items-center gap-3 px-4 py-2"
                  role="status"
                  aria-label="Loading user information"
                >
                  <div className="w-8 h-8 border-2 border-nirvul-primary-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-nirvul-gray-600 font-medium">লোডিং...</span>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : user ? (
                <div className="flex items-center gap-4">
                  {/* User Avatar and Info */}
                  <div className="flex items-center gap-3 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-2xl border border-nirvul-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="relative">
                      <Avatar
                        size="default"
                        className="bg-gradient-to-br from-nirvul-primary-500 to-nirvul-primary-700 text-white font-semibold shadow-lg border-2 border-white"
                        icon={!user.name ? <UserOutlined /> : null}
                      >
                        {user.name ? getUserInitials(user.name) : null}
                      </Avatar>
                      {/* Online indicator */}
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-sm">
                        <div className="w-full h-full bg-green-400 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    <div className="hidden lg:block">
                      <p className="text-sm font-semibold text-nirvul-gray-900 truncate max-w-32">
                        {user.name || "User"}
                      </p>
                      {user.email && (
                        <p className="text-xs text-nirvul-gray-500 truncate max-w-32">
                          {user.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Desktop Logout - Enhanced button */}
                  <button
                    onClick={handleLogout}
                    className="group flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                    aria-label="Logout from your account"
                  >
                    <LogoutOutlined className="group-hover:rotate-12 transition-transform duration-300" />
                    <span>লগআউট</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <button
                    className="group flex items-center space-x-2 px-5 py-2.5 bg-white/80 backdrop-blur-sm border border-nirvul-gray-300 text-nirvul-gray-700 rounded-xl font-medium shadow-sm hover:shadow-lg hover:bg-nirvul-primary-50 hover:border-nirvul-primary-300 hover:text-nirvul-primary-700 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-nirvul-primary-500/50"
                    aria-label="Log in to your account"
                  >
                    <Link href="/login" className="flex items-center space-x-2">
                      <LoginOutlined className="group-hover:translate-x-0.5 transition-transform duration-300" />
                      <span>লগইন</span>
                    </Link>
                  </button>
                  <button
                    className="group flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-nirvul-primary-600 to-nirvul-primary-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl hover:from-nirvul-primary-700 hover:to-nirvul-primary-800 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-nirvul-primary-500/50"
                    aria-label="Create a new account"
                  >
                    <Link href="/register" className="flex items-center space-x-2">
                      <UserAddOutlined className="group-hover:rotate-12 transition-transform duration-300" />
                      <span>রেজিস্টার</span>
                    </Link>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={handleMobileMenuToggle}
              className="group p-3 md:hidden rounded-2xl bg-white/80 backdrop-blur-sm border border-nirvul-gray-300 hover:bg-nirvul-primary-50 hover:border-nirvul-primary-300 focus:outline-none focus:ring-2 focus:ring-nirvul-primary-500/50 transition-all duration-300 shadow-sm hover:shadow-lg"
              aria-label={
                mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"
              }
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <div className="relative w-6 h-6">
                {mobileMenuOpen ? (
                  <X size={24} className="text-nirvul-gray-700 group-hover:text-nirvul-primary-700 transition-colors absolute inset-0" />
                ) : (
                  <Menu className="text-nirvul-gray-700 group-hover:text-nirvul-primary-700 transition-colors absolute inset-0" size={24} />
                )}
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            id="mobile-menu"
            className="absolute left-4 right-4 top-full z-50 mt-2 bg-white/95 backdrop-blur-xl px-6 py-6 shadow-2xl border border-nirvul-gray-200/50 rounded-3xl transition-all duration-300 md:hidden"
            role="menu"
            aria-label="Mobile navigation menu"
            style={{
              animation: 'slideIn 0.3s ease-out'
            }}
          >
            {/* Mobile menu background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-nirvul-primary-25/30 via-transparent to-nirvul-primary-50/20 rounded-3xl"></div>
            
            <div className="relative flex flex-col gap-6">
              {/* User Info Section for Mobile */}
              {user && (
                <div className="flex items-center gap-4 pb-6 border-b border-nirvul-gray-200">
                  <div className="relative">
                    <Avatar
                      size="large"
                      className="bg-gradient-to-br from-nirvul-primary-500 to-nirvul-primary-700 text-white font-semibold shadow-lg border-2 border-white"
                      icon={!user.name ? <UserOutlined /> : null}
                    >
                      {user.name ? getUserInitials(user.name) : null}
                    </Avatar>
                    {/* Online indicator */}
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white shadow-sm">
                      <div className="w-full h-full bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-semibold text-nirvul-gray-900 truncate">
                      {user.name || "User"}
                    </p>
                    {user.email && (
                      <p className="text-sm text-nirvul-gray-600 truncate">
                        {user.email}
                      </p>
                    )}
                    <div className="flex items-center space-x-2 mt-1">
                      <Crown className="w-3 h-3 text-nirvul-primary-500" />
                      <span className="text-xs text-nirvul-primary-600 font-medium">প্রিমিয়াম ব্যবহারকারী</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col gap-4">
                {isLoading ? (
                  <div
                    className="flex justify-center items-center py-8"
                    role="status"
                    aria-label="Loading user information"
                  >
                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-8 h-8 border-2 border-nirvul-primary-500 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-nirvul-gray-600 font-medium">লোডিং...</span>
                    </div>
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : user ? (
                  <button
                    className="group flex items-center justify-center space-x-3 w-full h-14 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                    onClick={() => {
                      handleLogout();
                      closeMobileMenu();
                    }}
                    aria-label="Logout from your account"
                    role="menuitem"
                  >
                    <LogoutOutlined className="text-lg group-hover:rotate-12 transition-transform duration-300" />
                    <span>লগআউট</span>
                  </button>
                ) : (
                  <div className="flex flex-col gap-4">
                    <button
                      className="group flex items-center justify-center space-x-3 w-full h-14 bg-white/80 backdrop-blur-sm border border-nirvul-gray-300 text-nirvul-gray-700 rounded-2xl font-semibold shadow-sm hover:shadow-lg hover:bg-nirvul-primary-50 hover:border-nirvul-primary-300 hover:text-nirvul-primary-700 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-nirvul-primary-500/50"
                      aria-label="Log in to your account"
                      role="menuitem"
                    >
                      <Link
                        href="/login"
                        onClick={closeMobileMenu}
                        className="w-full h-full flex items-center justify-center space-x-3"
                      >
                        <LoginOutlined className="text-lg group-hover:translate-x-0.5 transition-transform duration-300" />
                        <span>লগইন</span>
                      </Link>
                    </button>
                    <button
                      className="group flex items-center justify-center space-x-3 w-full h-14 bg-gradient-to-r from-nirvul-primary-600 to-nirvul-primary-700 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:from-nirvul-primary-700 hover:to-nirvul-primary-800 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-nirvul-primary-500/50"
                      aria-label="Create a new account"
                      role="menuitem"
                    >
                      <Link
                        href="/register"
                        onClick={closeMobileMenu}
                        className="w-full h-full flex items-center justify-center space-x-3"
                      >
                        <UserAddOutlined className="text-lg group-hover:rotate-12 transition-transform duration-300" />
                        <span>রেজিস্টার</span>
                      </Link>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Overlay for mobile menu */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
            onClick={closeMobileMenu}
            aria-hidden="true"
            style={{
              animation: 'fadeIn 0.3s ease-out'
            }}
          />
        )}
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </header>
  );
};

export default HeaderMain;
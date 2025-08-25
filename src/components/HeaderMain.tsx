"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button, Spin } from "antd";
import { useUser } from "@/hooks/useUser";
import useAuth from "@/app/(auth)/useAuth";
import { LogoutOutlined, LoginOutlined, UserAddOutlined } from "@ant-design/icons";

const HeaderMain = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: user, isLoading } = useUser();
  const { handleLogout } = useAuth();
  return (
    <header
      aria-describedby="Nirvul-header"
      className="shadow-xs sticky left-0 top-0 z-50 w-full bg-white py-3.5"
    >
      <div className="container relative">
        <nav className="flex items-center justify-between gap-7">
          {/* Logo */}
          <div className="flex shrink-0 items-center">
            <div className="relative border-r border-gray-300 pr-7">
              <Link
                href="/"
                className="flex w-50 items-center"
                aria-label="Nirvul home"
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
                <Spin size="small" />
              ) : user ? (
                <Button
                  type="primary"
                  size="middle"
                  danger
                  icon={<LogoutOutlined />}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              ) : (
                <>
                  <Button type="default" size="middle" icon={<LoginOutlined />}>
                    <Link href="/login" className="flex items-center">
                      Log In
                    </Link>
                  </Button>
                  <Button type="primary" size="middle" icon={<UserAddOutlined />}>
                    <Link href="/register" className="flex items-center">
                      Register
                    </Link>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X size={24} className="text-gray-600" />
              ) : (
                <Menu className="text-gray-600" size={24} />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute left-0 right-0 top-full z-50 mt-0 bg-white px-4 py-5 shadow-md transition-all duration-300 md:hidden">
            <ul className="flex flex-col gap-y-4">
              <li className="flex flex-col gap-2 pt-2 border-t border-gray-200">
                {isLoading ? (
                  <div className="flex justify-center py-2">
                    <Spin size="small" />
                  </div>
                ) : user ? (
                  <Button
                    icon={<LogoutOutlined />}
                    type="primary"
                    block
                    danger
                    className="mt-2"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                ) : (
                  <div className="flex-col gap-2">
                    <Button
                      type="default"
                      block
                      className="mt-2"
                      icon={<LoginOutlined />}
                    >
                      <Link
                        href="/login"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Log In
                      </Link>
                    </Button>
                    <Button
                      type="primary"
                      block
                      className="mt-2"
                      icon={<UserAddOutlined />}
                    >
                      <Link
                        href="/register"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Register
                      </Link>
                    </Button>
                  </div>
                )}
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderMain;

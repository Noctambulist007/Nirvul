"use client";
import { Form, Input, Button, Typography } from "antd";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
const { Title, Text } = Typography;

export default function Login() {
  const { form, loading, handleLogin } = useAuth();

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background with gradients and patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-nirvul-primary-25 via-white to-nirvul-primary-50"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-nirvul-gray-25/50 via-transparent to-nirvul-primary-100/30"></div>

      {/* Floating background elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-nirvul-primary-200/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-nirvul-primary-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-nirvul-primary-100/40 rounded-full blur-2xl animate-pulse delay-500"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
        {/* Login Card */}
        <div className="w-full max-w-md relative">
          {/* Card glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-nirvul-primary-200/20 via-white/40 to-nirvul-primary-300/20 rounded-3xl blur-xl transform scale-105"></div>

          <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-nirvul-gray-200/50 overflow-hidden">
            {/* Top gradient bar */}
            <div className="h-1 bg-gradient-to-r from-nirvul-primary-500 via-nirvul-primary-600 to-nirvul-primary-700"></div>

            <div className="p-8 sm:p-10">
              {/* Logo Section */}
              <div className="flex items-center justify-center mb-5">
                <div className="relative group">
                  {/* Logo container with enhanced styling */}
                  <div className="w-16 h-16 bg-gradient-to-br from-nirvul-primary-500 to-nirvul-primary-700 rounded-2xl shadow-xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 border-4 border-white">
                    {process.env.NEXT_PUBLIC_LOGO_URL ? (
                      <Image
                        src={process.env.NEXT_PUBLIC_LOGO_URL}
                        alt="নির্ভুল Logo"
                        width={40}
                        height={40}
                        className="filter brightness-0 invert"
                      />
                    ) : (
                      <Sparkles className="w-8 h-8 text-white" />
                    )}
                  </div>

                  {/* Animated ring */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-nirvul-primary-300/50 animate-ping"></div>
                </div>
              </div>

              {/* Title Section */}
              <div className="text-center mb-5">
                <Title
                  level={2}
                  className="!text-nirvul-gray-900 !mb-1 !font-bold"
                >
                  <span className="bg-gradient-to-r from-nirvul-primary-700 to-nirvul-primary-500 bg-clip-text text-transparent">
                    স্বাগতম
                  </span>
                </Title>
                <Text className="!text-lg text-nirvul-gray-600">
                  আপনার{" "}
                  <span className="font-bold bg-gradient-to-r from-nirvul-primary-600 to-nirvul-primary-500 bg-clip-text text-transparent">
                    নির্ভুল
                  </span>{" "}
                  অ্যাকাউন্টে সাইন ইন করুন
                </Text>
                <div className="w-30 h-1 bg-gradient-to-r from-nirvul-primary-400 to-nirvul-primary-600 rounded-full mx-auto mt-3"></div>
              </div>

              {/* Enhanced Form */}
              <Form
                form={form}
                layout="vertical"
                name="login"
                onFinish={handleLogin}
                className="space-y-6"
              >
                {/* Email Field */}
                <Form.Item
                  label={
                    <span className="text-nirvul-gray-700 font-semibold flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-nirvul-primary-500" />
                      <span>ইমেইল ঠিকানা</span>
                    </span>
                  }
                  name="email"
                  rules={[
                    { required: true, message: "অনুগ্রহ করে আপনার ইমেইল দিন" },
                    {
                      type: "email",
                      message: "অনুগ্রহ করে একটি বৈধ ইমেইল দিন",
                    },
                  ]}
                >
                  <Input
                    placeholder="you@example.com"
                    className="!h-12 !rounded-xl !border-nirvul-gray-300 hover:!border-nirvul-primary-400 focus:!border-nirvul-primary-500 !shadow-sm transition-all duration-300"
                    prefix={<Mail className="w-4 h-4 text-nirvul-gray-400" />}
                  />
                </Form.Item>

                {/* Password Field */}
                <Form.Item
                  label={
                    <span className="text-nirvul-gray-700 font-semibold flex items-center space-x-2">
                      <Lock className="w-4 h-4 text-nirvul-primary-500" />
                      <span>পাসওয়ার্ড</span>
                    </span>
                  }
                  name="password"
                  rules={[
                    { required: true, message: "অনুগ্রহ করে পাসওয়ার্ড দিন" },
                    {
                      min: 6,
                      message: "পাসওয়ার্ড কমপক্ষে ৬টি অক্ষরের হতে হবে",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="কমপক্ষে ৬টি অক্ষর"
                    className="!h-12 !rounded-xl !border-nirvul-gray-300 hover:!border-nirvul-primary-400 focus:!border-nirvul-primary-500 !shadow-sm transition-all duration-300"
                    prefix={<Lock className="w-4 h-4 text-nirvul-gray-400" />}
                    iconRender={(visible) =>
                      visible ? (
                        <Eye className="w-4 h-4 text-nirvul-gray-400" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-nirvul-gray-400" />
                      )
                    }
                  />
                </Form.Item>

                {/* Sign up link */}
                <div className="flex justify-between items-center py-2">
                  <span className="text-nirvul-gray-500">অ্যাকাউন্ট নেই?</span>
                  <Link
                    href="/register"
                    className="group inline-flex items-center space-x-1 text-nirvul-primary-600 hover:text-nirvul-primary-700 font-semibold transition-all duration-300"
                  >
                    <span>নতুন অ্যাকাউন্ট তৈরি করুন</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>

                {/* Submit Button */}
                <Form.Item style={{ marginBottom: 0 }} className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="group w-full h-14 bg-gradient-to-r from-nirvul-primary-600 to-nirvul-primary-700 hover:from-nirvul-primary-700 hover:to-nirvul-primary-800 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-nirvul-primary-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden"
                  >
                    {/* Button background animation */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                    <div className="relative flex items-center justify-center space-x-2">
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>সাইন ইন হচ্ছে...</span>
                        </>
                      ) : (
                        <>
                          <span>সাইন ইন করুন</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </div>
                  </button>
                </Form.Item>
              </Form>

              {/* Footer decorative element */}
              <div className="mt-8 pt-6 border-t border-nirvul-gray-200">
                <div className="text-center">
                  <div className="inline-flex items-center space-x-2 text-nirvul-gray-500 text-sm">
                    <div className="w-2 h-2 bg-nirvul-primary-400 rounded-full animate-pulse"></div>
                    <span>নিরাপদ ও এনক্রিপ্টেড সংযোগ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

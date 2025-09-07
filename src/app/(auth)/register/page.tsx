"use client";
import { Form, Input, Button, Typography } from "antd";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Mail,
  Lock,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  Shield,
  CheckCircle,
} from "lucide-react";
import useAuth from "../../../hooks/useAuth";

const { Title, Text } = Typography;

export default function Signup() {
  const { form, loading, handleRegister } = useAuth();

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background with gradients and patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-nirvul-primary-25 via-white to-nirvul-primary-50"></div>
      <div className="absolute inset-0 bg-gradient-to-tl from-nirvul-gray-25/50 via-transparent to-nirvul-primary-100/30"></div>

      {/* Floating background elements */}
      <div className="absolute top-10 right-20 w-36 h-36 bg-nirvul-primary-200/30 rounded-full blur-3xl animate-pulse delay-300"></div>
      <div className="absolute bottom-32 left-16 w-44 h-44 bg-nirvul-primary-300/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      <div className="absolute top-1/3 right-1/3 w-28 h-28 bg-nirvul-primary-100/40 rounded-full blur-2xl animate-pulse delay-1000"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
        {/* Signup Card */}
        <div className="w-full max-w-lg relative">
          {/* Card glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-nirvul-primary-200/20 via-white/40 to-nirvul-primary-300/20 rounded-3xl blur-xl transform scale-105"></div>

          <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-nirvul-gray-200/50 overflow-hidden">
            {/* Top gradient bar */}
            <div className="h-1.5 bg-gradient-to-r from-nirvul-primary-500 via-nirvul-primary-600 to-nirvul-primary-700"></div>

            <div className="p-8 sm:p-10">
              {/* Logo Section */}
              <div className="flex items-center justify-center mb-5">
                <div className="relative group">
                  {/* Logo container with enhanced styling */}
                  <div className="w-16 h-16 bg-gradient-to-br from-nirvul-primary-500 to-nirvul-primary-700 rounded-2xl shadow-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border-4 border-white">
                    {process.env.NEXT_PUBLIC_LOGO_URL ? (
                      <Image
                        src={process.env.NEXT_PUBLIC_LOGO_URL}
                        alt="নির্ভুল Logo"
                        width={48}
                        height={48}
                        className="filter brightness-0 invert"
                      />
                    ) : (
                      <Sparkles className="w-8 h-8 text-white" />
                    )}
                  </div>

                  {/* Animated rings */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-nirvul-primary-300/50 animate-ping"></div>
                  <div className="absolute inset-0 rounded-2xl border border-nirvul-primary-400/30 animate-pulse delay-1000"></div>
                </div>
              </div>

              {/* Title Section */}
              <div className="text-center mb-5">
                <Title
                  level={2}
                  className="!text-nirvul-gray-900 !mb-1 !font-bold"
                >
                  <span className="bg-gradient-to-r from-nirvul-primary-700 to-nirvul-primary-500 bg-clip-text text-transparent">
                    অ্যাকাউন্ট তৈরি করুন
                  </span>
                </Title>
                <Text className="!text-lg text-nirvul-gray-600">
                  <span className="font-bold bg-gradient-to-r from-nirvul-primary-600 to-nirvul-primary-500 bg-clip-text text-transparent">
                    নির্ভুল
                  </span>{" "}
                  এর সাথে যুক্ত হন আজই
                </Text>
                <div className="w-30 h-1 bg-gradient-to-r from-nirvul-primary-400 to-nirvul-primary-600 rounded-full mx-auto mt-3"></div>
              </div>

              {/* Enhanced Form */}
              <Form
                form={form}
                layout="vertical"
                name="register"
                onFinish={handleRegister}
                className="space-y-5"
              >
                {/* Full Name Field */}
                <Form.Item
                  label={
                    <span className="text-nirvul-gray-700 font-semibold flex items-center space-x-2">
                      <User className="w-4 h-4 text-nirvul-primary-500" />
                      <span>পূর্ণ নাম</span>
                    </span>
                  }
                  name="fullName"
                  rules={[
                    { required: true, message: "অনুগ্রহ করে আপনার নাম দিন" },
                  ]}
                >
                  <Input
                    placeholder="আপনার সম্পূর্ণ নাম লিখুন"
                    className="!h-12 !rounded-xl !border-nirvul-gray-300 hover:!border-nirvul-primary-400 focus:!border-nirvul-primary-500 !shadow-sm transition-all duration-300"
                    prefix={<User className="w-4 h-4 text-nirvul-gray-400" />}
                  />
                </Form.Item>

                {/* Email Field */}
                <Form.Item
                  label={
                    <span className="text-nirvul-gray-700 font-semibold flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-nirvul-primary-500" />
                      <span>ইমেইল</span>
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

                {/* Confirm Password Field */}
                <Form.Item
                  label={
                    <span className="text-nirvul-gray-700 font-semibold flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-nirvul-primary-500" />
                      <span>পাসওয়ার্ড নিশ্চিত করুন</span>
                    </span>
                  }
                  name="confirmPassword"
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                      message: "অনুগ্রহ করে পাসওয়ার্ড নিশ্চিত করুন",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error("পাসওয়ার্ড মিলছে না"));
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    placeholder="পুনরায় পাসওয়ার্ড লিখুন"
                    className="!h-12 !rounded-xl !border-nirvul-gray-300 hover:!border-nirvul-primary-400 focus:!border-nirvul-primary-500 !shadow-sm transition-all duration-300"
                    prefix={<Shield className="w-4 h-4 text-nirvul-gray-400" />}
                    iconRender={(visible) =>
                      visible ? (
                        <Eye className="w-4 h-4 text-nirvul-gray-400" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-nirvul-gray-400" />
                      )
                    }
                  />
                </Form.Item>

                {/* Security features info */}
                <div className="bg-nirvul-primary-25/50 rounded-xl p-4 border border-nirvul-primary-200/30">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-nirvul-primary-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-nirvul-primary-700 mb-1">
                        আপনার তথ্য সুরক্ষিত
                      </p>
                      <p className="text-xs text-nirvul-primary-600">
                        আমরা উন্নত এনক্রিপশন ব্যবহার করে আপনার ব্যক্তিগত তথ্য
                        সুরক্ষিত রাখি
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Form.Item style={{ marginBottom: 0 }} className="pt-4">
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
                          <span>অ্যাকাউন্ট তৈরি হচ্ছে...</span>
                        </>
                      ) : (
                        <>
                          <span>অ্যাকাউন্ট তৈরি করুন</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </div>
                  </button>
                </Form.Item>
              </Form>

              {/* Sign in link */}
              <div className="text-center mt-6 pt-6 border-t border-nirvul-gray-200">
                <span className="text-nirvul-gray-500">
                  ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
                </span>
                <Link
                  href="/login"
                  className="group inline-flex items-center space-x-1 text-nirvul-primary-600 hover:text-nirvul-primary-700 font-semibold transition-all duration-300"
                >
                  <span>সাইন ইন করুন</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>

              {/* Footer decorative element */}
              <div className="mt-6 pt-4">
                <div className="text-center">
                  <div className="inline-flex items-center space-x-2 text-nirvul-gray-500 text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>SSL এনক্রিপ্টেড ও সুরক্ষিত</span>
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

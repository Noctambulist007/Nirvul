"use client";
import { Form, Input, Button, Typography } from "antd";
import Link from "next/link";
import Image from "next/image";
import useAuth from "../../../hooks/useAuth";
const { Title, Text } = Typography;

export default function Login() {
  const { form, loading, handleLogin } = useAuth();
  return (
    <div className="w-full h-screen flex items-center justify-center px-4">
      {/* Modal card */}
      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 sm:p-10 border border-nirvul-gray-200">
        {/* Logo/Icon */}
        <div className="flex items-center justify-center mb-6">
          <div className="rounded-xl bg-nirvul-primary-100 flex items-center justify-center text-nirvul-primary-500 font-extrabold text-xl shadow-sm">
            <Image
              src={process.env.NEXT_PUBLIC_LOGO_URL || ""}
              alt="Logo"
              width={50}
              height={50}
            />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <Title level={3} className="!text-gray-900 !mb-2">
            Welcome back
          </Title>
          <Text type="secondary" className="!text-base">
            Sign in to{" "}
            <span className="font-semibold text-nirvul-primary-500">
              Nirvul
            </span>
          </Text>
        </div>

        {/* Ant Design Form */}
        <Form
          form={form}
          layout="vertical"
          name="login"
          onFinish={handleLogin}
          className="space-y-4"
        >
          <Form.Item
            label={"Email address"}
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="you@example.com" />
          </Form.Item>

          <Form.Item
            label={"Password"}
            name="password"
            rules={[{ required: true, message: "Please enter a password" }]}
          >
            <Input.Password placeholder="At least 8 characters" />
          </Form.Item>

          <div className="flex justify-between items-center text-sm mb-4">
            <span className="text-gray-500">Don't have an account?</span>
            <Link
              href="/register"
              className="text-nirvul-primary-500 hover:underline font-medium"
            >
              Create one
            </Link>
          </div>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

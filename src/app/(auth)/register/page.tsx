"use client";
import { Form, Input, Button, Typography } from "antd";
import Link from "next/link";
import Image from "next/image";
import useAuth from "../../../hooks/useAuth";

const { Title, Text } = Typography;

export default function Signup() {
  const { form, loading, handleRegister } = useAuth();
  return (
    <div className="w-full h-screen flex items-center justify-center bg-white px-4">
      {/* Modal card */}
      <div className="w-full max-w-md bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl p-8 sm:p-10 border border-gray-200">
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
            Create your account
          </Title>
          <Text type="secondary" className="!text-base">
            Join{" "}
            <span className="font-semibold text-nirvul-primary-500">
              Nirvul
            </span>{" "}
            today
          </Text>
        </div>

        {/* Form */}
        <Form
          form={form}
          layout="vertical"
          name="register"
          onFinish={handleRegister}
          className="space-y-4"
        >
          <Form.Item
            label={"Full Name"}
            name="fullName"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

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

          <Form.Item
            label={"Confirm Password"}
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Re-enter your password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Create Account
            </Button>
          </Form.Item>
        </Form>

        {/* Already have account */}
        <div className="text-center mt-6">
          <Text className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-nirvul-primary-500 hover:underline font-medium"
            >
              Sign in
            </Link>
          </Text>
        </div>
      </div>
    </div>
  );
}

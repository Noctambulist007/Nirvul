import { useState } from "react"
import { Form, message } from "antd"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"

const useAuth = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (values: any) => {
    setLoading(true);
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword(values)
    setLoading(false);
    if (!error) {
      message.success('Logged in successfully');
      router.push('/');
    } else {
      message.error(error.message);
    }
  }

  const handleRegister = async (values: any) => {
    setLoading(true);
    const supabase = await createClient();
    const { error } = await supabase.auth.signUp(values)
    setLoading(false);
    if (!error) {
      message.success('Account created successfully');
      router.push('/login');
    } else {
      message.error(error.message);
    }
  };

  // const handleLogout = async () => {
  //   setLoading(true);
  //   const res = await clientApi("/auth/logout");
  //   setLoading(false);
  //   if (res) {
  //     router.push("/login");
  //     message.success('Logged out successfully');
  //   }
  // };


  return {
    form,
    loading,
    setLoading,
    handleLogin,
    handleRegister,
    // handleLogout
  };
};
export default useAuth;

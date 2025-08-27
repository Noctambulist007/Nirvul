import { useState } from "react"
import { Form, message } from "antd"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase";
import { useQueryClient } from "@tanstack/react-query";

const useAuth = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

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
    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          name: values.fullName,
        }
      }
    })
    setLoading(false);
    if (!error) {
      message.success('Account created successfully');
      router.push('/login');
    } else {
      message.error(error.message);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    setLoading(false);
    if (!error) {
      message.success('Logged out successfully');
      queryClient.invalidateQueries({ queryKey: ["user"] });

      router.push('/login');
    } else {
      message.error(error.message);
    }
  };


  return {
    form,
    loading,
    setLoading,
    handleLogin,
    handleRegister,
    handleLogout
  };
};
export default useAuth;

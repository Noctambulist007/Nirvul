import { createClient } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  const getUser = async () => {
    const supabase = await createClient();
    const {data} = await supabase.auth.getUser();
    if (!data.user) {
      return null;
    }
    const authUserId = data.user.id;
    const { data: user } = await supabase
        .from('users')
        .select('*')
        .eq('auth_user_id', authUserId)
        .single();
    return user;
  };
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const user = await getUser();
      return user
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};

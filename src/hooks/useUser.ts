import { createClient } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  const getUser = async () => {
    const supabase = await createClient();
    const { data: user } = await supabase.auth.getUser();
    return user;
  };
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const data = await getUser();
      return data?.user;
    },
    staleTime: 1000 * 60 * 5,
  });
};

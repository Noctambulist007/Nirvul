import { createClient } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "./useUser";

export const useHistory = () => {
  const { data: user } = useUser();
  const getHistory = async () => {
    const supabase = await createClient();
    const { data } = await supabase
      .from("history")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    return data;
  };

  return useQuery({
    queryKey: ["history"],
    queryFn: async () => {
      const history = await getHistory();
      return history;
    },
  });
};

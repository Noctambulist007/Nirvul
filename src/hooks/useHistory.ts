import { createClient } from "@/utils/supabase";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useHistory = () => {
  const queryClient = useQueryClient();

  const getHistory = (userId: string) => {
    const fetchHistory = async (userId: string) => {
      const supabase = await createClient();
      const { data } = await supabase
        .from("history")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      return data;
    };

    return useQuery({
      queryKey: ["history", userId],
      queryFn: () => fetchHistory(userId),
      enabled: !!userId,
    });
  };

  const createHistory = async (userId: string, data: any) => {
    const supabase = await createClient();
    const { error } = await supabase
      .from("history")
      .insert([
        {
          user_id: userId,
          data: data,
        },
      ])
      .single();
    if (!error) {
      await queryClient.refetchQueries({ queryKey: ["history", userId] });
    } else {
      console.error(error.message);
    }
  };

  return {
    getHistory,
    createHistory,
  };
};

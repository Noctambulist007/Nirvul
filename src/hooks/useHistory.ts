import { createClient } from "@/utils/supabase";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useHistory = () => {
  const queryClient = useQueryClient();

  const getHistory = async (userId: string) => {
    return useQuery({
      queryKey: ["history"],
      queryFn: async () => {
        const history = async () => {
          const supabase = await createClient();
          const { data } = await supabase
            .from("history")
            .select("*")
            .eq("user_id", userId)
            .order("created_at", { ascending: false });
          return data;
        };
        return history;
      },
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
        queryClient.invalidateQueries({ queryKey: ["history"] });
      } else {
        console.error(error.message);
      }
  };

  return {
    getHistory,
    createHistory,
  };
};

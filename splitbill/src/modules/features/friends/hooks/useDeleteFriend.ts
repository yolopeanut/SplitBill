import { useMutation } from "@tanstack/react-query";
import useAuthContext from "../../../core/auth/hooks/useAuthContext";
import { supabase } from "../../../../config/Supabase";
import deleteFriendDB from "../../../core/database_functions/delete_friend";

export const useDeleteFriend = () => {
	const { user, session, isLoading } = useAuthContext();

	const { mutateAsync: deleteFriend } = useMutation({
		mutationFn: async (friend_id: string) => {
			if (!user || !session || !supabase || isLoading) return;

			await deleteFriendDB({ user_id: user.id, friend_id });
		},
	});

	return deleteFriend;
};

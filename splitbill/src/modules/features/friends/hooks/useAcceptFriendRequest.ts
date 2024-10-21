import { useMutation } from "@tanstack/react-query";
import useAuthContext from "../../../core/auth/hooks/useAuthContext";
import { supabase } from "../../../../config/Supabase";
import { useGetAllFriendRequests } from "./useGetFriendRequests";
import { useGetAllFriends } from "./useGetAllFriends";
import acceptFriendRequestDB from "../../../core/database_functions/accept_friend_request";

export const useAcceptFriendRequest = () => {
	const { user, session, isLoading } = useAuthContext();
	const getAllFriends = useGetAllFriends();
	const getFriendRequests = useGetAllFriendRequests();

	const { mutate: acceptFriendRequest } = useMutation({
		mutationFn: async (sender_id: string) => {
			if (!user || !session || !supabase || isLoading) return;

			await acceptFriendRequestDB(user.id, sender_id);
			getFriendRequests.refetch();
			getAllFriends.refetch();
		},
	});

	return acceptFriendRequest;
};

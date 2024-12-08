import { useQuery, UseQueryResult } from "@tanstack/react-query";
import useAuthContext from "../../../../core/auth/hooks/useAuthContext";
import getAllSentFriendRequests from "../../../../core/database_functions/get_all_sent_friend_requests";
import { IAllUsersTable } from "../../../../core/interfaces/all_usersTable";
import { supabase } from "../../../../../config/Supabase";

export const useGetAllSentFriendRequests = () => {
	const { user, session, isLoading } = useAuthContext();

	const getFriendRequests = useQuery({
		queryKey: ["friends", "fetchSentFriendRequests"],
		queryFn: async () => {
			if (isLoading || !user || !session || !supabase) {
				return [];
			}

			const data = await getAllSentFriendRequests(user.id);

			return data;
		},
		enabled: !!user && !!session && !!supabase && !isLoading,
	});

	return getFriendRequests as UseQueryResult<IAllUsersTable[]>;
};

export default useGetAllSentFriendRequests;

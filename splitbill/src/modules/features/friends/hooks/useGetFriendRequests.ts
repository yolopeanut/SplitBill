import { useQuery, UseQueryResult } from "@tanstack/react-query";
import useAuthContext from "../../../core/auth/hooks/useAuthContext";
import getPublicUrl from "../../../core/database_functions/getPublicUrl";
import { supabase } from "../../../../config/Supabase";
import { IAllUsersTable } from "../../../core/interfaces/all_usersTable";
import getOwnFriendRequests from "../../../core/database_functions/getOwnFriendRequests";

export const useGetAllFriendRequests = () => {
	const { user, session, isLoading } = useAuthContext();

	const getFriendRequests = useQuery({
		queryKey: ["friends", "fetchFriendRequests"],
		queryFn: async () => {
			if (isLoading || !user || !session || !supabase) {
				return [];
			}

			const data = await getOwnFriendRequests(user.id);

			data.map((sender) => {
				if (sender.profile_img_src) {
					sender.profile_img_url = getPublicUrl(sender.profile_img_src);
				}
			});

			return data;
		},
		enabled: !!user && !!session && !!supabase && !isLoading,
	});

	return getFriendRequests as UseQueryResult<IAllUsersTable[]>;
};

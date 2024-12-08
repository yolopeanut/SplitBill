import { useQuery, UseQueryResult } from "@tanstack/react-query";
import useAuthContext from "../../../../../../core/auth/hooks/useAuthContext";
import { supabase } from "../../../../../../../config/Supabase";
import getOwnFriendsOnly from "../../../../../../core/database_functions/getOwnFriendsOnly";
import getPublicUrl from "../../../../../../core/database_functions/getPublicUrl";
import { IAllFriendsTable } from "../../../../../../core/interfaces/all_usersTable";

export const useGetAllFriends = () => {
	const { user, session, isLoading } = useAuthContext();

	const getAllFriends = useQuery({
		queryKey: ["friends", "fetchFriends"],
		queryFn: async () => {
			if (isLoading || !user || !session || !supabase) {
				return [];
			}

			const data = await getOwnFriendsOnly();

			data.map((friend: IAllFriendsTable) => {
				if (friend.profile_img_src) {
					friend.profile_img_url = getPublicUrl(friend.profile_img_src);
				}
			});

			return data;
		},
		enabled: !!user && !!session && !!supabase && !isLoading,
	});

	return getAllFriends as UseQueryResult<IAllFriendsTable[]>;
};

export default useGetAllFriends;

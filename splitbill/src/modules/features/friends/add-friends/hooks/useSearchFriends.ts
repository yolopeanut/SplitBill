import { useQuery, UseQueryResult } from "@tanstack/react-query";
import searchNewFriends from "../../../../core/database_functions/search_new_friends";
import { IAllUsersTable } from "../../../../core/interfaces/all_usersTable";
import getPublicUrl from "../../../../core/database_functions/getPublicUrl";
import useAuthContext from "../../../../core/auth/hooks/useAuthContext";
import { supabase } from "../../../../../config/Supabase";

const useSearchFriends = (searchQuery: string) => {
	const { user, session, isLoading } = useAuthContext();

	const getSearchFriends = useQuery({
		queryKey: ["searchFriends", searchQuery],
		queryFn: async () => {
			if (isLoading || !user || !session || !supabase) {
				return [];
			}
			searchQuery = searchQuery.trim().toLowerCase();
			const data = await searchNewFriends(searchQuery);

			data.map((friend: IAllUsersTable) => {
				if (friend.profile_img_src) {
					friend.profile_img_url = getPublicUrl(friend.profile_img_src);
				}
			});

			return data;
		},
		enabled: !!user && !!session && !!supabase && !isLoading,
	});

	return getSearchFriends as UseQueryResult<IAllUsersTable[]>;
};

export default useSearchFriends;

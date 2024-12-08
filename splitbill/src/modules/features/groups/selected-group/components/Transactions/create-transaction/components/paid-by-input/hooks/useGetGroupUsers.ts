import { useQuery, UseQueryResult } from "@tanstack/react-query";
import getPublicUrl from "../../../../../../../../../core/database_functions/getPublicUrl";
import useAuthContext from "../../../../../../../../../core/auth/hooks/useAuthContext";
import getGroupUsersById from "../../../../../../../../../core/database_functions/get_group_users_by_group_id";
import { supabase } from "../../../../../../../../../../config/Supabase";
import { IAllUsersTable } from "../../../../../../../../../core/interfaces/all_usersTable";

export const useGetGroupUsers = ({ group_id }: { group_id: string }) => {
	const { user, session, isLoading } = useAuthContext();

	const getOwnGroupsQuery = useQuery({
		queryKey: ["groups", "fetchGroupUsers"],
		queryFn: async () => {
			if (isLoading || !user || !session || !supabase || !group_id) {
				return [];
			}

			if (group_id === "") {
				return [];
			}

			const data = await getGroupUsersById(group_id);

			data.map((user) => {
				if (user.profile_img_src) {
					user.profile_img_url = getPublicUrl(user.profile_img_src);
				}
			});

			return data;
		},
		enabled: !!user && !!session && !!supabase && !isLoading,
	});

	if (getOwnGroupsQuery.error) {
		throw getOwnGroupsQuery.error;
	}

	return getOwnGroupsQuery as UseQueryResult<IAllUsersTable[]>;
};

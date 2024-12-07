import { useQuery, UseQueryResult } from "@tanstack/react-query";
import getPublicUrl from "../../database_functions/getPublicUrl";
import useAuthContext from "../../auth/hooks/useAuthContext";
import getGroupUsersById from "../../database_functions/get_group_users_by_group_id";
import { IAllUsersTable } from "../../interfaces/all_usersTable";
import { supabase } from "../../../../config/Supabase";

interface IUseGetGroupUsersProps {
	group_id: string;
}

export const useGetGroupUsers = ({
	group_id,
}: IUseGetGroupUsersProps): UseQueryResult<IAllUsersTable[]> => {
	const { user, session, isLoading } = useAuthContext();

	const getOwnGroupsQuery = useQuery({
		queryKey: ["groups", "fetchGroupUsers"],
		queryFn: async () => {
			if (isLoading || !user || !session || !supabase || !group_id) {
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

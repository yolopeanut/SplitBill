import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { IAllGroupsTable } from "../../../../core/interfaces/all_GroupsTable";
import getOwnGroupsDB from "../../../../core/database_functions/get_own_groups_only";
import useAuthContext from "../../../../core/auth/hooks/useAuthContext";
import { supabase } from "../../../../../config/Supabase";
import getPublicUrl from "../../../../core/database_functions/getPublicUrl";

export const useGetOwnGroups = () => {
	const { user, session, isLoading } = useAuthContext();

	const getOwnGroupsQuery = useQuery({
		queryKey: ["groups", "fetchOwnGroups"],
		queryFn: async () => {
			if (isLoading || !user || !session || !supabase) {
				return [];
			}

			const data = await getOwnGroupsDB(user.id);

			data.map((group) => {
				if (group.img_src) {
					group.img_url = getPublicUrl(group.img_src);
				}
			});

			return data;
		},
		enabled: !!user && !!session && !!supabase && !isLoading,
	});

	if (getOwnGroupsQuery.error) {
		throw getOwnGroupsQuery.error;
	}

	return getOwnGroupsQuery as UseQueryResult<IAllGroupsTable[]>;
};

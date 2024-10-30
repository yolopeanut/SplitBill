import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { supabase } from "../../../../../config/Supabase";
import useAuthContext from "../../../../core/auth/hooks/useAuthContext";
import getPublicUrl from "../../../../core/database_functions/getPublicUrl";
import { IAllGroupsTable } from "../../../../core/interfaces/all_GroupsTable";
import getGroupById from "../../../../core/database_functions/get_group_by_id";

export const useGetSelectedGroup = (groupId: string) => {
	const { user, session, isLoading } = useAuthContext();

	const getSelectedGroupQuery = useQuery({
		queryKey: ["groups", "fetchSelectedGroup"],
		queryFn: async () => {
			if (isLoading || !user || !session || !supabase) {
				return [];
			}

			const data = await getGroupById(groupId);

			data.map((group) => {
				if (group.img_src) {
					group.img_url = getPublicUrl(group.img_src);
				}
			});

			return data[0];
		},
		enabled: !!user && !!session && !!supabase && !isLoading,
	});

	if (getSelectedGroupQuery.error) {
		throw getSelectedGroupQuery.error;
	}

	return getSelectedGroupQuery as UseQueryResult<IAllGroupsTable | undefined>;
};

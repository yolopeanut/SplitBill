import { useQuery } from "@tanstack/react-query";
import getAllUsersById from "../../../core/database_functions/getUserArraybyId";
import useAuthContext from "../../../core/auth/hooks/useAuthContext";
import getPublicUrl from "../../../core/database_functions/getPublicUrl";
import { IAllUsersTable } from "../../../core/interfaces/all_usersTable";

export const useGetUser = () => {
	const { user, isLoading } = useAuthContext();

	const getUserById = useQuery({
		queryKey: ["profile_page", "getUserById"],
		queryFn: async () => {
			if (user && !isLoading) {
				const data = await getAllUsersById(user.id);
				data[0].profile_img_url = getPublicUrl(data[0].profile_img_src);
				return data[0] as IAllUsersTable;
			}
		},
		enabled: !!user && !isLoading,
	});

	return getUserById;
};

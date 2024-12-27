import { useMutation } from "@tanstack/react-query";
import { useGroupsContext } from "../../../../hooks/useGroupsContext";
import { useGetGroupUsers } from "../../../../../../core/common/hooks/useGetGroupUsers";
import post_add_group_user from "../../../../../../core/database_functions/post_add_group_user";
import post_change_user_group_status from "../../../../../../core/database_functions/post_change_user_group_status";
import { queryClient } from "../../../../../../../config/ReactQuery";
import useUserContext from "../../../../../login/hooks/useUserContext";


const useJoinGroup = (groupId: string) => {
	const { setGroupUsers } = useGroupsContext();
	const { currentUser } = useUserContext();
    const { data: groupUsers } = useGetGroupUsers({ group_id: groupId });

	const { mutateAsync: joinGroup } = useMutation({
		mutationFn: async () => {
			// Add all new users
			if (groupUsers?.find((groupUser) => groupUser.id === currentUser?.id)?.status !== "kicked") {
				await post_add_group_user(groupId, currentUser?.id ?? "");
			} else {
				await post_change_user_group_status(groupId, currentUser?.id ?? "", "operating");
			}
		},
		onSuccess: async () => {

			if (groupUsers && currentUser) {
				const updatedUsers = [...groupUsers, currentUser];
				setGroupUsers(updatedUsers);
			}
            queryClient.invalidateQueries({ queryKey: ["groups", "fetchGroupUsers"] });

		},
	});

	return { joinGroup };
};

export default useJoinGroup;

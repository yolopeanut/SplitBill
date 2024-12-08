import { useMutation } from "@tanstack/react-query";
import post_change_user_group_status from "../../../../../../../core/database_functions/post_change_user_group_status";
import { useGroupsContext } from "../../../../../hooks/useGroupsContext";
import { queryClient } from "../../../../../../../../config/ReactQuery";

export const useKickGroupMember = () => {
	const { groupUsers, setGroupUsers } = useGroupsContext();
	const { mutateAsync: kickGroupMember } = useMutation({
		mutationFn: async ({ userId, groupId }: { userId: string; groupId: string }) => {
			await post_change_user_group_status(groupId, userId, "kicked");
		},
		onSuccess: (_, { userId }) => {
			queryClient.invalidateQueries({ queryKey: ["groups", "fetchGroupUsers"] });
			setGroupUsers(groupUsers?.filter((user) => user.id !== userId));
		},
	});

	return { kickGroupMember };
};

export default useKickGroupMember;

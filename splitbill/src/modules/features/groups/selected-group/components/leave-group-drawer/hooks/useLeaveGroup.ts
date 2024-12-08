import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../../../../../config/ReactQuery";
import post_change_user_group_status from "../../../../../../core/database_functions/post_change_user_group_status";
import useAuthContext from "../../../../../../core/auth/hooks/useAuthContext";

export const useLeaveGroup = () => {
	const { user } = useAuthContext();
	const { mutateAsync: leaveGroup } = useMutation({
		mutationFn: async ({ groupId }: { groupId: string }) => {
			console.log("Leave Group", groupId);
			await post_change_user_group_status(groupId, user?.id ?? "", "kicked");
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["groups", "fetchOwnGroups"] });
		},
	});

	return { leaveGroup };
};

export default useLeaveGroup;

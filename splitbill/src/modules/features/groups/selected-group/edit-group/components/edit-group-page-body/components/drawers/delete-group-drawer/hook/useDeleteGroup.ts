import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../../../../../../../../../config/ReactQuery";
import deleteGroupDB from "../../../../../../../../../../core/database_functions/delete_group";

export const useDeleteGroup = () => {
	const { mutateAsync: deleteGroup } = useMutation({
		mutationFn: async ({ groupId }: { groupId: string }) => {
			// console.log("Delete Group", groupId);
			await deleteGroupDB(groupId);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["groups", "fetchOwnGroups"] });
		},
	});

	return { deleteGroup };
};

export default useDeleteGroup;

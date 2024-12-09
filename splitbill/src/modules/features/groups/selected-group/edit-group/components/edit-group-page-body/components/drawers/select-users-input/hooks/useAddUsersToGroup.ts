import { UseFormGetValues } from "react-hook-form";
import { IEditUserForm } from "../../../../../../../../../../core/interfaces/editUserForm";
import { useMutation } from "@tanstack/react-query";
import post_add_group_user from "../../../../../../../../../../core/database_functions/post_add_group_user";
import { useGroupsContext } from "../../../../../../../../hooks/useGroupsContext";
import { queryClient } from "../../../../../../../../../../../config/ReactQuery";
import { useGetGroupUsers } from "../../../../../../../../../../core/common/hooks/useGetGroupUsers";
import post_change_user_group_status from "../../../../../../../../../../core/database_functions/post_change_user_group_status";

interface MutationProps {
	getValues: UseFormGetValues<IEditUserForm>;
}

const useAddUsersToGroup = () => {
	const { selectedGroupId, setGroupUsers } = useGroupsContext();
	const { data: groupUsers } = useGetGroupUsers({ group_id: selectedGroupId ?? "" });
	const { mutateAsync: addUsersToGroup } = useMutation({
		mutationFn: async ({ getValues }: MutationProps) => {
			// Add all new users
			for (const user of getValues().users) {
				if (groupUsers?.find((groupUser) => groupUser.id === user.id)?.status !== "kicked") {
					await post_add_group_user(selectedGroupId ?? "", user.id);
				} else {
					await post_change_user_group_status(selectedGroupId ?? "", user.id, "operating");
				}
			}
		},
		onSuccess: async (_, { getValues }) => {
			queryClient.invalidateQueries({ queryKey: ["groups", "fetchGroupUsers"] });

			if (groupUsers && getValues().users) {
				const updatedUsers = [...groupUsers, ...getValues().users];
				setGroupUsers(updatedUsers);
			}
		},
	});

	return { addUsersToGroup };
};

export default useAddUsersToGroup;

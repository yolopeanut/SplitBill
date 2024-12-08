import { useMutation } from "@tanstack/react-query";
import useAuthContext from "../../../../../../core/auth/hooks/useAuthContext";
import post_image_to_storage from "../../../../../../core/database_functions/postImageToStorage";
import post_add_group_user from "../../../../../../core/database_functions/post_add_group_user";
import post_create_group from "../../../../../../core/database_functions/post_create_group";
import { ICreateGroupForm } from "../../../../../../core/interfaces/createGroupForm";
import { UseFormGetValues } from "react-hook-form";

type TPostCreateGroup = {
	getValues: UseFormGetValues<ICreateGroupForm>;
};
const usePostCreateGroup = ({ getValues }: TPostCreateGroup) => {
	const { user } = useAuthContext();

	const { mutateAsync: postCreateGroup } = useMutation({
		mutationFn: async (data: ICreateGroupForm) => {
			if (user && getValues().image_src) {
				const imagePath = await post_image_to_storage(getValues().image_src);
				data.image_url = imagePath;
			}
			if (user) {
				const groupId = await post_create_group(data);
				// console.log(groupId);

				// Add the creator of the group to the group
				await post_add_group_user(groupId, user.id);

				// Add the other users to the group
				const new_group_users = getValues().new_group_users;
				new_group_users.forEach(async (user) => {
					await post_add_group_user(groupId, user.id);
				});
			}
		},
	});

	return { postCreateGroup };
};

export default usePostCreateGroup;

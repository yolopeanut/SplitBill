import { useMutation } from "@tanstack/react-query";
import useAuthContext from "../../../../core/auth/hooks/useAuthContext";
import deleteFriendRequestDB from "../../../../core/database_functions/delete_friend_request";

const useDeleteFriendRequest = () => {
	const { user } = useAuthContext();
	const { mutate: deleteFriendRequest } = useMutation({
		mutationFn: async ({ p_receiver_id }: { p_receiver_id: string }) => {
			if (!user) return;

			await deleteFriendRequestDB(user.id, p_receiver_id);
		},
	});
	return deleteFriendRequest;
};

export default useDeleteFriendRequest;

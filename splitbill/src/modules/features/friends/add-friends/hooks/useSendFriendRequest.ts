import { useMutation } from "@tanstack/react-query";
import sendFriendRequestDB from "../../../../core/database_functions/send_friend_requests";
import useAuthContext from "../../../../core/auth/hooks/useAuthContext";

const useSendFriendRequest = () => {
	const { user } = useAuthContext();
	const { mutate: sendFriendRequest } = useMutation({
		mutationFn: async ({ p_receiver_id }: { p_receiver_id: string }) => {
			if (!user) return;
			await sendFriendRequestDB(user.id, p_receiver_id);
		},
	});

	return sendFriendRequest;
};

export default useSendFriendRequest;

import { useMutation } from "@tanstack/react-query";
import sendFriendRequestDB from "../../../../core/database_functions/send_friend_requests";
import useAuthContext from "../../../../core/auth/hooks/useAuthContext";

const useSendFriendRequest = () => {
	const { user } = useAuthContext();
	const { mutateAsync: sendFriendRequest } = useMutation({
		mutationFn: async ({ p_receiver_id }: { p_receiver_id: string }) => {
			// console.log("SENT REQUEST");
			if (!user) return;
			await sendFriendRequestDB(user.id, p_receiver_id);
		},
		retryDelay: 1000,
	});
	return sendFriendRequest;
};

export default useSendFriendRequest;

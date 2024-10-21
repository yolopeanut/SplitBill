import { supabase } from "../../../config/Supabase";

const acceptFriendRequestDB = async (user_id: string, sender_id: string) => {
	const { error } = await supabase.schema("splitbill").rpc("accept_friend_request", {
		p_sender_id: sender_id,
		p_receiver_id: user_id,
	});

	if (error) {
		throw error;
	}
};

export default acceptFriendRequestDB;

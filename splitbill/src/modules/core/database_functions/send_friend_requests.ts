import { supabase } from "../../../config/Supabase";

const sendFriendRequestDB = async (p_sender_id: string, p_receiver_id: string) => {
	const { error } = await supabase.schema("splitbill").rpc("send_friend_request", {
		p_sender_id: p_sender_id,
		p_receiver_id: p_receiver_id,
	});

	if (error) {
		throw error;
	}
};

export default sendFriendRequestDB;

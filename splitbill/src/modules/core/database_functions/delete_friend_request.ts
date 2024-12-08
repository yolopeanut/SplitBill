import { supabase } from "../../../config/Supabase";

const deleteFriendRequestDB = async (p_sender_id: string, p_receiver_id: string) => {
	const { error } = await supabase.schema("splitbill").rpc("delete_friend_request", {
		p_sender_id: p_sender_id,
		p_receiver_id: p_receiver_id,
	});

	if (error) {
		throw error;
	}
};

export default deleteFriendRequestDB;

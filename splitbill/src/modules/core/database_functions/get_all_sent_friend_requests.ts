import { supabase } from "../../../config/Supabase";
import { IAllUsersTable } from "../interfaces/all_usersTable";

const getAllSentFriendRequests = async (p_sender_id: string) => {
	const { data, error } = await supabase.schema("splitbill").rpc("get_all_sent_friend_requests", {
		p_sender_id: p_sender_id,
	});

	if (error) {
		throw error;
	}

	return data as IAllUsersTable[];
};

export default getAllSentFriendRequests;

import { supabase } from "../../../config/Supabase";
import { IAllUsersTable } from "../interfaces/all_usersTable";

const getOwnFriendRequests = async (user_id: string) => {
	const { data, error } = await supabase.schema("splitbill").rpc("get_friend_requests", {
		p_receiver_id: user_id,
	});

	if (error) {
		throw error;
	}

	return data as IAllUsersTable[];
};

export default getOwnFriendRequests;

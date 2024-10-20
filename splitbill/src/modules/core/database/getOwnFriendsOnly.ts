import { supabase } from "../../../config/Supabase";

const getOwnFriendsOnly = async () => {
	const { data, error } = await supabase.schema("splitbill").rpc("get_own_friends_only");

	if (error) {
		throw error;
	}

	return data;
};

export default getOwnFriendsOnly;

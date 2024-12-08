import { supabase } from "../../../config/Supabase";

const searchNewFriends = async (search_string: string) => {
	const { data, error } = await supabase.schema("splitbill").rpc("search_new_friend", {
		p_unique_username_substring: search_string,
	});

	if (error) {
		throw error;
	}

	return data;
};

export default searchNewFriends;

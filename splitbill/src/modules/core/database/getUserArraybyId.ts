import { supabase } from "../../../config/Supabase";

const getAllUsersById = async (user_id: string) => {
	const { data, error } = await supabase.schema("splitbill").rpc("get_user_by_id", {
		p_user_id: user_id,
	});

	if (error) {
		throw error;
	}

	return data;
};

export default getAllUsersById;

import { supabase } from "../../../config/Supabase";
import { IAllUsersTable } from "../interfaces/all_usersTable";

const getGroupUsersById = async (group_id: string) => {
	const { data, error } = await supabase.schema("splitbill").rpc("get_group_users_by_group_id", {
		p_group_id: group_id,
	});

	if (error) {
		throw error;
	}

	return data as IAllUsersTable[];
};

export default getGroupUsersById;

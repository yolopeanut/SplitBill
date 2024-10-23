import { supabase } from "../../../config/Supabase";
import { IAllGroupsTable } from "../interfaces/all_GroupsTable";

const getOwnGroupsDB = async (user_id: string) => {
	const { data, error } = await supabase.schema("splitbill").rpc("get_own_groups_only", {
		p_user_id: user_id,
	});

	if (error) {
		throw error;
	}

	return data as IAllGroupsTable[];
};

export default getOwnGroupsDB;

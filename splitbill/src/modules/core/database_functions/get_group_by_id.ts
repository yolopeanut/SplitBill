import { supabase } from "../../../config/Supabase";
import { IAllGroupsTable } from "../interfaces/all_GroupsTable";

const getGroupById = async (group_id: string) => {
	const { data, error } = await supabase.schema("splitbill").rpc("get_group_by_id", {
		p_group_id: group_id,
	});

	if (error) {
		throw error;
	}

	return data as IAllGroupsTable[];
};

export default getGroupById;

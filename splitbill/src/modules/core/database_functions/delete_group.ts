import { supabase } from "../../../config/Supabase";

const deleteGroupDB = async (group_id: string) => {
	const { error } = await supabase.schema("splitbill").rpc("delete_group", {
		p_group_id: group_id,
	});

	if (error) {
		throw error;
	}
};

export default deleteGroupDB;

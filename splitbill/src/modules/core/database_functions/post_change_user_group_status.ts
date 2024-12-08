import { supabase } from "../../../config/Supabase";

// Initiate a new post in the profile of the user
export default async function post_change_user_group_status(
	group_id: string,
	user_id: string,
	status: string
): Promise<void> {
	const { error } = await supabase.schema("splitbill").rpc("post_change_user_group_status", {
		p_group_id: group_id,
		p_user_id: user_id,
		p_status: status,
	});

	if (error) {
		throw error;
	}
}

import { supabase } from "../../../config/Supabase";

// Initiate a new post in the profile of the user
export const post_add_group_user = async (group_id: string, user_id: string): Promise<void> => {
	const createProfile = await supabase.schema("splitbill").rpc("post_add_group_user", {
		p_group_id: group_id,
		p_user_id: user_id,
	});

	if (createProfile.error) {
		throw new Error(createProfile.error.message);
	}
};

export default post_add_group_user;

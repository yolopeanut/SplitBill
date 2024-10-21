import { supabase } from "../../../config/Supabase";
import { IFormInput } from "../interfaces/createProfileForm";

// Initiate a new post in the profile of the user
export default async function update_user_profile(data: IFormInput, imagePath: string, id: string): Promise<void> {
	const createProfile = await supabase.schema("splitbill").rpc("update_user_profile", {
		p_id: id,
		p_username: data.username,
		p_display_name: data.displayName,
		p_profile_picture_path: imagePath,
	});

	if (createProfile.error) {
		throw new Error(createProfile.error.message);
	}
}

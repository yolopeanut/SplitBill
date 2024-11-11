import { supabase } from "../../../config/Supabase";
import { ICreateGroupForm } from "../interfaces/createGroupForm";

// Initiate a new post in the profile of the user
export default async function post_create_group(data: ICreateGroupForm): Promise<string> {
	console.log({ data });
	const createProfile = await supabase.schema("splitbill").rpc("post_create_group", {
		p_name: data.name,
		p_img_src: data.image_url || null,
		p_currency: data.currency,
	});

	if (createProfile.error) {
		throw new Error(createProfile.error.message);
	}

	return createProfile.data;
}

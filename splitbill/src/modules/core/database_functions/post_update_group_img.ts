import { supabase } from "../../../config/Supabase";

// Initiate a new post in the profile of the user
export default async function post_update_group_img(
	group_id: string,
	img_src: string
): Promise<void> {
	console.log("post_update_group_img", group_id, img_src);
	const updateImage = await supabase.schema("splitbill").rpc("post_update_group_img", {
		p_group_id: group_id,
		p_img_src: img_src,
	});

	if (updateImage.error) {
		throw new Error(updateImage.error.message);
	}
}

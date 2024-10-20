import { supabase } from "../../../config/Supabase";

const getPublicUrl = (profile_img_src: string) => {
	const { data } = supabase.storage.from("images").getPublicUrl(profile_img_src);
	return data.publicUrl;
};

export default getPublicUrl;

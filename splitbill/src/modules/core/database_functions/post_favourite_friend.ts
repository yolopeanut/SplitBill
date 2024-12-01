import { supabase } from "../../../config/Supabase";

interface IPostFavouriteFriendDB {
	user_id: string;
	friend_id: string;
	is_favourited: boolean;
}

const postFavouriteFriendDB = async ({
	user_id,
	friend_id,
	is_favourited,
}: IPostFavouriteFriendDB) => {
	const { error } = await supabase.schema("splitbill").rpc("favourite_friend", {
		p_user_id: user_id,
		p_friend_id: friend_id,
		p_is_favourited: is_favourited,
	});

	if (error) {
		throw error;
	}
};

export default postFavouriteFriendDB;

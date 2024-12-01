import { supabase } from "../../../config/Supabase";

interface IDeleteFriendDB {
	user_id: string;
	friend_id: string;
}

const deleteFriendDB = async ({ user_id, friend_id }: IDeleteFriendDB) => {
	const { error } = await supabase.schema("splitbill").rpc("delete_friend", {
		p_user_id: user_id,
		p_friend_id: friend_id,
	});

	if (error) {
		throw error;
	}
};

export default deleteFriendDB;

import { useMutation } from "@tanstack/react-query";
import postFavouriteFriendDB from "../../../../../core/database_functions/post_favourite_friend";

interface IPostFavouriteFriendDB {
	user_id: string;
	friend_id: string;
	is_favourited: boolean;
}

const useFavouriteFriend = () => {
	const { mutateAsync: postFavouriteFriend } = useMutation({
		mutationFn: async ({ user_id, friend_id, is_favourited }: IPostFavouriteFriendDB) => {
			await postFavouriteFriendDB({ user_id, friend_id, is_favourited });
		},
	});

	return {
		postFavouriteFriend,
	};
};

export default useFavouriteFriend;

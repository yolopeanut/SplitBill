import { queryClient } from "../../../../../../config/ReactQuery";
import useFavouriteFriend from "./useFavouriteFriend";

const useFriendCard = () => {
	const { postFavouriteFriend } = useFavouriteFriend();

	const handleFavourite = async (user_id: string, friend_id: string, is_favourited: boolean) => {
		await postFavouriteFriend({ user_id, friend_id, is_favourited });
		await queryClient.invalidateQueries({ queryKey: ["friends", "fetchFriends"] });
	};

	return {
		handleFavourite,
	};
};

export default useFriendCard;

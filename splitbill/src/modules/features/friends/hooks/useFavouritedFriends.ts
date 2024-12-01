import { IAllFriendsTable } from "../../../core/interfaces/all_usersTable";

const useFavouritedFriends = (data: IAllFriendsTable[]) => {
	const favouritedFriends = data.filter((friend) => friend.is_favourited);
	const normalFriends = data.filter((friend) => !friend.is_favourited);
	return { favouritedFriends, normalFriends };
};

export default useFavouritedFriends;

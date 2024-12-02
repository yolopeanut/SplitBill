import useAuthContext from "../../../core/auth/hooks/useAuthContext";
import { IAllFriendsTable } from "../../../core/interfaces/all_usersTable";

const useFavouritedFriends = (data: IAllFriendsTable[]) => {
	const { user } = useAuthContext();
	const baseFilter = data.filter((friend) => friend.id !== user?.id);
	const favouritedFriends = baseFilter.filter((friend) => friend.is_favourited);
	const normalFriends = baseFilter.filter((friend) => !friend.is_favourited);
	return { favouritedFriends, normalFriends };
};

export default useFavouritedFriends;

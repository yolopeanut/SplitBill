import useAuthContext from "../../auth/hooks/useAuthContext";
import { IAllFriendsTable } from "../../interfaces/all_usersTable";

interface IFavouritedFriends {
	data: IAllFriendsTable[];
	searchQuery: string;
}

const useFavouritedFriends = ({ data, searchQuery }: IFavouritedFriends) => {
	const { user } = useAuthContext();
	const baseFilter = data.filter((friend) => friend.id !== user?.id);
	const searchFilter = baseFilter.filter((friend) => {
		if (searchQuery) {
			return friend.name.toLowerCase().includes(searchQuery.toLowerCase());
		}
		return true;
	});
	const favouritedFriends = searchFilter.filter((friend) => friend.is_favourited);
	const normalFriends = searchFilter.filter((friend) => !friend.is_favourited);
	return { favouritedFriends, normalFriends };
};

export default useFavouritedFriends;

import { IAllFriendsTable, IAllUsersTable } from "../../interfaces/all_usersTable";

export default function useFilterGroupUsersByFriends(
	filteredFriends: IAllFriendsTable[],
	groupUsers: IAllUsersTable[] | undefined
) {
	// Filter out users that are already in the group and not kicked
	const filteredUsers = filteredFriends.filter(
		(user) => !groupUsers?.some((member) => member.id === user.id && member.status !== "kicked")
	);

	return filteredUsers;
}

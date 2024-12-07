import { IAllUsersTable } from "../../interfaces/all_usersTable";

export default function useFilterKickedGroupUsers(groupUsers: IAllUsersTable[] | undefined) {
	// Keep only users that are not kicked
	const filteredUsers = groupUsers?.filter((user) => user.status !== "kicked");

	return filteredUsers;
}

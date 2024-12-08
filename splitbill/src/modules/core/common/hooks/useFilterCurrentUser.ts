import useAuthContext from "../../auth/hooks/useAuthContext";
import { IAllFriendsTable } from "../../interfaces/all_usersTable";

export default function useFilterCurrentUser(data: IAllFriendsTable[]) {
	const { user } = useAuthContext();

	const filteredUsers = data.filter((item) => item.id !== user?.id);

	return filteredUsers;
}

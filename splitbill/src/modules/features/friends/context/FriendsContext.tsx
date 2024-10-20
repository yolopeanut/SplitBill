import { createContext } from "react";
import { supabase } from "../../../../config/Supabase";
import { useQuery } from "@tanstack/react-query";
import useAuthContext from "../../../core/auth/hooks/useAuthContext";
import { IAllUsersTable } from "../../../core/interfaces/all_usersTable";

const FriendsContext = createContext({
	getFriends: [] as IAllUsersTable[],
	refetchFriends: () => {},
	addFriend: () => {},
	removeFriend: () => {},
});

export const FriendsProvider = ({ children }: { children: React.ReactNode }) => {
	const { user } = useAuthContext();

	const getAllFriends = useQuery({
		queryKey: ["friends", "fetchFriends"],
		queryFn: async () => {
			if (!user) return {};

			const { data, error } = await supabase.schema("splitbill").rpc("get_own_friends_only");

			if (error) {
				throw error;
			}

			console.log({ data });
			return data;
		},
		enabled: !!user,
	});

	const value = {
		getFriends: getAllFriends.data,
		refetchFriends: getAllFriends.refetch,
		addFriend: () => {},
		removeFriend: () => {},
	};

	return <FriendsContext.Provider value={value}>{children}</FriendsContext.Provider>;
};

export default FriendsContext;

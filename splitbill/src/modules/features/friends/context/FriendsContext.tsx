import { createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuthContext from "../../../core/auth/hooks/useAuthContext";
import getOwnFriendsOnly from "../../../core/database/getOwnFriendsOnly";
import { IAllFriendsTable } from "../../../core/interfaces/all_friendsTable";
import getPublicUrl from "../../../core/database/getPublicUrl";

const FriendsContext = createContext({
	getFriends: [] as IAllFriendsTable[],
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

			const data = await getOwnFriendsOnly();

			data.map((friend: IAllFriendsTable) => {
				if (friend.profile_img_src) {
					friend.profile_img_url = getPublicUrl(friend.profile_img_src);
				}
			});

			console.log({ data });
			return data;
		},
		enabled: !!user,
	});

	const value = {
		getFriends: getAllFriends.data as IAllFriendsTable[],
		refetchFriends: getAllFriends.refetch,
		addFriend: () => {},
		removeFriend: () => {},
	};

	return <FriendsContext.Provider value={value}>{children}</FriendsContext.Provider>;
};

export default FriendsContext;

import { createContext, useState, useRef } from "react";
import { IAllUsersTable } from "../../../core/interfaces/all_usersTable";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import useAuthContext from "../../../core/auth/hooks/useAuthContext";
import { User } from "@supabase/supabase-js";
import getPublicUrl from "../../../core/database_functions/getPublicUrl";
import getAllUsersById from "../../../core/database_functions/getUserArraybyId";

export const UserContext = createContext<{
	currentUser: IAllUsersTable | null;
	hasCreatedProfile: boolean;
	getUserById: UseQueryResult<IAllUsersTable[]>;
}>({
	currentUser: null,
	hasCreatedProfile: false,
	getUserById: {} as UseQueryResult<IAllUsersTable[]>,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [currentUser, setCurrentUser] = useState<IAllUsersTable | null>(null);
	const hasCreatedProfile = useRef(false);
	const auth = useAuthContext();

	const getUserById = GetUser({
		user: auth.user,
		isLoading: auth.isLoading,
		setCurrentUser,
		hasCreatedProfile,
	});

	// Uses hasCreatedProfile to verify if user has created a profile and therefore a profile image
	GetProfileImg({ hasCreatedProfile, currentUser });

	const value = {
		currentUser: currentUser,
		hasCreatedProfile: hasCreatedProfile.current,
		getUserById,
	};

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const GetUser = ({
	user,
	isLoading,
	setCurrentUser,
	hasCreatedProfile,
}: {
	user: User | null;
	isLoading: boolean;
	setCurrentUser: React.Dispatch<React.SetStateAction<IAllUsersTable | null>>;
	hasCreatedProfile: React.MutableRefObject<boolean>;
}): UseQueryResult<IAllUsersTable[]> => {
	const getUserById = useQuery({
		queryKey: ["created_profile", "getUserById"],
		queryFn: async () => {
			if (user && !isLoading) {
				const data = await getAllUsersById(user.id);

				const currentUserData = data[0] as IAllUsersTable;
				if (currentUserData) {
					setCurrentUser(currentUserData);
					hasCreatedProfile.current = currentUserData.unique_username !== null;
				}

				return data;
			}
		},
		enabled: !!user && !isLoading,
	});
	return getUserById;
};

const GetProfileImg = ({
	hasCreatedProfile,
	currentUser,
}: {
	hasCreatedProfile: React.MutableRefObject<boolean>;
	currentUser: IAllUsersTable | null;
}): void => {
	const getProfileImg = useQuery({
		queryKey: ["created_profile", "getProfileImg"],
		queryFn: async () => {
			if (hasCreatedProfile.current && currentUser?.profile_img_src) {
				return getPublicUrl(currentUser.profile_img_src);
			}
		},
		enabled: hasCreatedProfile.current,
	});

	if (hasCreatedProfile.current && currentUser) {
		currentUser.profile_img_url = getProfileImg.data ?? null;
	}
};

export default UserContext;

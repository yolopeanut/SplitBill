import { useState } from "react";
import { useForm } from "react-hook-form";
import { useGroupsContext } from "../../../../../hooks/useGroupsContext";

const useEditGroupPage = () => {
	const { selectedGroup, selectedGroupId } = useGroupsContext();
	const { register } = useForm();

	// Open select users drawer to add users
	const [isSelectUsersDrawerOpen, setIsSelectUsersDrawerOpen] = useState(false);

	// Open delete group drawer
	const [isDeleteGroupDrawerOpen, setIsDeleteGroupDrawerOpen] = useState(false);

	// Open select users drawer to kick users
	const [isKickUsersDrawerOpen, setIsKickUsersDrawerOpen] = useState(false);
	// Add state for selected user to kick
	const [selectedUserToKick, setSelectedUserToKick] = useState<string | null>(null);

	return {
		selectedGroup,
		selectedGroupId,
		register,
		isSelectUsersDrawerOpen,
		setIsSelectUsersDrawerOpen,
		isDeleteGroupDrawerOpen,
		setIsDeleteGroupDrawerOpen,
		isKickUsersDrawerOpen,
		setIsKickUsersDrawerOpen,
		selectedUserToKick,
		setSelectedUserToKick,
	};
};

export default useEditGroupPage;

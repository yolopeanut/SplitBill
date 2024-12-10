import React, { SetStateAction, Dispatch } from "react";
import SelectUsersInput from "./select-users-input/SelectUsersInput";
import KickUsersDrawer from "./kick-user-drawer/KickUsersDrawer";
import DeleteGroupDrawer from "./delete-group-drawer/DeleteGroupDrawer";

interface EditGroupDrawersProps {
	setIsSelectUsersDrawerOpen: Dispatch<SetStateAction<boolean>>;
	isSelectUsersDrawerOpen: boolean;
	setIsKickUsersDrawerOpen: Dispatch<SetStateAction<void>>;
	isKickUsersDrawerOpen: boolean;
	setIsDeleteGroupDrawerOpen: Dispatch<SetStateAction<boolean>>;
	isDeleteGroupDrawerOpen: boolean;
	selectedUserToKick: string;
	selectedGroupId: string;
}

const EditGroupDrawers = ({
	setIsSelectUsersDrawerOpen,
	isSelectUsersDrawerOpen,
	setIsKickUsersDrawerOpen,
	isKickUsersDrawerOpen,
	setIsDeleteGroupDrawerOpen,
	isDeleteGroupDrawerOpen,
	selectedUserToKick,
	selectedGroupId,
}: EditGroupDrawersProps) => {
	return (
		<>
			<SelectUsersInput
				setIsSelectUsersDrawerOpen={setIsSelectUsersDrawerOpen}
				isSelectUsersDrawerOpen={isSelectUsersDrawerOpen}
			/>

			<KickUsersDrawer
				setIsKickUsersDrawerOpen={setIsKickUsersDrawerOpen}
				isKickUsersDrawerOpen={isKickUsersDrawerOpen}
				selectedId={selectedUserToKick ?? ""}
				selectedGroupId={selectedGroupId ?? ""}
			/>

			<DeleteGroupDrawer
				setIsDeleteGroupDrawerOpen={setIsDeleteGroupDrawerOpen}
				isDeleteGroupDrawerOpen={isDeleteGroupDrawerOpen}
				selectedGroupId={selectedGroupId ?? ""}
			/>
		</>
	);
};

export default EditGroupDrawers;

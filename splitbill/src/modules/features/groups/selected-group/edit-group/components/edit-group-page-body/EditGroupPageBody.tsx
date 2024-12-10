import EditGroupDrawers from "./components/drawers/EditGroupDrawers";
import GroupName from "./components/GroupName";
import EditGroupImage from "./components/edit-group-image/EditGroupImage";
import EditGroupUsers from "./components/edit-group-users/EditGroupUsers";
import useEditGroupPage from "./hooks/useEditGroupPage";

const EditGroupPageBody = () => {
	const {
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
	} = useEditGroupPage();

	// Modify the drawer close handler
	const handleKickUsersDrawerClose = () => {
		setIsKickUsersDrawerOpen(false);
		setSelectedUserToKick(null);
	};

	const handleDeleteGroupDrawerOpen = () => {
		setIsDeleteGroupDrawerOpen(!isDeleteGroupDrawerOpen);
	};

	return (
		<>
			<div className='flex flex-col gap-4 px-4 w-full h-full'>
				{/* Group Image */}
				<EditGroupImage />

				{/* Group Name */}
				<GroupName
					selectedGroup={selectedGroup}
					register={register}
				/>

				{/* Users */}
				<EditGroupUsers
					setIsSelectUsersDrawerOpen={setIsSelectUsersDrawerOpen}
					setIsKickUsersDrawerOpen={setIsKickUsersDrawerOpen}
					setSelectedUserToKick={setSelectedUserToKick}
					isSelectUsersDrawerOpen={isSelectUsersDrawerOpen}
				/>

				{/* Delete Group Button */}
				<button
					type='button'
					className='btn border-font-red-dark text-font-red-dark w-full'
					onClick={handleDeleteGroupDrawerOpen}
				>
					Delete Group
				</button>
			</div>

			<EditGroupDrawers
				setIsSelectUsersDrawerOpen={setIsSelectUsersDrawerOpen}
				isSelectUsersDrawerOpen={isSelectUsersDrawerOpen}
				setIsKickUsersDrawerOpen={handleKickUsersDrawerClose}
				isKickUsersDrawerOpen={isKickUsersDrawerOpen}
				setIsDeleteGroupDrawerOpen={setIsDeleteGroupDrawerOpen}
				isDeleteGroupDrawerOpen={isDeleteGroupDrawerOpen}
				selectedUserToKick={selectedUserToKick ?? ""}
				selectedGroupId={selectedGroupId ?? ""}
			/>
		</>
	);
};

export default EditGroupPageBody;

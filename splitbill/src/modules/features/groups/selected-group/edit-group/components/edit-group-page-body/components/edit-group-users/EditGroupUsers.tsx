import React, { Dispatch, SetStateAction } from "react";
import useFilterKickedGroupUsers from "../../../../../../../../core/common/hooks/useFilterKickedGroupUsers";
import { useGroupsContext } from "../../../../../../hooks/useGroupsContext";
import { useLongPressDropdown } from "../../../../../../../../core/common/hooks/useLongPressDropdown";
import { IoIosAdd } from "react-icons/io";
import UserCardGeneric from "../../../../../../../../core/common/components/UserCardGeneric";
import DropdownComponent from "../DropdownComponent";

interface IEditGroupUsersProps {
	setIsSelectUsersDrawerOpen: Dispatch<SetStateAction<boolean>>;
	setIsKickUsersDrawerOpen: Dispatch<SetStateAction<boolean>>;
	setSelectedUserToKick: Dispatch<SetStateAction<string | null>>;
	isSelectUsersDrawerOpen: boolean;
}

const EditGroupUsers = ({
	setIsSelectUsersDrawerOpen,
	setIsKickUsersDrawerOpen,
	setSelectedUserToKick,
	isSelectUsersDrawerOpen,
}: IEditGroupUsersProps) => {
	const { groupUsers } = useGroupsContext();
	const filteredKickedGroupUsers = useFilterKickedGroupUsers(groupUsers ?? []);

	const handleSelectUsersDrawerOpen = () => {
		setIsSelectUsersDrawerOpen(!isSelectUsersDrawerOpen);
	};
	// Modify the kick drawer open handler
	const handleKickUsersDrawerOpen = (userId: string) => {
		setSelectedUserToKick(userId);
		setIsKickUsersDrawerOpen(true);
	};

	// Long press dropdown to kick user
	const { selectedId, dropdownPosition, touchProps, closeDropdown } = useLongPressDropdown();

	return (
		<>
			{" "}
			<div className='flex flex-col gap-1 pb-8'>
				<div className='flex flex-row justify-between'>
					<span className='text-font-white text-base font-semibold'>Group Members</span>
					<button
						className='btn btn-xs min-w-[4.5rem] border-brand-orange text-brand-orange rounded-full'
						onClick={handleSelectUsersDrawerOpen}
					>
						<div className='flex flex-row items-center gap-2 justify-between w-full'>
							<IoIosAdd
								size={15}
								className='bg-brand-orange text-font-black rounded-full'
							/>
							<span className='text-font-white text-xs font-normal'>Add</span>
						</div>
					</button>
				</div>

				{filteredKickedGroupUsers?.map((user) => (
					<div
						key={user.id}
						id={user.id} // Important: Add this for the touchProps to work
						className='relative user-card-container'
						{...touchProps}
					>
						<UserCardGeneric
							userid={user.id}
							groupUsers={groupUsers}
						/>
						{selectedId === user.id && (
							<DropdownComponent
								position={dropdownPosition}
								onKick={() => {
									handleKickUsersDrawerOpen(user.id);
									closeDropdown();
								}}
							/>
						)}
					</div>
				))}
			</div>
		</>
	);
};

export default EditGroupUsers;

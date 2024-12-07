import { useForm } from "react-hook-form";
import { useGroupsContext } from "../../../../hooks/useGroupsContext";
import { BiSolidEditAlt } from "react-icons/bi";
import { IoIosAdd } from "react-icons/io";
import GroupImg from "../../../components/GroupImg";
import useEditImage from "../../hooks/useEditImage";
import { handleImageUpload } from "../../../../../../core/common/commonFunctions";
import { useRef, useState } from "react";
import { queryClient } from "../../../../../../../config/ReactQuery";
import SelectUsersInput from "./components/select-users-input/SelectUsersInput";
import useFilterKickedGroupUsers from "../../../../../../core/common/hooks/useFilterKickedGroupUsers";
import UserCardGeneric from "../../../../../../core/common/components/UserCardGeneric";
import DropdownComponent from "./components/DropdownComponent";
import { useLongPressDropdown } from "../../../../../../core/common/hooks/useLongPressDropdown";
import KickUsersDrawer from "./components/kick-user-drawer/KickUsersDrawer";

const EditGroupPageBody = () => {
	const { selectedGroup, groupUsers, selectedGroupId } = useGroupsContext();
	const filteredKickedGroupUsers = useFilterKickedGroupUsers(groupUsers ?? []);
	const { register } = useForm();
	const { editImage } = useEditImage();
	const handleDeleteGroup = () => {
		console.log("Delete Group");
	};

	// File input ref for changing group image when uploaded img
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleEditImage = async (image: File) => {
		await editImage(image);
		queryClient.invalidateQueries({ queryKey: ["groups", "fetchSelectedGroup"] });
	};

	// Open select users drawer to add users
	const [isSelectUsersDrawerOpen, setIsSelectUsersDrawerOpen] = useState(false);
	const handleSelectUsersDrawerOpen = () => {
		setIsSelectUsersDrawerOpen(!isSelectUsersDrawerOpen);
	};

	// Open select users drawer to kick users
	const [isKickUsersDrawerOpen, setIsKickUsersDrawerOpen] = useState(false);
	// Add state for selected user to kick
	const [selectedUserToKick, setSelectedUserToKick] = useState<string | null>(null);

	// Modify the kick drawer open handler
	const handleKickUsersDrawerOpen = (userId: string) => {
		setSelectedUserToKick(userId);
		setIsKickUsersDrawerOpen(true);
	};

	// Modify the drawer close handler
	const handleKickUsersDrawerClose = () => {
		setIsKickUsersDrawerOpen(false);
		setSelectedUserToKick(null);
	};

	// Long press dropdown to kick user
	const { selectedId, dropdownPosition, touchProps, closeDropdown } = useLongPressDropdown();

	return (
		<>
			<div className='flex flex-col gap-4 px-4 w-full h-full'>
				{/* Group Image */}
				<div className='h-[30%] relative'>
					<GroupImg className='w-full max-h-full aspect-square object-cover rounded-xl' />
					<button
						className='btn btn-sm absolute bottom-2 right-2 bg-brand-orange p-1 rounded-md text-font-black'
						onClick={() => fileInputRef.current?.click()}
					>
						<BiSolidEditAlt size={20} />
					</button>

					<input
						ref={fileInputRef}
						type='file'
						placeholder=''
						className='hidden'
						accept='image/png, image/gif, image/jpeg'
						onChange={(e) => {
							if (e.target.files && e.target.files.length > 0) {
								handleImageUpload({
									event: e,
									options: { maxSizeMB: 0.7, maxWidthOrHeight: 1000, useWebWorker: true },
								}).then((file) => {
									if (file) {
										handleEditImage(file);
									}
								});
							}
						}}
					/>
				</div>

				{/* Group Name */}
				<div className='flex flex-col gap-2'>
					<span className='text-font-white text-base font-semibold'>Group Name</span>
					<input
						type='text'
						className='input w-full bg-input-box-gray outline-none border-none'
						placeholder={selectedGroup?.name}
						{...register("groupName")}
					/>
				</div>

				{/* Users */}
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

				{/* Delete Group Button */}
				<button
					type='button'
					className='btn border-outline-red text-outline-red w-full'
					onClick={handleDeleteGroup}
				>
					Delete Group
				</button>
			</div>

			<SelectUsersInput
				setIsSelectUsersDrawerOpen={setIsSelectUsersDrawerOpen}
				isSelectUsersDrawerOpen={isSelectUsersDrawerOpen}
			/>

			<KickUsersDrawer
				setIsKickUsersDrawerOpen={handleKickUsersDrawerClose}
				isKickUsersDrawerOpen={isKickUsersDrawerOpen}
				selectedId={selectedUserToKick ?? ""}
				selectedGroupId={selectedGroupId ?? ""}
			/>
		</>
	);
};

export default EditGroupPageBody;

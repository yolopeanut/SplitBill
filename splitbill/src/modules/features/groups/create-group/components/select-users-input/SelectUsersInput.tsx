import { useState } from "react";
import { Control, Controller, ControllerRenderProps, UseFormGetValues } from "react-hook-form";
import { ICreateGroupForm } from "../../../../../core/interfaces/createGroupForm";
import { IAllUsersTable } from "../../../../../core/interfaces/all_usersTable";
import Drawer from "react-modern-drawer";
import useGetAllFriends from "./hooks/useGetAllFriends";
import CheckBox from "../../../../../core/common/components/CheckBox";
import { getInitials } from "../../../../../core/common/commonFunctions";

type SelectUsersInputProps = {
	control: Control<ICreateGroupForm>;
	getValues: UseFormGetValues<ICreateGroupForm>;
};

const SelectUsersInput = ({ control, getValues }: SelectUsersInputProps) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const { data: friends } = useGetAllFriends();

	const handleDrawerOpen = () => {
		setIsDrawerOpen(!isDrawerOpen);
	};

	return (
		<>
			{/* Select Friends Input Box */}
			<div
				className='flex flex-col gap-2 w-full pb-4'
				onClick={handleDrawerOpen}
			>
				<span className='text-font-white text-sm font-semibold'>Select Friends</span>
				<div className='w-full min-h-16 bg-card-gray-dark rounded-lg flex flex-col px-4 text-font-text-gray justify-center'>
					{getValues().new_group_users && getValues().new_group_users.length > 0
						? getValues().new_group_users.map((user) => (
								<div
									className='py-2'
									key={user.id}
								>
									<UserCard
										user={user}
										field={undefined}
										getValues={getValues}
										type='default'
									/>
								</div>
						  ))
						: "Select Friends"}
				</div>
			</div>

			{/* Select Friends Drawer Controller */}
			<Controller
				name='new_group_users'
				control={control}
				render={({ field }) => (
					<Drawer
						open={isDrawerOpen}
						onClose={handleDrawerOpen}
						direction='bottom'
						className='rounded-t-lg h-full w-full'
						size='80%'
						lockBackgroundScroll={true}
						style={{ backgroundColor: "#1F1F1F" }}
						duration={400}
					>
						<div className='flex flex-col gap-4 p-8 pt-4 h-full overflow-y-auto pb-20'>
							{/* Swipe to close */}
							<div className='border-brand-orange border-2 rounded-lg w-14 self-center'></div>

							{/* Search Input */}
							<div className='relative'>
								<input
									type='text'
									id='floating_outlined'
									className='block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-input-search-gray rounded-lg border border-input-search-gray appearance-auto text-white focus:border-input-search-gray focus:outline-none focus:ring-0 peer'
									placeholder=' '
								/>
								<label
									htmlFor='floating_outlined'
									className='absolute text-sm text-gray-500 text-gray-400 duration-300 transform -translate-y-24 scale-75 top-0 z-10 origin-[0] bg-gray-900 px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[0.4rem] peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 '
								>
									Search User
								</label>
							</div>

							{/* User Cards */}
							{friends?.map((user) => (
								<UserCard
									user={user}
									key={user.id}
									field={field}
									getValues={getValues}
									type='checkbox'
								/>
							))}
						</div>
					</Drawer>
				)}
			/>
		</>
	);
};

export default SelectUsersInput;

type UserCardProps = {
	user: IAllUsersTable;
	field: ControllerRenderProps<ICreateGroupForm, "new_group_users"> | undefined;
	getValues: UseFormGetValues<ICreateGroupForm>;
	type: "checkbox" | "default";
};

const UserCard = ({ user, field, getValues, type }: UserCardProps) => {
	return (
		<>
			<div className='flex flex-row items-center justify-between'>
				<div className='flex flex-row items-center gap-6'>
					{user.profile_img_src ? (
						<img
							src={user.profile_img_url || ""}
							alt='user profile'
							className='w-12 h-12 rounded-full'
						/>
					) : (
						<span className='text-font-black text-lg font-semibold'>{getInitials(user.name)}</span>
					)}
					<span className='text-font-white text-lg font-semibold'>{user.name}</span>
				</div>

				{type === "checkbox" && (
					<CheckBox
						divClassName='w-5 h-5 text-brand-orange outline outline-1 outline-brand-orange rounded flex items-center justify-center'
						iconClassName='text-font-black text-xl'
						onClick={() => {
							const selectedUsersArray = getValues().new_group_users || [];
							const isUserSelected = selectedUsersArray?.some(
								(selectedUsers: IAllUsersTable) => selectedUsers.id === user.id
							);

							const newUsers = isUserSelected
								? selectedUsersArray.filter((selectedUsers) => selectedUsers.id !== user.id) // Remove user if already selected
								: [...selectedUsersArray, user]; // Add user if not selected

							// Update the field value with the new list of users
							field?.onChange(newUsers);
							console.log(getValues().new_group_users);
						}}
					/>
				)}
			</div>
		</>
	);
};

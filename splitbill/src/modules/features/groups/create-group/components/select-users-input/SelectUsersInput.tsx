import { useState } from "react";
import { Control, Controller, FieldErrors, UseFormGetValues } from "react-hook-form";
import { ICreateGroupForm } from "../../../../../core/interfaces/createGroupForm";
import useGetAllFriends from "./hooks/useGetAllFriends";
import UserCard from "./components/UserCard";
import useFilterCurrentUser from "../../../../../core/common/hooks/useFilterCurrentUser";
import CommonDrawer from "../../../../../core/common/components/CommonDrawer";

type SelectUsersInputProps = {
	control: Control<ICreateGroupForm>;
	getValues: UseFormGetValues<ICreateGroupForm>;
	errors: FieldErrors<ICreateGroupForm>;
};

const SelectUsersInput = ({ control, getValues, errors }: SelectUsersInputProps) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	// Get all friends
	const { data: friends } = useGetAllFriends();

	// // Filter current user from friends
	const filteredFriends = useFilterCurrentUser(friends ?? []);

	// Handle opening and closing of drawer
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
				{errors.new_group_users && (
					<span className='text-font-red-dark text-sm'>{errors.new_group_users.message}</span>
				)}
			</div>

			{/* Select Friends Drawer Controller */}
			<Controller
				name='new_group_users'
				control={control}
				rules={{
					validate: {
						minUsers: (value) => {
							if (!Array.isArray(value) || value.length <= 0) {
								return "Please select at least one person";
							}

							return true;
						},
					},
				}}
				render={({ field }) => (
					<CommonDrawer
						isOpen={isDrawerOpen}
						toggleDrawer={handleDrawerOpen}
						size='80vh'
					>
						<div className='flex flex-col gap-4 p-4 pt-4 h-full overflow-y-auto pb-20'>
							{/* Search Input */}
							<div className='relative'>
								<input
									type='text'
									id='floating_outlined'
									className='block px-2.5 pb-2.5 pt-4 w-full text-sm bg-input-search-gray rounded-lg border border-input-search-gray appearance-auto text-white focus:border-input-search-gray focus:outline-none focus:ring-0 peer'
									placeholder=' '
								/>
								<label
									htmlFor='floating_outlined'
									className='absolute text-sm text-font-text-gray duration-300 transform -translate-y-24 scale-75 top-0 z-10 origin-[0] bg-transparent px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[0.4rem] peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 '
								>
									Search User
								</label>
							</div>

							{/* User Cards */}
							{filteredFriends?.map((user) => (
								<UserCard
									user={user}
									key={user.id}
									field={field}
									getValues={getValues}
									type='checkbox'
								/>
							))}
						</div>
					</CommonDrawer>
				)}
			/>
		</>
	);
};

export default SelectUsersInput;

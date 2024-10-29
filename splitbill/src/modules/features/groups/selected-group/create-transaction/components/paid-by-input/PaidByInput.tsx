import { Controller, ControllerRenderProps, Control } from "react-hook-form";
import FormValues from "../../../../../../core/interfaces/createTransactionForm";
import { useGetGroupUsers } from "./hooks/useGetGroupUsers";
import { useGroupsContext } from "../../../../hooks/useGroupsContext";
import Drawer from "react-modern-drawer";
import { IAllUsersTable } from "../../../../../../core/interfaces/all_usersTable";
import { Dispatch, SetStateAction, useState } from "react";

export const PaidByInput = ({ control }: { control: Control<FormValues> }) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState<IAllUsersTable | null>(null);

	const { selectedGroupId } = useGroupsContext();
	console.log({ PaidByInput: selectedGroupId });

	const { data: groupUsers } = useGetGroupUsers({ group_id: selectedGroupId || "" });

	const handleDrawerOpen = () => {
		setIsDrawerOpen(!isDrawerOpen);
	};

	return (
		<>
			{/* Paid By Input Box */}
			<div
				className='flex flex-col gap-2 w-full pb-4'
				onClick={handleDrawerOpen}
			>
				<span className='text-font-white text-sm font-semibold'>Paid By</span>
				<div className='w-full h-20 bg-card-gray-dark rounded-lg flex items-center px-4'>
					{selectedUser ? (
						<UserCard
							user={selectedUser}
							field={undefined}
							setSelectedUser={undefined}
							setIsDrawerOpen={undefined}
						/>
					) : (
						"Select User"
					)}
				</div>
			</div>

			{/* Paid By Drawer Controller */}
			<Controller
				name='paidBy'
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
							{groupUsers?.map((user) => (
								<UserCard
									user={user}
									key={user.id}
									field={field}
									setSelectedUser={setSelectedUser}
									setIsDrawerOpen={setIsDrawerOpen}
								/>
							))}
						</div>
					</Drawer>
				)}
			/>
		</>
	);
};

export default PaidByInput;

const UserCard = ({
	user,
	field,
	setSelectedUser,
	setIsDrawerOpen,
}: {
	user: IAllUsersTable;
	field: ControllerRenderProps<FormValues, "paidBy"> | undefined;
	setSelectedUser: Dispatch<SetStateAction<IAllUsersTable | null>> | undefined;
	setIsDrawerOpen: Dispatch<SetStateAction<boolean>> | undefined;
}) => {
	return (
		<>
			<div
				className='flex flex-row justify-between items-center w-full gap-4 cursor-pointer'
				onClick={() => {
					field?.onChange(user.id);
					setSelectedUser?.(user);
					setIsDrawerOpen?.(false);
				}}
			>
				<div className='flex flex-row items-center gap-6'>
					{user.profile_img_src ? (
						<img
							src={user.profile_img_url || ""}
							alt='user profile'
							className='w-12 h-12 rounded-full'
						/>
					) : (
						<span className='text-font-black text-lg font-semibold'>{user.name.charAt(0)}</span>
					)}
					<span className='text-font-white text-lg font-semibold'>{user.name}</span>
				</div>
			</div>
		</>
	);
};

import { Dispatch } from "react";

import { ControllerRenderProps } from "react-hook-form";
import { ICreateTransactionForm } from "../../../../../../../../../core/interfaces/createTransactionForm";
import { SetStateAction } from "react";
import { IAllUsersTable } from "../../../../../../../../../core/interfaces/all_usersTable";

interface IUserCardProps {
	user: IAllUsersTable;
	field: ControllerRenderProps<ICreateTransactionForm, "paidBy"> | undefined;
	setSelectedUser: Dispatch<SetStateAction<IAllUsersTable | null>> | undefined;
	setIsDrawerOpen: Dispatch<SetStateAction<boolean>> | undefined;
}

const UserCard = ({ user, field, setSelectedUser, setIsDrawerOpen }: IUserCardProps) => {
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

export default UserCard;

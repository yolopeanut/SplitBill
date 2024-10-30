import { IAllUsersTable } from "../../../../../../../../core/interfaces/all_usersTable";
import { ControllerRenderProps } from "react-hook-form";
import FormValues from "../../../../../../../../core/interfaces/createTransactionForm";
import { getInitials } from "../../../../../../../../core/common/commonFunctions";
import { Dispatch, SetStateAction } from "react";

const UserCard = ({
	user,
	field,
	selectedSplitType,
	setSelectedUser,
}: {
	user: IAllUsersTable;
	field: ControllerRenderProps<FormValues, "splitBy"> | undefined;
	selectedSplitType: string | undefined;
	setSelectedUser: Dispatch<SetStateAction<IAllUsersTable[]>> | undefined;
}) => {
	if (!field) return <UserCardDefault user={user} />;
	if (selectedSplitType?.toLowerCase() === "equal")
		return (
			<UserCardEqualSplit
				user={user}
				field={field}
				setSelectedUser={setSelectedUser}
			/>
		);
	else if (selectedSplitType?.toLowerCase() === "custom")
		return (
			<UserCardCustomSplit
				user={user}
				field={field}
			/>
		);
	else if (selectedSplitType?.toLowerCase() === "percentage")
		return (
			<UserCardPercentageSplit
				user={user}
				field={field}
			/>
		);
};

export default UserCard;

const UserCardDefault = ({ user }: { user: IAllUsersTable }) => {
	return (
		<>
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
		</>
	);
};

const UserCardEqualSplit = ({
	user,
	field,
	setSelectedUser,
}: {
	user: IAllUsersTable;
	field: ControllerRenderProps<FormValues, "splitBy"> | undefined;
	setSelectedUser: Dispatch<SetStateAction<IAllUsersTable[]>> | undefined;
}) => {
	return (
		<>
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
				<input
					type='checkbox'
					defaultChecked
					className='checkbox checkbox-primary'
					{...field}
					onChange={() => {
						setSelectedUser?.((prev) => [...prev, user]);
					}}
				/>
			</div>
		</>
	);
};

const UserCardCustomSplit = ({
	user,
	field,
}: {
	user: IAllUsersTable;
	field: ControllerRenderProps<FormValues, "splitBy"> | undefined;
}) => {
	return (
		<>
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
				RM
				<input
					type='number'
					className='input input-bordered input-primary w-full max-w-xs'
					{...field}
				/>
			</div>
		</>
	);
};

const UserCardPercentageSplit = ({
	user,
	field,
}: {
	user: IAllUsersTable;
	field: ControllerRenderProps<FormValues, "splitBy"> | undefined;
}) => {
	return (
		<>
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
				%
				<input
					type='number'
					className='input input-bordered input-primary w-full max-w-xs'
					onChange={(e) => {
						field?.onChange({ hello: "world", value: e.target.value });
					}}
				/>
			</div>
		</>
	);
};

import { ControllerRenderProps, UseFormGetValues } from "react-hook-form";

import { useState } from "react";
import { ICreateTransactionForm } from "../../../../../../../../../../core/interfaces/createTransactionForm";
import { IAllUsersTable } from "../../../../../../../../../../core/interfaces/all_usersTable";
import { getInitials } from "../../../../../../../../../../core/common/commonFunctions";
import CheckBox from "../../../../../../../../../../core/common/components/CheckBox";

const UserCard = ({
	user,
	field,
	selectedSplitType,
	getValues,
}: {
	user: IAllUsersTable;
	field: ControllerRenderProps<ICreateTransactionForm, "splitBy"> | undefined;
	selectedSplitType: string | undefined;
	getValues: UseFormGetValues<ICreateTransactionForm>;
}) => {
	if (!field) return <UserCardDefault user={user} />;
	if (selectedSplitType?.toLowerCase() === "equal")
		return (
			<UserCardEqualSplit
				key={user.id}
				user={user}
				field={field}
				getValues={getValues}
			/>
		);
	else if (selectedSplitType?.toLowerCase() === "custom")
		return (
			<UserCardCustomSplit
				key={user.id}
				user={user}
				field={field}
				getValues={getValues}
			/>
		);
	else if (selectedSplitType?.toLowerCase() === "percentage")
		return (
			<UserCardPercentageSplit
				key={user.id}
				user={user}
				field={field}
				getValues={getValues}
			/>
		);
};

const NumericInput = ({
	onChange,
}: {
	field: ControllerRenderProps<ICreateTransactionForm, "splitBy"> | undefined;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
	const [value, setValue] = useState("0.00");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const numericValue = e.target.value.replace(/[^\d]/g, "");
		const floatValue = parseFloat(numericValue) / 100;
		const formattedValue = floatValue.toFixed(2);

		setValue(formattedValue);
		e.target.value = formattedValue;
		onChange(e);
	};

	return (
		<div className='w-full'>
			<input
				type='text'
				value={value}
				className='w-full h-full px-1 text-center font-semibold text-sm border-none outline-none rounded-lg bg-input-box-gray'
				inputMode='numeric'
				onChange={handleChange}
			/>
		</div>
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
	getValues,
}: {
	user: IAllUsersTable;
	field: ControllerRenderProps<ICreateTransactionForm, "splitBy"> | undefined;
	getValues: UseFormGetValues<ICreateTransactionForm>;
}) => {
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

				<CheckBox
					divClassName='w-5 h-5 text-brand-orange outline outline-1 outline-brand-orange rounded flex items-center justify-center'
					iconClassName='text-font-black text-xl'
					onClick={() => {
						const selectedUsersArray = getValues().splitBy?.value.users || [];
						const isUserSelected = selectedUsersArray.some(
							(selectedUsers) => selectedUsers.user.id === user.id
						);

						const newUsers = isUserSelected
							? selectedUsersArray.filter((selectedUsers) => selectedUsers.user.id !== user.id) // Remove user if already selected
							: [...selectedUsersArray, { user: user, amount: 0 }]; // Add user if not selected

						// Update the field value with the new list of users
						field?.onChange({
							value: {
								type: "Equal",
								users: newUsers,
							},
						});
					}}
				/>
			</div>
		</>
	);
};

const UserCardCustomSplit = ({
	user,
	field,
	getValues,
}: {
	user: IAllUsersTable;
	field: ControllerRenderProps<ICreateTransactionForm, "splitBy"> | undefined;
	getValues: UseFormGetValues<ICreateTransactionForm>;
}) => {
	return (
		<>
			<div className='flex flex-row items-center gap-6 justify-between'>
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

				<div className='flex flex-row items-center gap-2 min-w-[40%] max-w-[40%]'>
					RM
					<NumericInput
						field={field}
						onChange={(e) => {
							const usersArray = getValues().splitBy?.value.users || []; // Get all users
							const isUserInArray = usersArray.some((addedUsers) => addedUsers.user.id === user.id); // Check if user is already in array
							const newAmount = e.target.value; // Get new amount
							let newUsersArray = null; // Initialize new users array

							// Remove user if amount is 0.00
							if (newAmount === "0.00") {
								newUsersArray = usersArray.filter((addedUsers) => addedUsers.user.id !== user.id);
							}
							// Update existing user's amount
							else if (isUserInArray) {
								newUsersArray = usersArray.map((addedUsers) =>
									addedUsers.user.id === user.id ? { ...addedUsers, amount: newAmount } : addedUsers
								);
							}
							// Add new user
							else {
								newUsersArray = [...usersArray, { user: user, amount: newAmount }];
							}

							field?.onChange({
								value: {
									type: "Custom",
									users: newUsersArray,
								},
							});
						}}
					/>
				</div>
			</div>
		</>
	);
};

const UserCardPercentageSplit = ({
	user,
	field,
	getValues,
}: {
	user: IAllUsersTable;
	field: ControllerRenderProps<ICreateTransactionForm, "splitBy"> | undefined;
	getValues: UseFormGetValues<ICreateTransactionForm>;
}) => {
	return (
		<>
			<div className='flex flex-row items-center gap-6 justify-between'>
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

				<div className='flex flex-row items-center gap-2 min-w-[40%] max-w-[40%] justify-end'>
					<input
						type='number'
						className='input w-[79%] max-w-xs outline-none border-none bg-input-box-gray rounded-lg text-center font-semibold text-sm focus:outline-none focus:border-none focus:ring-0 h-full'
						onChange={(e) => {
							const usersArray = getValues().splitBy?.value.users || [];
							const isUserInArray = usersArray.some((addedUsers) => addedUsers.user.id === user.id);

							let newUsersArray = null;
							const newAmount = e.target.value;

							if (newAmount === "") {
								// Remove user if amount is 0.00
								newUsersArray = usersArray.filter((addedUsers) => addedUsers.user.id !== user.id);
							} else if (isUserInArray) {
								// Update existing user's amount
								newUsersArray = usersArray.map((addedUsers) =>
									addedUsers.user.id === user.id ? { ...addedUsers, amount: newAmount } : addedUsers
								);
							} else {
								// Add new user
								newUsersArray = [...usersArray, { user: user, amount: newAmount }];
							}

							field?.onChange({
								value: {
									type: "Percentage",
									users: newUsersArray,
								},
							});
						}}
					/>
					<span>%</span>
				</div>
			</div>
		</>
	);
};

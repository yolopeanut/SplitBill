import { ControllerRenderProps, UseFormGetValues } from "react-hook-form";

import { useState } from "react";
import FormValues from "../../../../../../../../../../core/interfaces/createTransactionForm";
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
	field: ControllerRenderProps<FormValues, "splitBy"> | undefined;
	selectedSplitType: string | undefined;
	getValues: UseFormGetValues<FormValues>;
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
	field: ControllerRenderProps<FormValues, "splitBy"> | undefined;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
	const [digits, setDigits] = useState([] as string[]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const event = e.nativeEvent as InputEvent;
		// console.log(event);

		if (event.inputType === "deleteContentBackward") {
			setDigits(digits.slice(0, -1));
		}

		if (event.data?.match(/\d/)) {
			setDigits([...digits, event.data]);
		}
	};

	// Format the display value
	const displayValue = (() => {
		if (digits.length === 0) return "0.00";
		if (digits.length <= 2) return `0.${digits.join("").padStart(2, "0")}`;
		if (digits.length > 2) {
			const wholePart = digits.slice(0, -2).join("") || "0"; // Get the whole part
			const decimalPart = digits.slice(-2).join(""); // Get the last two digits as decimal
			return `${wholePart}.${decimalPart}`; // Combine them
		}
	})();

	return (
		<div className='w-full'>
			<input
				type='text'
				value={displayValue}
				className='w-full h-full px-1 text-center font-semibold text-sm border-none outline-none rounded-lg bg-input-box-gray'
				inputMode='numeric'
				onChange={(e) => {
					onChange(e);
					handleChange(e);
				}}
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
	field: ControllerRenderProps<FormValues, "splitBy"> | undefined;
	getValues: UseFormGetValues<FormValues>;
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
	field: ControllerRenderProps<FormValues, "splitBy"> | undefined;
	getValues: UseFormGetValues<FormValues>;
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
							field?.onChange({
								value: {
									type: "Custom",
									users: getValues().splitBy?.value.users || [],
									unequal_split_amount: e.target.value,
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
	field: ControllerRenderProps<FormValues, "splitBy"> | undefined;
	getValues: UseFormGetValues<FormValues>;
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
						field?.onChange({
							value: {
								type: "Percentage",
								users: getValues().splitBy?.value.users || [],
								percentage_split_amount: e.target.value,
							},
						});
					}}
				/>
			</div>
		</>
	);
};

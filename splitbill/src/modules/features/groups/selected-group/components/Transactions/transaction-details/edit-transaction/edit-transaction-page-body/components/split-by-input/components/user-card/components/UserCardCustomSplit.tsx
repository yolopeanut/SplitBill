import { UseFormGetValues } from "react-hook-form";
import { ControllerRenderProps } from "react-hook-form";
import { IAllUsersTable } from "../../../../../../../../../../../../../core/interfaces/all_usersTable";
import { ICreateTransactionForm } from "../../../../../../../../../../../../../core/interfaces/createTransactionForm";
import NumericInput from "./NumericInput";
import { getInitials } from "../../../../../../../../../../../../../core/common/commonFunctions";

interface UserCardCustomSplitProps {
	user: IAllUsersTable;
	field: ControllerRenderProps<ICreateTransactionForm, "splitBy"> | undefined;
	getValues: UseFormGetValues<ICreateTransactionForm>;
	originalSplitBy: ICreateTransactionForm["splitBy"] | undefined;
}

const UserCardCustomSplit = ({
	user,
	field,
	getValues,
	originalSplitBy,
}: UserCardCustomSplitProps) => {
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
						initialValue={
							getValues().splitBy?.value.users.find(
								(selectedUsers) => selectedUsers.user.id === user.id
							)?.amount || 0 // Add default value of 0
						}
						onChange={(e) => {
							const usersArray = getValues().splitBy?.value.users || []; // Get all users
							const isUserInArray = usersArray.some((addedUsers) => addedUsers.user.id === user.id); // Check if user is already in array

							// Find the original transaction split ID from originalSplitBy
							const originalUserData = originalSplitBy?.value.users.find(
								(selectedUsers) => selectedUsers.user.id === user.id
							);

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
								newUsersArray = [
									...usersArray,
									{
										user: user,
										amount: newAmount,
										transaction_split_id: originalUserData?.transaction_split_id || null,
									},
								];
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

export default UserCardCustomSplit;

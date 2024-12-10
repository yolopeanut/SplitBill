import { ControllerRenderProps } from "react-hook-form";
import { UseFormGetValues } from "react-hook-form";
import { IEditUserForm } from "../../../../../../../../../../core/interfaces/editUserForm";
import { IAllUsersTable } from "../../../../../../../../../../core/interfaces/all_usersTable";
import { getInitials } from "../../../../../../../../../../core/common/commonFunctions";
import CheckBox from "../../../../../../../../../../core/common/components/CheckBox";

type UserCardProps = {
	user: IAllUsersTable;
	field: ControllerRenderProps<IEditUserForm, "users"> | undefined;
	getValues: UseFormGetValues<IEditUserForm>;
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
							const selectedUsersArray = getValues().users || [];
							const isUserSelected = selectedUsersArray?.some(
								(selectedUsers: IAllUsersTable) => selectedUsers.id === user.id
							);

							const newUsers = isUserSelected
								? selectedUsersArray.filter(
										(selectedUsers: IAllUsersTable) => selectedUsers.id !== user.id
								  ) // Remove user if already selected
								: [...selectedUsersArray, user]; // Add user if not selected

							// Update the field value with the new list of users
							field?.onChange(newUsers);
						}}
					/>
				)}
			</div>
		</>
	);
};

export default UserCard;

import { getInitials } from "../../../../../../../../../../../../core/common/commonFunctions";
import { IAllUsersTable } from "../../../../../../../../../../../../core/interfaces/all_usersTable";

interface IUserCardDefaultProps {
	user: IAllUsersTable;
}

const UserCardDefault = ({ user }: IUserCardDefaultProps) => {
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
				<span className='text-font-white text-sm font-semibold'>{user.name}</span>
			</div>
		</>
	);
};

export default UserCardDefault;

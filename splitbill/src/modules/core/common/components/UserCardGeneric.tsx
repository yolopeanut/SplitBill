import { IAllUsersTable } from "../../interfaces/all_usersTable";
import { getInitials } from "../commonFunctions";

interface UserCardGenericProps {
	userid: string;
	groupUsers: IAllUsersTable[] | undefined;
}

const UserCardGeneric = ({ userid, groupUsers }: UserCardGenericProps) => {
	const user = groupUsers?.find((user) => user.id === userid);
	return (
		<>
			<div className='flex flex-row gap-4 items-center '>
				<img
					alt='user'
					src={user?.profile_img_url || getInitials(user?.name || "")}
					className='w-10 h-10 rounded-full'
				/>
				<div className='flex flex-col max-w-44 min-w-44'>
					<span className='text-font-white font-bold leading-tight'>{user?.name}</span>
					<span className='text-font-text-gray text-sm'>@{user?.unique_username}</span>
				</div>
			</div>
		</>
	);
};

export default UserCardGeneric;

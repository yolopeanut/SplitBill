import { getInitials } from "../../../../../../core/common/commonFunctions";
import { IAllUsersTable } from "../../../../../../core/interfaces/all_usersTable";
import { useGroupsContext } from "../../../../hooks/useGroupsContext";

const UserCard = ({
	userId,
	groupUsers,
	totalOwed,
}: {
	userId: string;
	groupUsers: IAllUsersTable[] | null;
	totalOwed: number;
}) => {
	const { selectedGroup } = useGroupsContext();
	const currency = selectedGroup?.currency;
	if (!groupUsers || !userId) return null;

	const user = groupUsers?.find((user) => user.id === userId);
	if (!user) return null;

	return (
		<>
			<div className='flex flex-row items-center gap-2'>
				<img
					src={user.profile_img_url || getInitials(user.name)}
					alt={user.name}
					className='w-10 h-10 rounded-full'
				/>
				<div className='flex flex-col'>
					<TotalOwedSpan
						totalOwed={totalOwed}
						user={user}
						currency={currency || ""}
					/>
					<span className='text-font-text-gray text-sm'>@{user.unique_username}</span>
				</div>
			</div>
		</>
	);
};

const TotalOwedSpan = ({
	totalOwed,
	user,
	currency,
}: {
	totalOwed: number;
	user: IAllUsersTable;
	currency: string;
}) => {
	return (
		<>
			{totalOwed < 0 ? (
				<span>
					{user.name} owes{" "}
					<span className='text-font-red-owes inline font-bold'>
						{currency}
						{Math.abs(totalOwed).toFixed(2)}
					</span>{" "}
					in total
				</span>
			) : (
				<span>
					{user.name} is owed{" "}
					<span className='text-font-green-is-owed font-bold'>
						{currency}
						{Math.abs(totalOwed).toFixed(2)}
					</span>{" "}
					in total
				</span>
			)}
		</>
	);
};

export default UserCard;

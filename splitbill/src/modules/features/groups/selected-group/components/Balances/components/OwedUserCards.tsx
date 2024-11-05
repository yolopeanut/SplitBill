import { getInitials } from "../../../../../../core/common/commonFunctions";
import { IAllGroupsTable } from "../../../../../../core/interfaces/all_GroupsTable";
import { IAllUsersTable } from "../../../../../../core/interfaces/all_usersTable";

const OwedUserCards = ({
	owes_users,
	groupUsers,
	selectedGroup,
	userId,
}: {
	owes_users: Record<string, number>;
	groupUsers: IAllUsersTable[] | null;
	selectedGroup: IAllGroupsTable | null;
	userId: string;
}) => {
	const getUser = (userId: string) => {
		return groupUsers?.find((user) => user.id === userId);
	};

	const OwedUser = getUser(userId);

	return (
		<>
			<div className='px-10 flex flex-col gap-4 py-4'>
				{Object.entries(owes_users).map(([oweUserId, amount]) => (
					<div key={oweUserId}>
						<div className='flex flex-row items-center gap-2'>
							<img
								src={
									getUser(oweUserId)?.profile_img_url || getInitials(getUser(oweUserId)?.name || "")
								}
								alt={getUser(oweUserId)?.name || ""}
								className='w-9 h-9 rounded-full'
							/>
							<div>
								<OwedUserCard
									oweUserId={oweUserId}
									amount={amount}
									selectedGroup={selectedGroup}
									getUser={getUser}
									OwedUser={OwedUser}
								/>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default OwedUserCards;

const OwedUserCard = ({
	oweUserId,
	amount,
	selectedGroup,
	getUser,
	OwedUser,
}: {
	oweUserId: string;
	amount: number;
	selectedGroup: IAllGroupsTable | null;
	getUser: (userId: string) => IAllUsersTable | undefined;
	OwedUser: IAllUsersTable | undefined;
}) => {
	const owedUser = getUser(oweUserId);
	return (
		<>
			<div className='flex flex-col'>
				{amount > 0 ? (
					<span className='text-red-500 text-sm'>
						{owedUser?.name || ""} owes {OwedUser?.name}{" "}
						<span className='text-font-red-owes inline font-bold'>
							{selectedGroup?.currency}
							{Math.abs(amount).toFixed(2)}
						</span>{" "}
					</span>
				) : (
					<span className='text-green-500 text-sm'>
						{OwedUser?.name} owes {owedUser?.name}{" "}
						<span className='text-font-green-is-owed font-bold'>
							{selectedGroup?.currency}
							{Math.abs(amount).toFixed(2)}
						</span>{" "}
					</span>
				)}
				<span className='text-font-text-gray text-xs'>@{owedUser?.unique_username}</span>
				{/* 
				{amount < 0 ? (
					<span className='text-sm'>
						{owedUser?.name} owes{" "}
						<span className='text-font-red-owes inline font-bold'>
							{selectedGroup?.currency}
							{Math.abs(amount).toFixed(2)}
						</span>{" "}
						in total
					</span>
				) : (
					<span className='text-sm'>
						{owedUser?.name} is owed{" "}
						<span className='text-font-green-is-owed font-bold'>
							{selectedGroup?.currency}
							{Math.abs(amount).toFixed(2)}
						</span>{" "}
						in total
					</span>
				)} */}
			</div>
		</>
	);
};

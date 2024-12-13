import { getInitials } from "../../../../../../../core/common/commonFunctions";
import { IAllGroupsTable } from "../../../../../../../core/interfaces/all_GroupsTable";
import { IAllUsersTable } from "../../../../../../../core/interfaces/all_usersTable";
import OwedUserCard from "./components/OwedUserCard";

interface IOwedUserCardsProps {
	owes_users: Record<string, number>;
	groupUsers: IAllUsersTable[] | undefined;
	selectedGroup: IAllGroupsTable | null;
	userId: string;
}

const OwedUserCards = ({ owes_users, groupUsers, selectedGroup, userId }: IOwedUserCardsProps) => {
	const getUser = (userId: string) => {
		return groupUsers?.find((user) => user.id === userId);
	};

	const OwedUser = getUser(userId);

	return (
		<>
			<div className='px-10 flex flex-col gap-4 py-4'>
				{Object.entries(owes_users).map(([oweUserId, amount]) => {
					if (Math.round(amount * 100) === 0) return null;
					return (
						<div key={oweUserId}>
							<div className='flex flex-row items-center gap-2'>
								<img
									src={
										getUser(oweUserId)?.profile_img_url ||
										getInitials(getUser(oweUserId)?.name || "")
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
					);
				})}
			</div>
		</>
	);
};

export default OwedUserCards;

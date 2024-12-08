import { RiArrowUpSLine } from "react-icons/ri";
import OwedUserCards from "./OwedUserCards";
import UserCard from "./UserCard";
import { useState } from "react";
import { IAllGroupsTable } from "../../../../../../core/interfaces/all_GroupsTable";
import { getTotalOwed } from "../../../../../../core/common/commonFunctions";
import { IAllUsersTable } from "../../../../../../core/interfaces/all_usersTable";
import { IUserBalance } from "../../../../../../core/interfaces/user_balances";

const BalanceCard = ({
	userId,
	owes_users,
	groupUsers,
	selectedGroup,
}: {
	userId: string;
	owes_users: IUserBalance["owes_users"];
	groupUsers: IAllUsersTable[] | undefined;
	selectedGroup: IAllGroupsTable | null;
}) => {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<div
			key={userId}
			className='flex flex-col bg-background-gray p-2 rounded-lg'
		>
			<div className='flex flex-row justify-between items-center'>
				<UserCard
					userId={userId}
					groupUsers={groupUsers}
					totalOwed={getTotalOwed(owes_users)}
				/>
				<button
					onClick={() => setIsExpanded(!isExpanded)}
					className='bg-background-gray p-2 rounded-lg w-10 h-10'
				>
					<RiArrowUpSLine
						size={20}
						className={`transition-transform duration-200 ${!isExpanded ? "rotate-180" : ""}`}
					/>
				</button>
			</div>

			{isExpanded && (
				<OwedUserCards
					userId={userId}
					owes_users={owes_users}
					groupUsers={groupUsers}
					selectedGroup={selectedGroup}
				/>
			)}
		</div>
	);
};

export default BalanceCard;

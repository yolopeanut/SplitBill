import { useState } from "react";
import { getTotalOwed } from "../../../../../core/common/commonFunctions";
import Loading from "../../../../../core/common/components/Loading";
import { IAllGroupsTable } from "../../../../../core/interfaces/all_GroupsTable";
import { IAllUsersTable } from "../../../../../core/interfaces/all_usersTable";
import { IBalances, IUserBalance } from "../../../../../core/interfaces/user_balances";
import { useGroupsContext } from "../../../hooks/useGroupsContext";
import UserCard from "./components/UserCard";
import useGetBalances from "./hooks/useGetBalances";
import OwedUserCards from "./components/OwedUserCards";
import { RiArrowUpSLine } from "react-icons/ri";

const Balances = () => {
	const { selectedGroup, allTransactions, groupUsers } = useGroupsContext();
	const {
		userBalances,
		isLoading,
	}: { userBalances: IBalances["userBalances"]; isLoading: boolean } = useGetBalances({
		allTransactions,
		groupUsers,
	});

	if (!userBalances) return <div>No balances found</div>;

	// If loading, show loading
	if (isLoading) return <Loading />;

	// If not loading, show balances
	return (
		<div className='flex flex-col gap-4'>
			{Object.entries(userBalances).map(([userId, { owes_users }]) => (
				<BalanceCard
					key={userId}
					userId={userId}
					owes_users={owes_users}
					groupUsers={groupUsers}
					selectedGroup={selectedGroup}
				/>
			))}
		</div>
	);
};

export default Balances;

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

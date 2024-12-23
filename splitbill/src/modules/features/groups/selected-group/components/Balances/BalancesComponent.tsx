import Loading from "../../../../../core/common/components/Loading";
import { IBalances } from "../../../../../core/interfaces/user_balances";
import { useGroupsContext } from "../../../hooks/useGroupsContext";
import useGetBalances from "./hooks/useGetBalances";
import BalanceCard from "./components/BalanceCard";
import useAuthContext from "../../../../../core/auth/hooks/useAuthContext";
import { useState } from "react";

const Balances = () => {
	const { selectedGroup, allTransactions, groupUsers } = useGroupsContext();
	const { user } = useAuthContext();
	const {
		userBalances,
		isLoading,
	}: { userBalances: IBalances["userBalances"]; isLoading: boolean } = useGetBalances({
		allTransactions,
		groupUsers,
	});

	const [showAll, setShowAll] = useState(false);

	if (!userBalances) return <div>No balances found</div>;

	// If loading, show loading
	if (isLoading) return <Loading />;

	// If not loading, show balances

	// Sort balance entries to put current user first
	const sortedBalances = Object.entries(userBalances).sort(([userId]) =>
		userId === user?.id ? -1 : 1
	);

	// Separate current user's balance and others
	const [currentUserBalance, ...otherBalances] = sortedBalances;

	return (
		<div className='flex flex-col gap-4 h-[63vh] overflow-y-auto pb-40'>
			{/* Always show current user's balance */}
			{currentUserBalance && (
				<BalanceCard
					key={currentUserBalance[0]}
					userId={currentUserBalance[0]}
					owes_users={currentUserBalance[1].owes_users}
					groupUsers={groupUsers}
					selectedGroup={selectedGroup}
				/>
			)}

			{/* Show other balances based on showAll state */}
			{showAll ? (
				<>
					{otherBalances.map(([userId, { owes_users }]) => (
						<BalanceCard
							key={userId}
							userId={userId}
							owes_users={owes_users}
							groupUsers={groupUsers}
							selectedGroup={selectedGroup}
						/>
					))}
					<button
						onClick={() => setShowAll(false)}
						className='mt-2 text-blue-600 hover:text-blue-800 font-medium'
					>
						Hide Balances
					</button>
				</>
			) : (
				<button
					onClick={() => setShowAll(true)}
					className='mt-2 text-blue-600 hover:text-blue-800 font-medium'
				>
					Show More Balances ({otherBalances.length})
				</button>
			)}
		</div>
	);
};

export default Balances;

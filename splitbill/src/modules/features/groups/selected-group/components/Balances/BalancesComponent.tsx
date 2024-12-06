import Loading from "../../../../../core/common/components/Loading";
import { IBalances } from "../../../../../core/interfaces/user_balances";
import { useGroupsContext } from "../../../hooks/useGroupsContext";
import useGetBalances from "./hooks/useGetBalances";
import BalanceCard from "./components/BalanceCard";

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
		<div className='flex flex-col gap-4 h-[63vh] overflow-y-auto'>
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

import ExpenseCategory from "../../../../../core/enums/ExpenseCategoryEnum";
import { useNavigate, useParams } from "react-router-dom";
import { IAllTransactionsTable } from "../../../../../core/interfaces/all_transactionsTable";
import { useGroupsContext } from "../../../hooks/useGroupsContext";
import FloatingButton from "./components/FloatingButton";
import TransactionCard from "./components/transaction-card/TransactionCard";

interface GroupedTransactions {
	[key: string]: IAllTransactionsTable[];
}

const Transactions = () => {
	const navigate = useNavigate();
	const { groupId } = useParams();
	const { groupUsers, allTransactions } = useGroupsContext();

	const handleAddTransactionOnClick = () => {
		navigate(`/groups/${groupId}/create-transaction`);
	};

	const handleSettleUpOnClick = () => {
		navigate(`/groups/${groupId}/settle-up`);
	};

	const sortedTransaction = (allTransactions: IAllTransactionsTable[] | undefined) => {
		if (!allTransactions) return [];
		const sortedTransactions = allTransactions?.sort((a, b) => {
			return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
		});
		return sortedTransactions;
	};

	const groupTransactionsByDate = (transactions: IAllTransactionsTable[] | undefined) => {
		if (!transactions) return {};
		return transactions.reduce((groups: GroupedTransactions, transaction) => {
			const date = new Date(transaction.created_at);
			const formattedDate = `${date.toLocaleDateString()} - ${date.toLocaleDateString('en-US', { weekday: 'long' })}`;
			if (!groups[formattedDate]) {
				groups[formattedDate] = [];
			}
			groups[formattedDate].push(transaction);
			return groups;
		}, {});
	};

	const groupedSortedTransactions = groupTransactionsByDate(sortedTransaction(allTransactions));

	return (
		<div className='flex flex-col justify-start items-center gap-4 w-full h-[63vh] overflow-y-auto pb-40'>
			{Object.keys(groupedSortedTransactions).map((groupedDates) => {
				return (
					<div
						key={groupedDates}
						className='flex flex-col justify-start items-start gap-4 w-full'
					>
						<span className='text-font-white text-base font-semibold'>{groupedDates}</span>
						{groupedSortedTransactions[groupedDates].map((transaction) => {
							const paidBy = groupUsers?.find((user) => user.id === transaction.paid_by);
							return (
								<TransactionCard
									key={transaction.transaction_id}
									transactionId={transaction.transaction_id}
									groupId={groupId || ""}
									navigate={navigate}
									amount={transaction.total_amount}
									category={transaction.category as ExpenseCategory}
									paidBy={paidBy || undefined}
									title={transaction.trans_title || ""}
									remarks={transaction.remarks || ""}
									transactionSplits={transaction.transaction_splits}
									tax={transaction.tax}
								/>
							);
						})}
					</div>
				);
			})}
			{/* Add Transaction Floating Button */}
			<FloatingButton
				handleAddTransactionOnClick={handleAddTransactionOnClick}
				handleSettleUpOnClick={handleSettleUpOnClick}
			/>
		</div>
	);
};

export default Transactions;

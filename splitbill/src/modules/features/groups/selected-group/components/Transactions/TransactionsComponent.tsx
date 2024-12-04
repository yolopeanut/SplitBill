import ExpenseCategory from "../../../../../core/enums/ExpenseCategoryEnum";
import { useNavigate, useParams } from "react-router-dom";
import { IAllTransactionsTable } from "../../../../../core/interfaces/all_transactionsTable";
import { useGroupsContext } from "../../../hooks/useGroupsContext";
import FloatingButton from "./components/FloatingButton";
import TransactionCard from "./components/TransactionCard";

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
			const date = new Date(transaction.created_at).toLocaleDateString();
			if (!groups[date]) {
				groups[date] = [];
			}
			groups[date].push(transaction);
			return groups;
		}, {});
	};

	const groupedSortedTransactions = groupTransactionsByDate(sortedTransaction(allTransactions));

	return (
		<div className='flex flex-col justify-start items-center gap-4 w-full h-full'>
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
									paidBy={paidBy?.name || ""}
									title={transaction.trans_title || ""}
									remarks={transaction.remarks || ""}
								/>
							);
						})}
					</div>
				);
			})}
			{/* Add Transaction Floating Button */}
			<FloatingButton handleAddTransactionOnClick={handleAddTransactionOnClick} />
		</div>
	);
};

export default Transactions;

import { PiReceiptFill } from "react-icons/pi";
import ExpenseCategory from "../../../../../core/enums/ExpenseCategoryEnum";
import { expenseCategories } from "../../../../../core/constants/ExpenseCategories";
import { formatCurrency } from "../../../../../core/common/commonFunctions";
import { useNavigate, useParams } from "react-router-dom";
import { IAllTransactionsTable } from "../../../../../core/interfaces/all_transactionsTable";
import { useGroupsContext } from "../../../hooks/useGroupsContext";

const TransactionCard = ({
	amount,
	category,
	paidBy,
	title,
}: {
	amount: number;
	category: ExpenseCategory;
	paidBy: string;
	title: string;
}) => {
	const categoryData = expenseCategories.find((categories) => categories.label === category);
	const categoryIcon = categoryData?.icon;
	const categoryColor = categoryData?.color;
	return (
		<>
			<div className='flex flex-row justify-between items-center w-full gap-4'>
				<div className='flex flex-row items-center gap-4'>
					<div
						className='flex justify-center items-center rounded-full min-w-10 min-h-10 text-font-black'
						style={{ backgroundColor: categoryColor }}
					>
						{categoryIcon}
					</div>
					<div className='flex flex-col justify-center items-start h-10'>
						<span className='text-font-white text-lg font-semibold'>{title}</span>
						<span className='text-font-text-gray text-sm'>Paid by {paidBy}</span>
					</div>
				</div>

				<span className='text-font-white text-sm font-bold'>{formatCurrency(amount, "RM ")}</span>
			</div>
		</>
	);
};

const FloatingButton = ({
	handleAddTransactionOnClick,
}: {
	handleAddTransactionOnClick: () => void;
}) => {
	return (
		<div className='fixed bottom-28 right-7'>
			<button
				className='btn btn-sm bg-brand-orange rounded-full h-14 flex justify-center items-center text-font-black border-none'
				onClick={handleAddTransactionOnClick}
			>
				<PiReceiptFill size={30} />
			</button>
		</div>
	);
};

const Transactions = ({
	allTransactions,
}: {
	allTransactions: IAllTransactionsTable[] | undefined;
}) => {
	const navigate = useNavigate();
	const { groupId } = useParams();

	const handleAddTransactionOnClick = () => {
		navigate(`/groups/${groupId}/create-transaction`);
	};

	const { groupUsers } = useGroupsContext();
	return (
		<div className='flex flex-col justify-start items-center gap-4 w-full'>
			{sortedTransaction(allTransactions)?.map((transaction) => {
				const paidBy = groupUsers?.find((user) => user.id === transaction.paid_by);
				return (
					<TransactionCard
						key={transaction.transaction_id}
						amount={transaction.total_amount}
						category={transaction.category as ExpenseCategory}
						paidBy={paidBy?.name || ""}
						title={transaction.trans_title || ""}
					/>
				);
			})}
			<FloatingButton handleAddTransactionOnClick={handleAddTransactionOnClick} />
		</div>
	);
};

export default Transactions;

const sortedTransaction = (allTransactions: IAllTransactionsTable[] | undefined) => {
	const sortedTransactions = allTransactions?.sort((a, b) => {
		return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
	});
	return sortedTransactions;
};

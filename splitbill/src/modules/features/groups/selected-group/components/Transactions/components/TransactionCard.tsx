import { NavigateFunction } from "react-router-dom";
import { formatCurrency } from "../../../../../../core/common/commonFunctions";
import ExpenseCategory from "../../../../../../core/enums/ExpenseCategoryEnum";
import { expenseCategories } from "../../../../../../core/constants/ExpenseCategories";

const handleClickTransaction = (
	transactionId: string,
	groupId: string,
	navigate: NavigateFunction
) => {
	navigate(`/groups/${groupId}/transaction-details/${transactionId}`);
};

interface TransactionCardProps {
	transactionId: string;
	amount: number;
	category: ExpenseCategory;
	paidBy: string;
	title: string;
	remarks: string;
	groupId: string;
	navigate: NavigateFunction;
}

const TransactionCard = ({
	amount,
	category,
	paidBy,
	title,
	remarks,
	transactionId,
	groupId,
	navigate,
}: TransactionCardProps) => {
	const categoryData = expenseCategories.find(
		(categories) => categories.label === category
	);
	const categoryIcon = categoryData?.icon;
	const categoryColor = categoryData?.color;
	return (
		<>
			<div
				className='flex flex-row justify-between items-center w-full gap-4'
				onClick={() =>
					handleClickTransaction(transactionId, groupId, navigate)
				}>
				<div className='flex flex-row items-center gap-4 w-[70%]'>
					<div
						className={`flex justify-center items-center rounded-full min-w-10 min-h-10 text-font-white ${categoryColor}`}>
						{categoryIcon}
					</div>
					<div className='flex flex-col justify-center items-start w-[80%]'>
						<span className='text-font-white text-base font-semibold'>
							{title}
						</span>
						<span className='text-font-text-gray text-sm'>
							Paid by {paidBy}
						</span>
						{remarks && (
							<div className='overflow-x-auto whitespace-nowrap w-full text-xs text-font-text-gray'>
								Remarks: {remarks}
							</div>
						)}
					</div>
				</div>

				<span className='text-font-white text-sm font-bold w-[30%] text-right'>
					{formatCurrency(amount, "RM ")}
				</span>
			</div>
		</>
	);
};

export default TransactionCard;

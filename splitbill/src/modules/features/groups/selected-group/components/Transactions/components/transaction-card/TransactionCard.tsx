import { NavigateFunction } from "react-router-dom";
import { formatCurrency } from "../../../../../../../core/common/commonFunctions";
import ExpenseCategory from "../../../../../../../core/enums/ExpenseCategoryEnum";
import { useGroupsContext } from "../../../../../hooks/useGroupsContext";
import { ITransactionSplitsTable } from "../../../../../../../core/interfaces/all_transactionsTable";
import { IAllUsersTable } from "../../../../../../../core/interfaces/all_usersTable";
import useTransactionCard from "./hooks/useTransactionCard";

const handleClickTransaction = (
	transactionId: string,
	groupId: string,
	navigate: NavigateFunction
) => {
	navigate(`/groups/${groupId}/transaction-details/${transactionId}`);
};

interface ITransactionCardProps {
	transactionId: string;
	amount: number;
	category: ExpenseCategory;
	paidBy: IAllUsersTable | undefined;
	title: string;
	remarks: string;
	groupId: string;
	transactionSplits: ITransactionSplitsTable[];
	navigate: NavigateFunction;
	tax: number;
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
	transactionSplits,
	tax,
}: ITransactionCardProps) => {
	const { selectedGroup } = useGroupsContext();

	const { getTransactionColorAndSymbol, categoryIcon, categoryColor, getSplitAmountWithTax } =
		useTransactionCard({ transactionSplits, tax, category, paidBy, amount });

	const { transactionColor, transactionSymbol } = getTransactionColorAndSymbol();
	return (
		<>
			<div
				className='flex flex-row justify-between items-center w-full gap-4'
				onClick={() => handleClickTransaction(transactionId, groupId, navigate)}
			>
				<div className='flex flex-row items-center gap-4 w-[70%]'>
					<div
						className={`flex justify-center items-center rounded-full min-w-10 min-h-10 text-font-white ${categoryColor}`}
					>
						{categoryIcon}
					</div>
					<div className='flex flex-col justify-center items-start w-[80%]'>
						<span className='text-font-white text-base font-semibold'>{title}</span>
						<span className='text-font-text-gray text-sm w-full overflow-x-auto whitespace-wrap'>
							{paidBy?.name} paid{" "}
							<span className=' font-bold'>
								{formatCurrency(amount, selectedGroup?.currency || "RM")}
							</span>
						</span>
						{remarks && (
							<div className='overflow-x-auto whitespace-nowrap w-full text-xs text-font-text-gray'>
								Remarks: {remarks}
							</div>
						)}
					</div>
				</div>

				<span className={`text-sm font-bold w-[30%] text-right ${transactionColor}`}>
					{transactionSymbol}
					{formatCurrency(getSplitAmountWithTax(), selectedGroup?.currency || "RM")}
				</span>
			</div>
		</>
	);
};

export default TransactionCard;

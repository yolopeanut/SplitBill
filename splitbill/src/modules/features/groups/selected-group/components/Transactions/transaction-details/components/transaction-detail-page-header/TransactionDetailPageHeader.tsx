import { IAllTransactionsTable } from "../../../../../../../../core/interfaces/all_transactionsTable";
import { expenseCategories } from "../../../../../../../../core/constants/ExpenseCategories";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { truncateText } from "../../../../../../../../core/common/commonFunctions";
import DropdownComponent from "../transaction-detail-page-body/components/DropdownComponent";
import { useState } from "react";
import DeleteTransactionDrawer from "./components/DeleteTransactionDrawer";

interface TransactionDetailPageHeaderProps {
	data: IAllTransactionsTable | null | undefined;
}

const TransactionDetailPageHeader = ({ data }: TransactionDetailPageHeaderProps) => {
	const navigate = useNavigate();
	const { groupId } = useParams();

	const transactionTitle = truncateText(data?.trans_title || "", 20);
	const category = expenseCategories.find((category) => category.label === data?.category);
	const backgroundColor = category?.color;
	const categoryIcon = category?.icon;

	const [isDeleteTransactionDrawerOpen, setIsDeleteTransactionDrawerOpen] = useState(false);

	return (
		<>
			<div
				className={`flex flex-row justify-between items-center w-full min-h-24 ${backgroundColor} pl-4 relative`}
			>
				<button
					className='btn border-none p-0'
					onClick={() => {
						navigate(`/groups/${groupId}`);
					}}
				>
					<IoArrowBack
						size={24}
						className='text-font-white'
					/>
				</button>
				<div className='text-2xl font-bold pl-6 text-font-white'>{transactionTitle}</div>
				<div className='flex flex-row items-center'>
					<DropdownComponent
						editTransaction={() => {
							navigate(`/groups/${groupId}/edit-transaction/${data?.transaction_id}`);
						}}
						deleteTransaction={() => {
							setIsDeleteTransactionDrawerOpen(true);
						}}
					/>
				</div>

				<div className='absolute bottom-[-30px] left-7'>
					<div
						className={`flex justify-center items-center rounded-full min-w-14 min-h-14 text-font-white ${backgroundColor} drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]`}
					>
						{categoryIcon}
					</div>
				</div>
			</div>
			<DeleteTransactionDrawer
				isDeleteTransactionDrawerOpen={isDeleteTransactionDrawerOpen}
				setIsDeleteTransactionDrawerOpen={setIsDeleteTransactionDrawerOpen}
				selectedId={data?.transaction_id ?? ""}
			/>
		</>
	);
};

export default TransactionDetailPageHeader;

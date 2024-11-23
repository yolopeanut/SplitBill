import { IAllTransactionsTable } from "../../../../../../../core/interfaces/all_transactionsTable";
import { expenseCategories } from "../../../../../../../core/constants/ExpenseCategories";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import DropdownComponent from "./DropdownComponent";

interface TransactionDetailPageHeaderProps {
	data: IAllTransactionsTable | null | undefined;
}

const TransactionDetailPageHeader = ({ data }: TransactionDetailPageHeaderProps) => {
	const navigate = useNavigate();
	const { groupId } = useParams();

	const transactionTitle = data?.trans_title;
	const category = expenseCategories.find((category) => category.label === data?.category);
	const backgroundColor = category?.color;
	const categoryIcon = category?.icon;
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
						editGroup={() => {}}
						leaveGroup={() => {}}
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
		</>
	);
};

export default TransactionDetailPageHeader;

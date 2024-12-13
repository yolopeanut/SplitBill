import { Dispatch, SetStateAction } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useDeleteTransaction from "../hooks/useDeleteTransaction";
import CommonDrawer from "../../../../../../../../../core/common/components/CommonDrawer";
import { FaTrash } from "react-icons/fa6";

interface DeleteTransactionDrawerProps {
	setIsDeleteTransactionDrawerOpen: Dispatch<SetStateAction<boolean>>;
	isDeleteTransactionDrawerOpen: boolean;
	selectedId: string;
}

const DeleteTransactionDrawer = ({
	setIsDeleteTransactionDrawerOpen,
	isDeleteTransactionDrawerOpen,
	selectedId,
}: DeleteTransactionDrawerProps) => {
	const { deleteTransaction } = useDeleteTransaction();
	const navigate = useNavigate();
	const { groupId } = useParams();

	const handleDeleteTransaction = async () => {
		await deleteTransaction(selectedId);
		setIsDeleteTransactionDrawerOpen(false);
		navigate(`/groups/${groupId}`);
	};

	return (
		<CommonDrawer
			isOpen={isDeleteTransactionDrawerOpen}
			toggleDrawer={() => {
				setIsDeleteTransactionDrawerOpen(false);
			}}
		>
			<div className='flex flex-col items-center justify-center gap-8 w-full h-full'>
				<div className='text-center text-white text-2xl font-semibold flex flex-col items-center justify-center gap-2 w-full'>
					<FaTrash
						size={100}
						className='text-brand-orange'
					/>
					<div className='text-xl'>Delete transaction?</div>
				</div>
				<button
					className='btn bg-background-red-dark text-font-white w-[70%] outline-none border-none'
					onClick={handleDeleteTransaction}
					disabled={!selectedId}
				>
					Delete Transaction
				</button>
			</div>
		</CommonDrawer>
	);
};

export default DeleteTransactionDrawer;

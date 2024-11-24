import useAuthContext from "../../../../../../../../core/auth/hooks/useAuthContext";
import UserCardGeneric from "../../../../../../../../core/common/components/UserCardGeneric";
import { IAllTransactionsTable } from "../../../../../../../../core/interfaces/all_transactionsTable";
import { useGroupsContext } from "../../../../../../hooks/useGroupsContext";
import useTransactionDetails from "../../hooks/useTransactionDetails";
import NumericDetails from "./components/NumericDetailsComponent";
import SplitByUsersComponent from "./components/SplitByUsersComponent";

interface TransactionDetailPageBodyProps {
	data: IAllTransactionsTable | null | undefined;
}

const TransactionDetailPageBody = ({ data }: TransactionDetailPageBodyProps) => {
	const { paidBy, amount, tax, splitBy, getUserNetAmountOwed } = useTransactionDetails(data);
	const { groupUsers } = useGroupsContext();
	const { user } = useAuthContext();
	return (
		<>
			<div className='flex flex-col w-full p-4 gap-4 pb-32'>
				{/* Paid By */}
				<div className='flex flex-row gap-8 items-center w-full'>
					<div className='text-font-white font-bold'>Paid By</div>
					<UserCardGeneric
						userid={paidBy}
						groupUsers={groupUsers}
					/>
				</div>

				{/* Amount */}
				<NumericDetails
					divClassName='flex flex-row gap-7 items-center w-full'
					subDivClassName='flex justify-center bg-card-gray-dark rounded-lg px-4 py-[0.3rem] w-32 font-bold'
					spanClassName='font-bold'
					titleSpan={<span>Amount</span>}
					amount={amount}
				/>
				{/* Tax */}
				<NumericDetails
					divClassName='flex flex-row gap-16 items-center w-full'
					subDivClassName='flex justify-center bg-card-gray-dark rounded-lg px-4 py-[0.3rem] w-32 font-bold'
					spanClassName='font-bold'
					titleSpan={<span>Tax</span>}
					amount={tax}
				/>

				{/* Remarks */}
				<div className='text-font-white font-bold'>Remarks</div>

				<hr className='w-full border-font-white' />

				<div className='flex flex-row gap-8 items-center w-full'>
					<span className='text-font-white font-bold'>Split by</span>
					<div className='flex justify-center text-font-white outline outline-1 outline-brand-orange rounded-lg px-4 py-[0.3rem] w-32'>
						{splitBy}
					</div>
				</div>

				{/* User Card */}
				<SplitByUsersComponent
					splitByType={splitBy}
					splitByUsers={data?.transaction_splits || []}
					groupUsers={groupUsers || []}
					getUserNetAmountOwed={getUserNetAmountOwed}
				/>

				<hr className='w-full border-font-white' />

				{/* How much do I owe? (After tax) */}
				<NumericDetails
					divClassName='flex flex-row gap-8 items-center w-full justify-between'
					subDivClassName='bg-card-gray-dark rounded-lg px-4 py-[0.3rem] h-full w-32 flex items-center justify-center font-bold'
					spanClassName='font-bold'
					titleSpan={
						<span>
							How much do I owe? <br /> (After tax)
						</span>
					}
					amount={Number(getUserNetAmountOwed(user!.id))}
				/>
			</div>
		</>
	);
};

export default TransactionDetailPageBody;

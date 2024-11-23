import { IAllTransactionsTable } from "../../../../../../../core/interfaces/all_transactionsTable";
import NumericDetails from "./NumericDetailsComponent";

interface TransactionDetailPageBodyProps {
	data: IAllTransactionsTable | null | undefined;
}

const TransactionDetailPageBody = ({ data }: TransactionDetailPageBodyProps) => {
	const paidBy = data!.paid_by;
	const amount = data!.total_amount;
	const tax = data!.tax;
	const splitBy = data!.transaction_splits[0].split_type;

	console.log({ paidBy, amount, tax, splitBy });
	return (
		<>
			<div className='flex flex-col w-full p-4 gap-4'>
				{/* Paid By */}
				<div className='flex flex-row justify-between items-center w-full'>
					<div className='text-font-white font-bold'>Paid By</div>
					{/* <div className='text-font-white'>{paidBy}</div> */}
				</div>

				{/* Amount */}
				<NumericDetails
					divClassName='flex flex-row gap-7 items-center w-full'
					subDivClassName='flex justify-center bg-card-gray-dark rounded-lg px-4 py-[0.3rem] w-32'
					spanClassName='font-bold'
					titleSpan={<span>Amount</span>}
					amount={amount}
				/>
				{/* Tax */}
				<NumericDetails
					divClassName='flex flex-row gap-16 items-center w-full'
					subDivClassName='flex justify-center bg-card-gray-dark rounded-lg px-4 py-[0.3rem] w-32'
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
				<UserCards />

				<hr className='w-full border-font-white' />

				{/* How much do I owe? (After tax) */}
				<NumericDetails
					divClassName='flex flex-row gap-8 items-center w-full justify-between'
					subDivClassName='bg-card-gray-dark rounded-lg px-4 py-[0.3rem] h-full flex items-center'
					spanClassName='font-bold'
					titleSpan={
						<span>
							How much do I owe? <br /> (After tax)
						</span>
					}
					amount={tax}
				/>
			</div>
		</>
	);
};

const UserCards = () => {
	return <div className='text-font-white'>UserCards</div>;
};

export default TransactionDetailPageBody;

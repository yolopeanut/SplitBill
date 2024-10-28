import { UseFormRegister } from "react-hook-form";
import FormValues from "../../../../../../core/interfaces/createTransactionForm";
import ExpenseCategory from "../../../../../../core/enums/ExpenseCategoryEnum";

export const PaidByInput = ({ register }: { register: UseFormRegister<FormValues> }) => {
	return (
		<>
			{/* Paid By */}
			<div className='flex flex-col gap-2 w-full'>
				<span className='text-font-white text-sm font-semibold'>Paid By</span>
				<select
					className='select select-ghost w-full outline-none border-none bg-input-box-gray'
					{...register("paidBy")}
				>
					{Object.values(ExpenseCategory).map((category) => (
						<option
							key={category}
							value={category}
						>
							{category}
						</option>
					))}
				</select>
			</div>
		</>
	);
};

export default PaidByInput;

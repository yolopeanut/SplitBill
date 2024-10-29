import { UseFormRegister } from "react-hook-form";
import FormValues from "../../../../../../core/interfaces/createTransactionForm";
import ExpenseCategory from "../../../../../../core/enums/ExpenseCategoryEnum";

export const SplitByInput = ({ register }: { register: UseFormRegister<FormValues> }) => {
	return (
		<>
			{/* Split By */}
			<div className='flex flex-col gap-2 w-full pb-8'>
				<span className='text-font-white text-sm font-semibold'>Split By</span>
				<select
					className='select select-ghost w-full outline-none border-none bg-input-box-gray'
					{...register("splitBy")}
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

export default SplitByInput;

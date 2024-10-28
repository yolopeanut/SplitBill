import { UseFormRegister } from "react-hook-form";
import FormValues from "../../../../../../core/interfaces/createTransactionForm";
import ExpenseCategory from "../../../../../../core/enums/ExpenseCategoryEnum";

export const CategoryInput = ({ register }: { register: UseFormRegister<FormValues> }) => {
	return (
		<>
			{/* Category */}
			<div className='flex flex-col gap-2 w-full'>
				<span className='text-font-white text-sm font-semibold'>Category</span>
				<select
					className='select select-ghost w-full outline-none border-none bg-input-box-gray'
					{...register("category")}
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

export default CategoryInput;

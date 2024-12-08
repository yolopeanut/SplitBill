import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ICreateTransactionForm } from "../../../../../../../../../../core/interfaces/createTransactionForm";

interface TitleInputProps {
	register: UseFormRegister<ICreateTransactionForm>;
	errors: FieldErrors<ICreateTransactionForm>;
}

export const TitleInput = ({ register, errors }: TitleInputProps) => {
	return (
		<>
			{/* Title */}
			<div className='flex flex-col gap-2 pb-4'>
				<span className='text-font-white text-sm font-semibold'>Title</span>
				<input
					type='text'
					className='input w-full bg-input-box-gray outline-none border-none placeholder:text-font-text-gray'
					placeholder='Expense Title'
					{...register("title", {
						required: "Title is required",
					})}
				/>
				{errors.title && <span className='text-font-red text-sm'>{errors.title.message}</span>}
			</div>
		</>
	);
};

export default TitleInput;

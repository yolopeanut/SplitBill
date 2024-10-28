import { UseFormRegister } from "react-hook-form";
import FormValues from "../../../../../../core/interfaces/createTransactionForm";

export const TitleInput = ({ register }: { register: UseFormRegister<FormValues> }) => {
	return (
		<>
			{/* Title */}
			<div className='flex flex-col gap-2'>
				<span className='text-font-white text-sm font-semibold'>Title</span>
				<input
					type='text'
					className='input w-full bg-input-box-gray outline-none border-none'
					placeholder='Expense Title'
					{...register("title")}
				/>
			</div>
		</>
	);
};

export default TitleInput;

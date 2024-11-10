import { UseFormRegister } from "react-hook-form";
import { ICreateTransactionForm } from "../../../../../../../../core/interfaces/createTransactionForm";

export const TitleInput = ({ register }: { register: UseFormRegister<ICreateTransactionForm> }) => {
	return (
		<>
			{/* Title */}
			<div className='flex flex-col gap-2 pb-4'>
				<span className='text-font-white text-sm font-semibold'>Title</span>
				<input
					type='text'
					className='input w-full bg-input-box-gray outline-none border-none placeholder:text-font-text-gray'
					placeholder='Expense Title'
					{...register("title")}
				/>
			</div>
		</>
	);
};

export default TitleInput;

import { UseFormRegister } from "react-hook-form";
import FormValues from "../../../../../../../../core/interfaces/createTransactionForm";
export const RemarksInput = ({ register }: { register: UseFormRegister<FormValues> }) => {
	return (
		<>
			{/* Remarks */}
			<div className='flex flex-col gap-2 pb-4'>
				<span className='text-font-white text-sm font-semibold'>Remarks</span>
				<textarea
					className='textarea w-full bg-input-box-gray outline-none border-none focus:outline-none focus:border-none'
					placeholder='Remarks'
					{...register("remarks")}
				/>
			</div>
		</>
	);
};

export default RemarksInput;

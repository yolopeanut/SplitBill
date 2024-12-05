import { UseFormGetValues, UseFormRegister, FieldErrors } from "react-hook-form";
import { IoIosCalculator } from "react-icons/io";
import { ICreateTransactionForm } from "../../../../../../../../../../core/interfaces/createTransactionForm";
import { useGroupsContext } from "../../../../../../../../hooks/useGroupsContext";
import NumericInput from "./components/NumericInput";

interface IAmountInputProps {
	register: UseFormRegister<ICreateTransactionForm>;
	getValues: UseFormGetValues<ICreateTransactionForm>;
	errors: FieldErrors<ICreateTransactionForm>;
}

export const AmountInput = ({ register, getValues, errors }: IAmountInputProps) => {
	const { selectedGroup } = useGroupsContext();

	return (
		<>
			<div className='flex flex-col gap-2 pb-4'>
				{/* Amount */}
				<span className='text-font-white text-sm font-semibold'>Amount</span>
				<div className='flex flex-row gap-2'>
					<div className='flex flex-col justify-center pl-4 w-[35%] max-w-xs outline-none border-none bg-input-box-gray rounded-lg max-h-14'>
						<span className='text-font-white'>{selectedGroup?.currency}</span>
					</div>
					<NumericInput
						register={register}
						inputKey='amount'
						defaultValue={getValues("amount") || 0}
						errors={errors}
					/>

					<button
						className='btn border-none p-0'
						type='button'
					>
						<IoIosCalculator
							size={30}
							className='text-brand-orange'
						/>
					</button>
				</div>

				{/* Tax */}
				<div className='flex flex-row gap-2'>
					<div className='flex flex-col justify-center pl-4 w-[35%] max-w-xs outline-none border-none bg-input-box-gray rounded-lg'>
						<span className='text-font-white'>Tax</span>
					</div>
					<NumericInput
						register={register}
						inputKey='tax'
						defaultValue={getValues("tax") || 0}
						errors={errors}
					/>
					<button
						className='btn border-none p-0'
						type='button'
					>
						<IoIosCalculator
							size={30}
							className='text-brand-orange'
						/>
					</button>
				</div>
			</div>
		</>
	);
};

export default AmountInput;

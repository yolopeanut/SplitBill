import { FieldErrors, UseFormRegister } from "react-hook-form";
import { IoIosCalculator } from "react-icons/io";
import { ICreateTransactionForm } from "../../../../../../../../core/interfaces/createTransactionForm";
import { useGroupsContext } from "../../../../../../hooks/useGroupsContext";
import NumericInput from "./components/NumericInput";

interface AmountInputProps {
	register: UseFormRegister<ICreateTransactionForm>;
	errors: FieldErrors<ICreateTransactionForm>;
}

export const AmountInput = ({ register, errors }: AmountInputProps) => {
	const { selectedGroup } = useGroupsContext();
	return (
		<>
			{/* Amount */}
			<div className='flex flex-col gap-2 pb-4'>
				<span className='text-font-white text-sm font-semibold'>Amount</span>
				<div className='flex flex-row gap-2'>
					<div className='flex flex-col justify-center pl-4 w-[35%] max-w-xs outline-none border-none bg-input-box-gray rounded-lg max-h-14'>
						<span className='text-font-white'>{selectedGroup?.currency}</span>
					</div>
					<NumericInput
						register={register}
						inputKey='amount'
						errors={errors}
						isZeroAllowed={false}
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

				<div className='flex flex-row gap-2'>
					<div className='flex flex-col justify-center pl-4 w-[35%] max-w-xs outline-none border-none bg-input-box-gray rounded-lg max-h-14'>
						<span className='text-font-white'>Tax</span>
					</div>
					<NumericInput
						register={register}
						inputKey='tax'
						errors={errors}
						isZeroAllowed={true}
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

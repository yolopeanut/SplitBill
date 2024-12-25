import { useState } from "react";
import { Control, FieldErrors, UseFormSetValue } from "react-hook-form";
import { IoIosCalculator } from "react-icons/io";
import { ICreateTransactionForm } from "../../../../../../../../core/interfaces/createTransactionForm";
import { useGroupsContext } from "../../../../../../hooks/useGroupsContext";
import NumericInput from "./components/NumericInput";
import Calculator from "../../../../../../../../core/common/components/Calculator";

interface AmountInputProps {
	control: Control<ICreateTransactionForm>;
	setValue: UseFormSetValue<ICreateTransactionForm>;
	errors: FieldErrors<ICreateTransactionForm>;
}

const AmountInput = ({ control, setValue, errors }: AmountInputProps) => {
	const { selectedGroup } = useGroupsContext();
	const [isAmountCalculatorOpen, setIsAmountCalculatorOpen] = useState(false);
	const [isTaxCalculatorOpen, setIsTaxCalculatorOpen] = useState(false);

	return (
		<>
			<div className='flex flex-col gap-2'>
				<span className='text-font-white text-sm font-semibold'>Amount</span>
				<div className='flex flex-row gap-2 items-center'>
					<div className='flex flex-col justify-center pl-4 min-w-[30%] max-w-[30%] outline-none border-none bg-input-box-gray rounded-lg min-h-14 max-h-14'>
						<span className='text-font-white'>{selectedGroup?.currency}</span>
					</div>
					<div className='flex flex-row gap-2 items-center'>
						<NumericInput
							control={control}
							name='amount'
							isZeroAllowed={false}
						/>
					</div>
					<button
						className='btn border-none p-0'
						type='button'
						onClick={() => {
							setIsAmountCalculatorOpen(true);
						}}
					>
						<IoIosCalculator
							size={30}
							className='text-brand-orange'
						/>
					</button>
				</div>

				{errors.amount && <span className='text-font-red text-sm'>{errors.amount.message}</span>}

				<div className='flex flex-row gap-2 items-center'>
					<div className='flex flex-col justify-center pl-4 min-w-[30%] max-w-[30%] outline-none border-none bg-input-box-gray rounded-lg min-h-14 max-h-14'>
						<span className='text-font-white'>Tax</span>
					</div>
					<NumericInput
						control={control}
						name='tax'
						isZeroAllowed={true}
						isRequired={false}
					/>
					<button
						className='btn border-none p-0'
						type='button'
						onClick={() => {
							setIsTaxCalculatorOpen(true);
						}}
					>
						<IoIosCalculator
							size={30}
							className='text-brand-orange'
						/>
					</button>
				</div>
			</div>
			<Calculator
				isOpen={isAmountCalculatorOpen}
				onClose={() => setIsAmountCalculatorOpen(false)}
				name='amount'
				setValue={setValue}
			/>
			<Calculator
				isOpen={isTaxCalculatorOpen}
				onClose={() => setIsTaxCalculatorOpen(false)}
				name='tax'
				setValue={setValue}
			/>
		</>
	);
};

export default AmountInput;

import { useState } from "react";
import { Control, FieldErrors, UseFormSetValue } from "react-hook-form";
import { IoIosCalculator } from "react-icons/io";
import { ICreateTransactionForm } from "../../../../../../../../../../core/interfaces/createTransactionForm";
import { useGroupsContext } from "../../../../../../../../hooks/useGroupsContext";
import NumericInput from "./components/NumericInput";
import Calculator from "../../../../../../../../../../core/common/components/Calculator";

interface IAmountInputProps {
	control: Control<ICreateTransactionForm>;
	setValue: UseFormSetValue<ICreateTransactionForm>;
	errors: FieldErrors<ICreateTransactionForm>;
}

export const AmountInput = ({ control, setValue, errors }: IAmountInputProps) => {
	const { selectedGroup } = useGroupsContext();
	const [isAmountCalculatorOpen, setIsAmountCalculatorOpen] = useState(false);
	const [isTaxCalculatorOpen, setIsTaxCalculatorOpen] = useState(false);

	return (
		<>
			<div className='flex flex-col gap-2 pb-4'>
				<span className='text-font-white text-sm font-semibold'>Amount</span>
				<div className='flex flex-row gap-2'>
					<div className='flex flex-col justify-center pl-4 w-[35%] max-w-xs outline-none border-none bg-input-box-gray rounded-lg max-h-14'>
						<span className='text-font-white'>{selectedGroup?.currency}</span>
					</div>
					<NumericInput
						control={control}
						name='amount'
						isZeroAllowed={false}
					/>
					<button
						className='btn border-none p-0'
						type='button'
						onClick={() => setIsAmountCalculatorOpen(true)}
					>
						<IoIosCalculator
							size={30}
							className='text-brand-orange'
						/>
					</button>
				</div>
				{errors.amount && <span className='text-font-red text-sm'>{errors.amount.message}</span>}

				<div className='flex flex-row gap-2'>
					<div className='flex flex-col justify-center pl-4 w-[35%] max-w-xs outline-none border-none bg-input-box-gray rounded-lg'>
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
						onClick={() => setIsTaxCalculatorOpen(true)}
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

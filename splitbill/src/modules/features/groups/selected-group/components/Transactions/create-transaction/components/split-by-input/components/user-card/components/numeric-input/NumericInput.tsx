import { useState } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { ICreateTransactionForm } from "../../../../../../../../../../../../core/interfaces/createTransactionForm";
import { IoIosCalculator } from "react-icons/io";
import Calculator from "../../../../../../../../../../../../core/common/components/Calculator";

interface INumericInputProps {
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	field: ControllerRenderProps<ICreateTransactionForm, "splitBy"> | undefined;
	value: string;
}

const NumericInput = ({ onChange, value }: INumericInputProps) => {
	const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

	const handleCalculatorResult = (calculatedValue: string) => {
		// Create a synthetic event to match the expected onChange format
		const event = {
			target: { value: calculatedValue },
		} as React.ChangeEvent<HTMLInputElement>;

		handleChange(event);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const numericValue = e.target.value.replace(/[^\d]/g, "");
		const floatValue = parseFloat(numericValue) / 100;
		const formattedValue = floatValue.toFixed(2);

		e.target.value = formattedValue;
		onChange(e);
	};

	return (
		<div className='w-full flex flex-row gap-2 items-center'>
			<input
				type='text'
				value={value}
				className='w-full h-full px-1 text-center font-semibold text-sm border-none outline-none rounded-lg bg-input-box-gray'
				inputMode='numeric'
				onChange={handleChange}
			/>
			<button
				className='btn border-none p-0'
				type='button'
				onClick={() => {
					setIsCalculatorOpen(true);
				}}
			>
				<IoIosCalculator
					size={30}
					className='text-brand-orange'
				/>
			</button>
			<Calculator
				isOpen={isCalculatorOpen}
				onClose={() => setIsCalculatorOpen(false)}
				onCalculate={handleCalculatorResult}
			/>
		</div>
	);
};

export default NumericInput;

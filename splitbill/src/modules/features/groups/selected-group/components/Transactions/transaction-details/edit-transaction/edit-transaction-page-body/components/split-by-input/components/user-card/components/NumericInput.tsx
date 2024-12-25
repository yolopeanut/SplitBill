import { useState } from "react";
import { IoIosCalculator } from "react-icons/io";
import Calculator from "../../../../../../../../../../../../../core/common/components/Calculator";

interface NumericInputProps {
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	initialValue: number | undefined;
}

const NumericInput = ({ onChange, initialValue }: NumericInputProps) => {
	const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
	// Convert initialValue to a valid number or use 0
	const [value, setValue] = useState(() => {
		if (typeof initialValue === "number" && !isNaN(initialValue)) {
			return initialValue.toFixed(2);
		}
		return "0.00";
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const numericValue = e.target.value.replace(/[^\d]/g, "");
		const floatValue = parseFloat(numericValue) / 100;
		const formattedValue = floatValue.toFixed(2);

		setValue(formattedValue);
		e.target.value = formattedValue;
		onChange(e);
	};

	const handleCalculatorResult = (calculatedValue: string) => {
		const event = {
			target: { value: calculatedValue },
		} as React.ChangeEvent<HTMLInputElement>;

		setValue(calculatedValue);
		onChange(event);
		setIsCalculatorOpen(false);
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
				onClick={() => setIsCalculatorOpen(true)}
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

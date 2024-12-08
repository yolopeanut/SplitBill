import { useState } from "react";

interface NumericInputProps {
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	initialValue: number | undefined;
}

const NumericInput = ({ onChange, initialValue }: NumericInputProps) => {
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

	return (
		<div className='w-full'>
			<input
				type='text'
				value={value}
				className='w-full h-full px-1 text-center font-semibold text-sm border-none outline-none rounded-lg bg-input-box-gray'
				inputMode='numeric'
				onChange={handleChange}
			/>
		</div>
	);
};

export default NumericInput;

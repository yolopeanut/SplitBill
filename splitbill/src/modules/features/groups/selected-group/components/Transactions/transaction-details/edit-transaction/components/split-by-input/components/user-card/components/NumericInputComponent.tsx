import { useState } from "react";

const cleanValue = (value: string) => {
	// Remove all non-numeric and non-decimal characters
	const cleanedValue = value.replace(/[^\d.]/g, "");
	const numericValue = parseFloat(cleanedValue);
	return numericValue.toFixed(2);
};
interface NumericInputProps {
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	initialValue?: string;
}

const NumericInput = ({ onChange, initialValue = "0.00" }: NumericInputProps) => {
	const [value, setValue] = useState(cleanValue(initialValue));

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const formattedValue = cleanValue(e.target.value);

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

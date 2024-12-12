import { useEffect, useState } from "react";

interface INumericInput {
	value: number;
	onChange: (value: number) => void;
	error?: string;
}

const NumericInput = ({ value, onChange, error }: INumericInput) => {
	// Convert the number to a string with proper padding
	const formatNumberToDigits = (num: number) => {
		const numericValue = Number(num);
		if (isNaN(numericValue)) return ["0", "0", "0"];
		if (numericValue === 0) return ["0", "0", "0"];
		return numericValue
			.toFixed(2)
			.replace(".", "")
			.padStart(3, "0")
			.split("")
			.filter((char) => /\d/.test(char));
	};

	const [digits, setDigits] = useState(() => formatNumberToDigits(value));

	useEffect(() => {
		setDigits(formatNumberToDigits(value));
	}, [value]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const event = e.nativeEvent as InputEvent;
		let newDigits = [...digits];

		if (event.inputType === "deleteContentBackward") {
			newDigits = digits.slice(0, -1);
		}

		if (event.data?.match(/\d/)) {
			newDigits = [...digits, event.data];
		}

		setDigits(newDigits);
		// Convert digits to number and call parent onChange
		const numericValue = parseFloat(
			newDigits.length <= 2
				? `0.${newDigits.join("").padStart(2, "0")}`
				: `${newDigits.slice(0, -2).join("")}.${newDigits.slice(-2).join("")}`
		);
		onChange(numericValue);
	};

	// Format the display value
	const displayValue = (() => {
		if (digits.length === 0) return "0.00";
		if (digits.length <= 2) {
			// Always pad with zeros to ensure format like "0.XX"
			return `0.${digits.join("").padStart(2, "0")}`;
		}
		const wholePart = digits.slice(0, -2).join(""); // Get the whole part
		const decimalPart = digits.slice(-2).join(""); // Get the last two digits as decimal
		return `${wholePart}.${decimalPart}`; // Combine them
	})();

	return (
		<div className='w-full flex flex-col gap-2'>
			<input
				type='text'
				value={displayValue}
				className='w-full h-full px-4 text-center font-semibold text-xl border-none outline-none rounded-lg bg-input-box-gray min-h-14'
				inputMode='numeric'
				onChange={handleChange}
			/>
			{error && <span className='text-font-red text-sm'>{error}</span>}
		</div>
	);
};

export default NumericInput;

import { useEffect, useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ICreateTransactionForm } from "../../../../../../../../../../../core/interfaces/createTransactionForm";

interface INumericInput {
	register: UseFormRegister<ICreateTransactionForm>;
	inputKey: keyof ICreateTransactionForm;
	defaultValue: number;
	errors: FieldErrors<ICreateTransactionForm>;
}

const NumericInput = ({ register, inputKey, defaultValue, errors }: INumericInput) => {
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

	const [digits, setDigits] = useState(() => formatNumberToDigits(defaultValue));

	useEffect(() => {
		setDigits(formatNumberToDigits(defaultValue));
	}, [defaultValue]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const event = e.nativeEvent as InputEvent;

		if (event.inputType === "deleteContentBackward") {
			setDigits(digits.slice(0, -1));
		}

		if (event.data?.match(/\d/)) {
			setDigits([...digits, event.data]);
		}
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
				{...register(inputKey, {
					onChange: handleChange,
					required: "Amount is required",
					validate: (value) => {
						if (value === "0.00") return "Amount cannot be 0.00";
						return true;
					},
				})}
			/>
			{errors[inputKey] && (
				<span className='text-font-red text-sm'>{errors[inputKey].message}</span>
			)}
		</div>
	);
};

export default NumericInput;

import { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ICreateTransactionForm } from "../../../../../../../../../core/interfaces/createTransactionForm";

interface NumericInputProps {
	register: UseFormRegister<ICreateTransactionForm>;
	inputKey: keyof ICreateTransactionForm;
	errors: FieldErrors<ICreateTransactionForm>;
	isZeroAllowed?: boolean;
}

const NumericInput = ({ register, inputKey, errors, isZeroAllowed = false }: NumericInputProps) => {
	const [digits, setDigits] = useState([] as string[]);

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
		if (digits.length <= 2) return `0.${digits.join("").padStart(2, "0")}`;
		if (digits.length > 2) {
			const wholePart = digits.slice(0, -2).join("") || "0"; // Get the whole part
			const decimalPart = digits.slice(-2).join(""); // Get the last two digits as decimal
			return `${wholePart}.${decimalPart}`; // Combine them
		}
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
						if (value === "0.00" && !isZeroAllowed) return "Amount cannot be 0.00";
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

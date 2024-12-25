import { useState } from "react";
import { Control, Controller } from "react-hook-form";
import { ICreateTransactionForm } from "../../../../../../../../../core/interfaces/createTransactionForm";

interface NumericInputProps {
	control: Control<ICreateTransactionForm>;
	name: keyof ICreateTransactionForm;
	isZeroAllowed?: boolean;
}

const NumericInput = ({ control, name, isZeroAllowed = false }: NumericInputProps) => {
	const [digits, setDigits] = useState([] as string[]);

	const handleChange =
		(onChange: (value: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
			const event = e.nativeEvent as InputEvent;

			// Handle calculator input
			if (typeof e.target.value === "string" && e.target.value.includes(".")) {
				const numValue = parseFloat(e.target.value) * 100;
				const newDigits = Math.round(numValue).toString().split("");
				setDigits(newDigits);
				onChange(e.target.value);
				return;
			}

			// Handle regular input
			if (event.inputType === "deleteContentBackward") {
				const newDigits = digits.slice(0, -1);
				setDigits(newDigits);
				onChange(formatValue(newDigits));
			}

			if (event.data?.match(/\d/)) {
				const newDigits = [...digits, event.data];
				setDigits(newDigits);
				onChange(formatValue(newDigits));
			}
		};

	const formatValue = (digits: string[]) => {
		if (digits.length === 0) return "0.00";
		if (digits.length <= 2) return `0.${digits.join("").padStart(2, "0")}`;
		const wholePart = digits.slice(0, -2).join("") || "0";
		const decimalPart = digits.slice(-2).join("");
		return `${wholePart}.${decimalPart}`;
	};

	return (
		<Controller
			control={control}
			name={name}
			rules={{
				required: "Amount is required",
				validate: (value) => {
					if (value === "0.00" && !isZeroAllowed) return "Amount cannot be 0.00";
					return true;
				},
			}}
			render={({ field, fieldState: { error } }) => (
				<div className='w-full flex flex-col gap-2'>
					<input
						type='text'
						value={formatValue(digits)}
						onChange={handleChange(field.onChange)}
						className='w-full h-full px-4 text-center font-semibold text-xl border-none outline-none rounded-lg bg-input-box-gray min-h-14'
						inputMode='numeric'
					/>
					{error && <span className='text-font-red text-sm'>{error.message}</span>}
				</div>
			)}
		/>
	);
};

export default NumericInput;

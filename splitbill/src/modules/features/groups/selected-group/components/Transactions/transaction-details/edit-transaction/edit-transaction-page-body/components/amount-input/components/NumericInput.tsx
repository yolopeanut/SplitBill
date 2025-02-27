import { useEffect, useState } from "react";
import { Control, Controller, useWatch } from "react-hook-form";
import { ICreateTransactionForm } from "../../../../../../../../../../../core/interfaces/createTransactionForm";

interface NumericInputProps {
	control: Control<ICreateTransactionForm>;
	name: keyof ICreateTransactionForm;
	isZeroAllowed?: boolean;
	isRequired?: boolean;
}

const NumericInput = ({
	control,
	name,
	isZeroAllowed = false,
	isRequired = true,
}: NumericInputProps) => {
	const [digits, setDigits] = useState([] as string[]);

	// Watch for external value changes (from calculator)
	const value = useWatch({
		control,
		name,
	});

	useEffect(() => {
		if (value) {
			const numValue = parseFloat(value.toString()) * 100;
			const newDigits = Math.round(numValue).toString().split("");
			setDigits(newDigits);
		}
	}, [value]);

	const handleChange =
		(onChange: (value: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
			const event = e.nativeEvent as InputEvent;

			if (event.inputType === "deleteContentBackward") {
				const newDigits = digits.slice(0, -1);
				setDigits(newDigits);
				onChange(formatValue(newDigits));
				return;
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
				required: isRequired
					? {
							value: true,
							message: `${name.charAt(0).toUpperCase() + name.slice(1)} is required`,
					  }
					: false,
				validate: (value) => {
					if (!isZeroAllowed && value === "0.00") {
						return `${name.charAt(0).toUpperCase() + name.slice(1)} cannot be 0.00`;
					}
					return true;
				},
			}}
			render={({ field }) => (
				<div className='w-full flex flex-col gap-2'>
					<input
						type='text'
						value={formatValue(digits)}
						onChange={handleChange(field.onChange)}
						className='w-full h-full px-4 text-center font-semibold text-xl border-none outline-none rounded-lg bg-input-box-gray min-h-14'
						inputMode='numeric'
					/>
				</div>
			)}
		/>
	);
};

export default NumericInput;

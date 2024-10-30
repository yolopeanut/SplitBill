import React, { useState } from "react";
import { UseFormRegister } from "react-hook-form";

import { IoIosCalculator } from "react-icons/io";
import FormValues from "../../../../../../../../core/interfaces/createTransactionForm";
import Currencies from "../../../../../../../../core/enums/CurrenciesEnum";

const NumericInput = ({
	register,
	inputKey,
}: {
	register: UseFormRegister<FormValues>;
	inputKey: keyof FormValues;
}) => {
	const [digits, setDigits] = useState([] as string[]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const event = e.nativeEvent as InputEvent;
		console.log(event);

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
		<div className='w-full'>
			<input
				type='text'
				value={displayValue}
				className='w-full h-full px-4 text-center font-semibold text-xl border-none outline-none rounded-lg bg-input-box-gray'
				inputMode='numeric'
				{...register(inputKey, { onChange: handleChange })}
			/>
		</div>
	);
};

export const AmountInput = ({ register }: { register: UseFormRegister<FormValues> }) => {
	return (
		<>
			{/* Amount */}
			<div className='flex flex-col gap-2 pb-4'>
				<span className='text-font-white text-sm font-semibold'>Amount</span>
				<div className='flex flex-row gap-2'>
					<select
						className='select select-ghost w-[30%] max-w-xs outline-none border-none bg-input-box-gray'
						{...register("currency")}
					>
						{Object.values(Currencies).map((currency) => (
							<option
								key={currency}
								value={currency}
							>
								{currency}
							</option>
						))}
					</select>
					<NumericInput
						register={register}
						inputKey='amount'
					/>

					<button
						className='btn border-none p-0'
						type='button'
					>
						<IoIosCalculator
							size={30}
							className='text-brand-orange'
						/>
					</button>
				</div>

				<div className='flex flex-row gap-2'>
					<div className='flex flex-col justify-center pl-4 w-[35%] max-w-xs outline-none border-none bg-input-box-gray rounded-lg'>
						<span className='text-font-white'>Tax</span>
					</div>
					<NumericInput
						register={register}
						inputKey='tax'
					/>
					<button
						className='btn border-none p-0'
						type='button'
					>
						<IoIosCalculator
							size={30}
							className='text-brand-orange'
						/>
					</button>
				</div>
			</div>
		</>
	);
};

export default AmountInput;

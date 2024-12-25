import { useMemo, useRef, useState } from "react";
import { UseFormSetValue } from "react-hook-form";

interface CalculatorProps {
	isOpen: boolean;
	onClose: () => void;
	name?: string;
	onCalculate?: (value: string) => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setValue?: UseFormSetValue<any>;
}

const Calculator = ({ isOpen, onClose, name, onCalculate, setValue }: CalculatorProps) => {
	const [calculatorInputValue, setCalculatorInputValue] = useState("0");
	const inputRef = useRef<HTMLInputElement>(null);

	const isSingleNumber = useMemo(() => {
		return !/[+\-×/]/.test(calculatorInputValue);
	}, [calculatorInputValue]);

	if (!isOpen) return null;

	// Check if the current input is a single number (no operators)

	const handleNumberClick = (num: string) => {
		const input = inputRef.current;
		if (!input) return;

		const selectionStart = input.selectionStart || 0;
		const selectionEnd = input.selectionEnd || 0;

		setCalculatorInputValue((prev) => {
			// Handle decimal point
			if (num === ".") {
				// Check if there's already a decimal in the current number segment
				const currentSegment = getCurrentNumberSegment(prev, selectionStart);
				if (currentSegment.includes(".")) return prev;

				// Insert at cursor position
				const newValue = prev.slice(0, selectionStart) + num + prev.slice(selectionEnd);

				setTimeout(() => {
					input.setSelectionRange(selectionStart + 1, selectionStart + 1);
				}, 0);

				return newValue === "" ? "0" : newValue;
			}

			// Insert at cursor position
			const newValue =
				prev === "0" ? num : prev.slice(0, selectionStart) + num + prev.slice(selectionEnd);

			setTimeout(() => {
				input.setSelectionRange(selectionStart + 1, selectionStart + 1);
			}, 0);

			return newValue;
		});
	};

	const handleOperatorClick = (operator: string) => {
		const input = inputRef.current;
		if (!input) return;

		const selectionStart = input.selectionStart || 0;
		const selectionEnd = input.selectionEnd || 0;

		setCalculatorInputValue((prev) => {
			// Don't allow operators at the start except minus
			if (prev === "0" && operator !== "-") return prev;

			// Convert operator for display (if needed)
			const displayOperator = operator === "*" ? "×" : operator;

			// Check if the last character is an operator
			const lastChar = prev.charAt(selectionStart - 1);
			const isLastCharOperator = /[+\-×*/]/.test(lastChar);

			// If last character is an operator, replace it
			if (isLastCharOperator) {
				const newValue =
					prev.slice(0, selectionStart - 1) + displayOperator + prev.slice(selectionEnd);
				setTimeout(() => {
					input.setSelectionRange(selectionStart, selectionStart);
				}, 0);
				return newValue;
			}

			// Otherwise, insert the operator at cursor position
			const newValue = prev.slice(0, selectionStart) + displayOperator + prev.slice(selectionEnd);
			setTimeout(() => {
				input.setSelectionRange(selectionStart + 1, selectionStart + 1);
			}, 0);
			return newValue;
		});
	};

	const handleCalculate = () => {
		if (isSingleNumber) {
			const numValue = parseFloat(calculatorInputValue);
			const formattedValue = numValue.toFixed(2);

			if (setValue && name) {
				setValue(name, formattedValue, {
					shouldValidate: true,
					shouldDirty: true,
					shouldTouch: true,
				});
			} else if (onCalculate) {
				onCalculate(formattedValue);
			}
			onClose();
			return;
		}
		try {
			const expression = calculatorInputValue.replace(/×/g, "*");
			const result = Function(`'use strict'; return (${expression})`)();
			const formattedResult = Number.isInteger(result)
				? result.toString()
				: parseFloat(result.toFixed(2)).toString();

			setCalculatorInputValue(formattedResult);
			setTimeout(() => {
				if (inputRef.current) {
					inputRef.current.setSelectionRange(formattedResult.length, formattedResult.length);
				}
			}, 0);
		} catch (error) {
			console.error(error);
			setCalculatorInputValue("Error");
			setTimeout(() => {
				setCalculatorInputValue("0");
				if (inputRef.current) {
					inputRef.current.setSelectionRange(1, 1);
				}
			}, 1000);
		}
	};

	// Helper function to get the current number segment around the cursor
	const getCurrentNumberSegment = (value: string, position: number) => {
		const operators = /[+\-×/]/;
		let start = position;
		let end = position;

		// Find start of current number
		while (start > 0 && !operators.test(value[start - 1])) {
			start--;
		}

		// Find end of current number
		while (end < value.length && !operators.test(value[end])) {
			end++;
		}

		return value.slice(start, end);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// Only allow numbers, operators, and decimal points
		const validInput = /^[0-9+\-×/.]*$/;
		if (validInput.test(e.target.value)) {
			setCalculatorInputValue(e.target.value);
		}
	};

	const handleClear = () => {
		setCalculatorInputValue("0");
		setTimeout(() => {
			if (inputRef.current) {
				inputRef.current.setSelectionRange(1, 1);
			}
		}, 0);
	};

	const handleBackspace = () => {
		const input = inputRef.current;
		if (!input) return;

		const selectionStart = input.selectionStart || 0;
		const selectionEnd = input.selectionEnd || 0;

		setCalculatorInputValue((prev) => {
			// If there's a selection, delete the selected text
			if (selectionStart !== selectionEnd) {
				const newValue = prev.slice(0, selectionStart) + prev.slice(selectionEnd);

				setTimeout(() => {
					input.setSelectionRange(selectionStart, selectionStart);
				}, 0);

				return newValue === "" ? "0" : newValue;
			}

			// If cursor is at the start, do nothing
			if (selectionStart === 0) return prev;

			// Delete the character before the cursor
			const newValue = prev.slice(0, selectionStart - 1) + prev.slice(selectionStart);

			setTimeout(() => {
				input.setSelectionRange(selectionStart - 1, selectionStart - 1);
			}, 0);

			// If result would be empty, return "0"
			return newValue === "" ? "0" : newValue;
		});
	};

	return (
		<div className='fixed inset-0 flex items-end justify-center z-50'>
			<div
				className='fixed inset-0 bg-black bg-opacity-50'
				onClick={onClose}
			/>

			<div className='bg-background-gray-dark rounded-lg p-4 z-10 w-full'>
				{/* Display */}
				<input
					ref={inputRef}
					type='text'
					value={calculatorInputValue}
					onChange={handleInputChange}
					className='bg-zinc-800/80 text-white text-right p-3 rounded mb-4 text-xl w-full focus:outline-none'
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							handleCalculate();
						}
					}}
				/>

				{/* Buttons Grid */}
				<div className='grid grid-cols-4 gap-2'>
					{/* Control buttons */}
					<CalculatorButtons
						value='C'
						onClick={handleClear}
						isOperator
					/>
					<CalculatorButtons
						value='/'
						onClick={() => handleOperatorClick("/")}
						isOperator
					/>
					<CalculatorButtons
						value='×'
						onClick={() => handleOperatorClick("*")}
						isOperator
					/>
					<CalculatorButtons
						value='⌫'
						onClick={handleBackspace}
						isOperator
					/>

					{/* Numbers 7-9 + Addition */}
					{["7", "8", "9"].map((num) => (
						<CalculatorButtons
							key={num}
							value={num}
							onClick={() => handleNumberClick(num)}
						/>
					))}
					<CalculatorButtons
						value='+'
						onClick={() => handleOperatorClick("+")}
						isOperator
					/>

					{/* Numbers 4-6 + Subtraction */}
					{["4", "5", "6"].map((num) => (
						<CalculatorButtons
							key={num}
							value={num}
							onClick={() => handleNumberClick(num)}
						/>
					))}
					<CalculatorButtons
						value='-'
						onClick={() => handleOperatorClick("-")}
						isOperator
					/>

					{/* Numbers 1-3 + Equals */}
					{["1", "2", "3"].map((num) => (
						<CalculatorButtons
							key={num}
							value={num}
							onClick={() => handleNumberClick(num)}
						/>
					))}
					<CalculatorButtons
						value={isSingleNumber ? "✓" : "="}
						onClick={handleCalculate}
						isOperator
						className={`row-span-2 ${isSingleNumber ? "bg-brand-orange text-white" : ""}`}
					/>

					{/* Zero and Decimal */}
					<CalculatorButtons
						value='0'
						onClick={() => handleNumberClick("0")}
						className='col-span-2'
					/>
					<CalculatorButtons
						value='.'
						onClick={() => handleNumberClick(".")}
					/>
				</div>
			</div>
		</div>
	);
};

export default Calculator;

interface CalculatorButtonProps {
	value: string;
	onClick: () => void;
	isOperator?: boolean;
	className?: string;
}

const CalculatorButtons = ({
	value,
	onClick,
	isOperator,
	className = "",
}: CalculatorButtonProps) => (
	<button
		type='button'
		onClick={onClick}
		className={`bg-zinc-700 ${
			isOperator ? "text-brand-orange" : "text-white"
		} p-4 rounded hover:bg-zinc-600 ${className}`}
	>
		{value}
	</button>
);

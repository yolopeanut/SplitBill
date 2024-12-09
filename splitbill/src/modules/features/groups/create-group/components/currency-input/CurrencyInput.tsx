import { useState } from "react";
import { Controller } from "react-hook-form";
import Drawer from "react-modern-drawer";
import Currencies from "../../../../../core/constants/Currencies";
import CurrencyCard from "./components/CurrencyCard";
import { SelectedCurrency, CurrencyInputProps } from "../../../../../core/interfaces/currencies";

const CurrencyInput = ({ errors, control }: CurrencyInputProps) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [selectedCurrency, setSelectedCurrency] = useState<SelectedCurrency | null>(
		Currencies.find((currency) => currency.shortform === "MYR") || null
	);

	const handleDrawerOpen = () => {
		setIsDrawerOpen(!isDrawerOpen);
	};
	return (
		<>
			{/* Currency Input Box */}
			<div
				className='flex flex-col gap-2 pb-4 w-full'
				onClick={handleDrawerOpen}
			>
				<span className='text-font-white text-sm font-semibold'>Currency</span>

				<div className='w-full min-h-16 bg-card-gray-dark rounded-lg flex items-center px-4 text-font-text-gray'>
					{selectedCurrency ? (
						<div className='py-4 w-full'>
							<CurrencyCard
								currency={selectedCurrency}
								field={undefined}
								setSelectedCurrency={undefined}
								setIsDrawerOpen={undefined}
								bordered={false}
							/>
						</div>
					) : (
						"Select Currency"
					)}
				</div>

				{errors.currency && (
					<span className='text-font-red-dark text-sm'>This field is required</span>
				)}
			</div>

			{/* Currency Drawer Controller */}
			<Controller
				name='currency'
				control={control}
				rules={{
					required: "Currency is required",
					validate: {
						notEmpty: (value) => {
							// Check if value is not an empty string after trimming
							if (typeof value === "string" && value.trim() === "") {
								return "Currency cannot be empty";
							}
							// Or check if value is not an empty array
							if (Array.isArray(value) && value.length === 0) {
								return "Please select a currency";
							}
							return true;
						},
					},
				}}
				render={({ field }) => (
					<Drawer
						open={isDrawerOpen}
						onClose={handleDrawerOpen}
						direction='bottom'
						className='rounded-t-lg h-full w-full'
						size='80%'
						lockBackgroundScroll={true}
						style={{ backgroundColor: "#1F1F1F" }}
						duration={400}
					>
						<div className='flex flex-col gap-4 p-4 pt-4 h-full overflow-y-auto pb-20'>
							{/* Swipe to close */}
							<div className='border-brand-orange border-2 rounded-lg w-14 self-center'></div>

							{/* Search Input */}
							<div className='relative'>
								<input
									type='text'
									id='floating_outlined'
									className='block px-2.5 pb-2.5 pt-4 w-full text-sm text-font-white bg-input-search-gray rounded-lg border border-input-search-gray appearance-auto focus:border-input-search-gray focus:outline-none focus:ring-0 peer'
									placeholder=' '
								/>
								<label
									htmlFor='floating_outlined'
									className='absolute text-sm text-font-text-gray duration-300 transform -translate-y-24 scale-75 top-0 z-10 origin-[0] bg-transparent px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[0.4rem] peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 '
								>
									Search Category
								</label>
							</div>

							{/* Currency Cards */}
							<div className='flex flex-col gap-4 bg-card-gray-dark rounded-lg py-4 px-2'>
								{Currencies.map((currency) => (
									<CurrencyCard
										currency={currency}
										key={currency.shortform}
										field={field}
										setSelectedCurrency={setSelectedCurrency}
										setIsDrawerOpen={setIsDrawerOpen}
										bordered={true}
									/>
								))}
							</div>
						</div>
					</Drawer>
				)}
			/>
		</>
	);
};

export default CurrencyInput;

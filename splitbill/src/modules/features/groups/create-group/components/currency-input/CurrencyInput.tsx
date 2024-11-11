import { Dispatch, SetStateAction, useState } from "react";
import { Controller, Control, ControllerRenderProps } from "react-hook-form";
import Drawer from "react-modern-drawer";
import { FieldErrors } from "react-hook-form";
import { ICreateGroupForm } from "../../../../../core/interfaces/createGroupForm";
import Currencies from "../../../../../core/constants/Currencies";

type CurrencyInputProps = {
	errors: FieldErrors<ICreateGroupForm>;
	control: Control<ICreateGroupForm>;
};

type SelectedCurrency = {
	shortform: string;
	elaboration: string;
	dollarSign: string;
};

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
						<div className='flex flex-col gap-4 p-8 pt-4 h-full overflow-y-auto pb-20'>
							{/* Swipe to close */}
							<div className='border-brand-orange border-2 rounded-lg w-14 self-center'></div>

							{/* Search Input */}
							<div className='relative'>
								<input
									type='text'
									id='floating_outlined'
									className='block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-input-search-gray rounded-lg border border-input-search-gray appearance-auto text-white focus:border-input-search-gray focus:outline-none focus:ring-0 peer'
									placeholder=' '
								/>
								<label
									htmlFor='floating_outlined'
									className='absolute text-sm text-gray-500 text-gray-400 duration-300 transform -translate-y-24 scale-75 top-0 z-10 origin-[0] bg-gray-900 px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[0.4rem] peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 '
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

type CurrencyCardProps = {
	currency: (typeof Currencies)[number];
	field: ControllerRenderProps<ICreateGroupForm, "currency"> | undefined;
	setSelectedCurrency: Dispatch<SetStateAction<SelectedCurrency | null>> | undefined;
	setIsDrawerOpen: Dispatch<SetStateAction<boolean>> | undefined;
	bordered: boolean;
};

const CurrencyCard = ({
	currency,
	field,
	setSelectedCurrency,
	setIsDrawerOpen,
	bordered,
}: CurrencyCardProps) => {
	return (
		<>
			{/* Currency Card */}
			<div
				className='flex flex-row justify-between items-center w-full gap-1 cursor-pointer'
				onClick={() => {
					field?.onChange(currency.shortform);
					setSelectedCurrency?.(currency);
					setIsDrawerOpen?.(false);
				}}
			>
				{/* Currency Card Content */}
				<div className='flex flex-row items-center gap-6 justify-between w-full'>
					<div className='flex flex-col'>
						{/* Currency Card Shortform */}
						<span className='text-font-white text-base font-semibold'>{currency.shortform}</span>

						{/* Currency Card Elaboration */}
						<span className='text-font-text-gray text-sm font-semibold'>
							{currency.elaboration}
						</span>
					</div>

					{/* Currency Card Dollar Sign */}
					<div className='flex justify-center items-center rounded-full w-12 text-font-white text-base'>
						{currency.dollarSign}
					</div>
				</div>
			</div>

			{/* Currency Card Border */}
			{bordered && <hr className='w-full border-b border-input-search-gray' />}
		</>
	);
};

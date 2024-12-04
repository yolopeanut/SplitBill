import { ControllerRenderProps } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";
import { ICreateGroupForm } from "../../../../../../core/interfaces/createGroupForm";
import Currencies from "../../../../../../core/constants/Currencies";
import { SelectedCurrency } from "../../../../../../core/interfaces/currencies";

interface CurrencyCardProps {
	currency: (typeof Currencies)[number];
	field: ControllerRenderProps<ICreateGroupForm, "currency"> | undefined;
	setSelectedCurrency: Dispatch<SetStateAction<SelectedCurrency | null>> | undefined;
	setIsDrawerOpen: Dispatch<SetStateAction<boolean>> | undefined;
	bordered: boolean;
}

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

export default CurrencyCard;

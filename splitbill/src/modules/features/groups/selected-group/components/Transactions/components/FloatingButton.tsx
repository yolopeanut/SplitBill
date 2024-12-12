import { PiReceiptFill } from "react-icons/pi";
import { useState } from "react";
import { BsSendCheckFill } from "react-icons/bs";
import { HiPlusSm } from "react-icons/hi";

interface IFloatingButtonProps {
	handleAddTransactionOnClick: () => void;
	handleSettleUpOnClick: () => void;
}

const FloatingButton = ({
	handleAddTransactionOnClick,
	handleSettleUpOnClick,
}: IFloatingButtonProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleCreateTransactionButton = () => {
		handleAddTransactionOnClick();
		setIsOpen(false);
	};

	const handleSettleUpButton = () => {
		handleSettleUpOnClick();
		setIsOpen(false);
	};

	return (
		<div className='fixed bottom-12 right-7 flex flex-col items-end gap-4'>
			{/* Secondary FABs - only visible when isOpen is true */}
			<div
				className={`flex flex-col gap-4 transition-all duration-200 ${
					isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
				}`}
			>
				{/* Settle Up Button */}
				<button
					title='Settle Up'
					className='btn btn-sm bg-brand-orange rounded-full h-12 w-12 flex justify-center items-center text-font-black border-none shadow-lg hover:scale-110 transition-transform'
					onClick={handleSettleUpButton}
				>
					<BsSendCheckFill size={22} />
				</button>

				{/* Create Transaction Button */}
				<button
					title='Manual Entry'
					className='btn btn-sm bg-brand-orange rounded-full h-12 w-12 flex justify-center items-center text-font-black border-none shadow-lg hover:scale-110 transition-transform'
					onClick={handleCreateTransactionButton}
				>
					<PiReceiptFill size={30} />
				</button>
			</div>

			{/* Main FAB */}
			<button
				title='Add Transaction'
				className={`btn btn-sm bg-brand-orange rounded-full h-14 w-14 flex justify-center items-center text-font-black border-none shadow-lg transition-transform`}
				onClick={() => setIsOpen(!isOpen)}
			>
				<div
					className={`transition-transform duration-300 ease-in-out ${
						isOpen ? "rotate-45" : "rotate-0"
					}`}
				>
					<HiPlusSm size={35} />
				</div>
			</button>
		</div>
	);
};

export default FloatingButton;

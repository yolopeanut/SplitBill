import { PiReceiptFill } from "react-icons/pi";

const FloatingButton = ({
	handleAddTransactionOnClick,
}: {
	handleAddTransactionOnClick: () => void;
}) => {
	return (
		<div className='fixed bottom-16 right-7'>
			<button
				title='Add Transaction'
				className='btn btn-sm bg-brand-orange rounded-full h-14 flex justify-center items-center text-font-black border-none'
				onClick={() => {
					handleAddTransactionOnClick();
				}}
			>
				<PiReceiptFill size={30} />
			</button>
		</div>
	);
};

export default FloatingButton;

import { PiReceiptFill } from "react-icons/pi";

const MockData = {
	transactions: [
		{
			id: 1,
			amount: 100,
			category: "Food",
			createdAt: "2021-09-01T12:00:00",
			updatedAt: "2021-09-01T12:00:00",
			createdBy: {
				id: 1,
				name: "John Doe",
				email: "john.doe@example.com",
			},
			split: {
				splitMethod: "Equal",
				paidBy: {
					id: 1,
					name: "John Doe",
				},
				splitWith: [
					{
						id: 2,
						name: "Jane Doe",
					},
					{
						id: 3,
						name: "Jim Doe",
					},
				],
				amount: 100,
			},
		},
	],
};

const TransactionCard = () => {
	return <div>TransactionCard</div>;
};

const FloatingButton = ({
	handleAddTransactionOnClick,
}: {
	handleAddTransactionOnClick: () => void;
}) => {
	return (
		<div className='absolute bottom-7 right-0'>
			<button
				className='btn btn-sm bg-brand-orange rounded-full h-14 flex justify-center items-center text-font-black'
				onClick={handleAddTransactionOnClick}
			>
				<PiReceiptFill size={30} />
			</button>
		</div>
	);
};

const Transactions = () => {
	const handleAddTransactionOnClick = () => {
		console.log("Add transaction button clicked");
	};
	return (
		<div className='flex flex-col justify-center items-center gap-4 w-full h-full relative'>
			<TransactionCard />
			<FloatingButton handleAddTransactionOnClick={handleAddTransactionOnClick} />
		</div>
	);
};

export default Transactions;

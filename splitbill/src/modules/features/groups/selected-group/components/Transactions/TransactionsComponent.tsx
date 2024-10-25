import { PiReceiptFill } from "react-icons/pi";
import ExpenseCategory from "../../../../../core/enums/ExpenseCategoryEnum";
import { expenseCategories } from "../../../../../core/constants/ExpenseCategories";
import { formatCurrency } from "../../../../../core/common/commonFunctions";

const MockData = {
	transactions: [
		{
			id: 1,
			paidAt: new Date("2024-01-02"),
			amount: 100,
			title: "Groceries",
			category: ExpenseCategory.Food,
			paidBy: "John Doe",
		},
		{
			id: 2,
			paidAt: new Date("2024-01-02"),
			amount: 200,
			title: "Rent",
			category: ExpenseCategory.Housing,
			paidBy: "Jane Doe",
		},
		{
			id: 3,
			paidAt: new Date("2024-01-04"),
			amount: 300,
			title: "Uber",
			category: ExpenseCategory.Transportation,
			paidBy: "John Doe",
		},
		{
			id: 4,
			paidAt: new Date("2024-01-04"),
			amount: 400,
			title: "Electricity",
			category: ExpenseCategory.Utilities,
			paidBy: "Jane Doe",
		},
		{
			id: 5,
			paidAt: new Date("2024-01-05"),
			amount: 500,
			title: "Health",
			category: ExpenseCategory.Health,
			paidBy: "John Doe",
		},
		{
			id: 6,
			paidAt: new Date("2024-01-04"),
			amount: 300,
			title: "Uber",
			category: ExpenseCategory.Transportation,
			paidBy: "John Doe",
		},
		{
			id: 7,
			paidAt: new Date("2024-01-04"),
			amount: 400,
			title: "Electricity",
			category: ExpenseCategory.Utilities,
			paidBy: "Jane Doe",
		},
		{
			id: 8,
			paidAt: new Date("2024-01-05"),
			amount: 500,
			title: "Health",
			category: ExpenseCategory.Health,
			paidBy: "John Doe",
		},
		{
			id: 9,
			paidAt: new Date("2024-01-02"),
			amount: 100,
			title: "Groceries",
			category: ExpenseCategory.Food,
			paidBy: "John Doe",
		},
		{
			id: 10,
			paidAt: new Date("2024-01-02"),
			amount: 200,
			title: "Rent",
			category: ExpenseCategory.Housing,
			paidBy: "Jane Doe",
		},
		{
			id: 11,
			paidAt: new Date("2024-01-04"),
			amount: 300,
			title: "Uber",
			category: ExpenseCategory.Transportation,
			paidBy: "John Doe",
		},
		{
			id: 12,
			paidAt: new Date("2024-01-04"),
			amount: 400,
			title: "Electricity",
			category: ExpenseCategory.Utilities,
			paidBy: "Jane Doe",
		},
		{
			id: 13,
			paidAt: new Date("2024-01-05"),
			amount: 500,
			title: "Health",
			category: ExpenseCategory.Health,
			paidBy: "John Doe",
		},
		{
			id: 14,
			paidAt: new Date("2024-01-04"),
			amount: 300,
			title: "Uber",
			category: ExpenseCategory.Transportation,
			paidBy: "John Doe",
		},
		{
			id: 15,
			paidAt: new Date("2024-01-04"),
			amount: 400,
			title: "Electricity",
			category: ExpenseCategory.Utilities,
			paidBy: "Jane Doe",
		},
		{
			id: 16,
			paidAt: new Date("2024-01-05"),
			amount: 500,
			title: "Health",
			category: ExpenseCategory.Health,
			paidBy: "John Doe",
		},
	],
};

const TransactionCard = ({
	amount,
	category,
	paidBy,
	title,
}: {
	amount: number;
	category: ExpenseCategory;
	paidBy: string;
	title: string;
}) => {
	const categoryData = expenseCategories.find((categories) => categories.label === category);
	const categoryIcon = categoryData?.icon;
	const categoryColor = categoryData?.color;
	return (
		<>
			<div className='flex flex-row justify-between items-center w-full gap-4'>
				<div className='flex flex-row items-center gap-4'>
					<div
						className='flex justify-center items-center rounded-full w-10 h-10 text-font-black'
						style={{ backgroundColor: categoryColor }}
					>
						{categoryIcon}
					</div>
					<div className='flex flex-col justify-center items-start h-10'>
						<span className='text-font-white text-lg font-semibold'>{title}</span>
						<span className='text-font-text-gray text-sm'>Paid by {paidBy}</span>
					</div>
				</div>

				<span className='text-font-white text-sm font-bold'>{formatCurrency(amount, "RM ")}</span>
			</div>
		</>
	);
};

const FloatingButton = ({
	handleAddTransactionOnClick,
}: {
	handleAddTransactionOnClick: () => void;
}) => {
	return (
		<div className='fixed bottom-28 right-7'>
			<button
				className='btn btn-sm bg-brand-orange rounded-full h-14 flex justify-center items-center text-font-black border-none'
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

	console.log(MockData);
	return (
		<div className='flex flex-col justify-start items-center gap-4 w-full'>
			{MockData.transactions.map((transaction) => (
				<TransactionCard
					key={transaction.id}
					amount={transaction.amount}
					category={transaction.category}
					paidBy={transaction.paidBy}
					title={transaction.title}
				/>
			))}
			<FloatingButton handleAddTransactionOnClick={handleAddTransactionOnClick} />
		</div>
	);
};

export default Transactions;

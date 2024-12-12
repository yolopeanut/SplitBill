import { IAllUsersTable } from "../../../../../../../../core/interfaces/all_usersTable";
import useAuthContext from "../../../../../../../../core/auth/hooks/useAuthContext";
import { expenseCategories } from "../../../../../../../../core/constants/ExpenseCategories";
import { ITransactionSplitsTable } from "../../../../../../../../core/interfaces/all_transactionsTable";

interface UseTransactionCardProps {
	transactionSplits: ITransactionSplitsTable[];
	tax: number;
	category: string;
	paidBy: IAllUsersTable | undefined;
	amount: number;
}

const useTransactionCard = ({
	transactionSplits,
	tax,
	category,
	paidBy,
	amount,
}: UseTransactionCardProps) => {
	const { user } = useAuthContext();
	const categoryData = expenseCategories.find((categories) => categories.label === category);
	const categoryIcon = categoryData?.icon;
	const categoryColor = categoryData?.color;

	const splitAmount = transactionSplits.find((split) => split.split_user_id === user?.id);

	const getSplitAmountWithTax = () => {
		if (splitAmount?.equal_split_amount) {
			return splitAmount.equal_split_amount + tax / transactionSplits.length;
		} else if (splitAmount?.percentage_split_amount) {
			return (splitAmount.percentage_split_amount / 100) * amount + tax / transactionSplits.length;
		} else if (splitAmount?.unequal_split_amount) {
			return splitAmount.unequal_split_amount + tax / transactionSplits.length;
		}
		return 0;
	};

	const getTransactionColorAndSymbol = () => {
		let transactionColor = "";
		let transactionSymbol = "";

		// If the split amount with tax is 0, then the transaction is neutral
		if (getSplitAmountWithTax() === 0) {
			transactionColor = "text-font-white";
			transactionSymbol = "";
		} else if (paidBy?.id === user?.id) {
			// If the paid by is the user, then the transaction is green
			if (getSplitAmountWithTax() > 0) {
				transactionColor = "text-font-green-is-owed";
				transactionSymbol = "+";
			}
		} else {
			// If the paid by is not the user, then the transaction is red
			if (getSplitAmountWithTax() > 0) {
				transactionColor = "text-font-red-owes";
				transactionSymbol = "-";
			}
		}

		return {
			transactionColor,
			transactionSymbol,
		};
	};

	return {
		getTransactionColorAndSymbol,
		categoryIcon,
		categoryColor,
		getSplitAmountWithTax,
		user,
	};
};

export default useTransactionCard;

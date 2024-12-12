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

	const getSplitAmountWithTax = () => {
		let splitAmount = 0;

		// If the paid by is the user, then the split amount is the other users' accumulated split amount
		if (paidBy?.id !== user?.id) {
			// Add the split amount of the other users
			splitAmount = transactionSplits.reduce((acc, split) => {
				if (split.split_user_id === user?.id) {
					acc +=
						split.equal_split_amount ||
						((split.percentage_split_amount || 0) / 100) * amount ||
						split.unequal_split_amount ||
						0;
				}
				return acc;
			}, 0);
		}

		// If the paid by is not the user, then the split amount is the user's split amount
		else {
			// How much everyone else owes me
			const splitTransaction = transactionSplits.filter(
				(split) => split.split_user_id !== user?.id
			);
			// Add the split amount of the other users
			splitAmount = splitTransaction.reduce((acc, split) => {
				acc +=
					split.equal_split_amount ||
					((split.percentage_split_amount || 0) / 100) * amount ||
					split.unequal_split_amount ||
					0;
				return acc;
			}, 0);
		}

		// Add the tax to the split amount
		if (splitAmount) {
			return splitAmount + tax / transactionSplits.length;
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

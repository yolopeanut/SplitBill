import { useMemo } from "react";
import ExpenseCategory from "../../../../../../../../../../core/enums/ExpenseCategoryEnum";
import { useGroupsContext } from "../../../../../../../../hooks/useGroupsContext";
import useAuthContext from "../../../../../../../../../../core/auth/hooks/useAuthContext";
import {
	calculateSplitAmount,
	filterTransactionsByTimeframe,
} from "../../../../../../../../../../core/common/commonFunctions";

export const useTotalAmounts = () => {
	const { allTransactions, selectedTimeFrame } = useGroupsContext();

	const { user } = useAuthContext();

	// First, get all transactions filtered by time and excluding settlements
	const timeFilteredTransactions = useMemo(() => {
		if (!allTransactions) return [];

		const nonSettledTransactions = allTransactions.filter(
			(transaction) => transaction.category !== ExpenseCategory.SettleUp
		);

		return filterTransactionsByTimeframe(nonSettledTransactions, selectedTimeFrame);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [allTransactions, selectedTimeFrame]);

	// Calculate total group expenses for the selected time period
	const totalGroupExpenses = useMemo(() => {
		return timeFilteredTransactions.reduce((acc, transaction) => acc + transaction.total_amount, 0);
	}, [timeFilteredTransactions]);

	// Calculate total amount the current user owes based on splits
	const totalYouPaidFor = useMemo(() => {
		if (!user) return 0;

		return timeFilteredTransactions.reduce((acc, transaction) => {
			const userSplit = transaction.transaction_splits.find(
				(split) => split.split_user_id === user.id
			);
			if (!userSplit) return acc;

			return (
				acc +
				(calculateSplitAmount(transaction, userSplit) +
					transaction.tax / transaction.transaction_splits.length)
			);
		}, 0);
	}, [timeFilteredTransactions, user]);

	return {
		totalGroupExpenses,
		totalYouPaidFor,
		filteredTransactions: timeFilteredTransactions,
	};
};

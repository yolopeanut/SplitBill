import { useMemo } from "react";
import ExpenseCategory from "../../../../../../../../../../core/enums/ExpenseCategoryEnum";
import useAuthContext from "../../../../../../../../../../core/auth/hooks/useAuthContext";
import { useGroupsContext } from "../../../../../../../../hooks/useGroupsContext";
import { useTotalAmounts } from "../../total-amounts/hooks/useTotalAmounts";
import { AnalyticsGroupOrOwnerEnum } from "../../../../../../../../../../core/enums/AnalyticsTimeframeEnum";
import { calculateSplitAmount } from "../../../../../../../../../../core/common/commonFunctions";

export const useCategorySpendingComponent = () => {
	const { filteredTransactions } = useTotalAmounts();
	const { selectedGroupOrOwnAnalytics } = useGroupsContext();
	const { user } = useAuthContext();

	const categoryTotals = useMemo(() => {
		// Filter out settlements
		const nonSettledTransactions = filteredTransactions.filter(
			(transaction) => transaction.category !== ExpenseCategory.SettleUp
		);

		// Calculate totals by category
		const totals = nonSettledTransactions.reduce(
			(acc: Map<ExpenseCategory, number>, transaction) => {
				const currentTotal = acc.get(transaction.category) || 0;

				// For personal analytics, use split amounts
				if (selectedGroupOrOwnAnalytics === AnalyticsGroupOrOwnerEnum.ME && user) {
					const userSplit = transaction.transaction_splits.find(
						(split) => split.split_user_id === user.id
					);

					if (userSplit) {
						const splitAmount =
							calculateSplitAmount(transaction, userSplit) +
							transaction.tax / transaction.transaction_splits.length;
						acc.set(transaction.category, currentTotal + splitAmount);
					}
				} else {
					// For group analytics, use total amounts
					acc.set(transaction.category, currentTotal + transaction.total_amount);
				}
				return acc;
			},
			new Map<ExpenseCategory, number>()
		);

		// Convert to array and sort by amount
		return Array.from(totals.entries())
			.map(([category, amount]) => ({
				category,
				amount: Number(amount.toFixed(2)),
			}))
			.sort((a, b) => b.amount - a.amount);
	}, [filteredTransactions, selectedGroupOrOwnAnalytics, user]);
	return { categoryTotals };
};

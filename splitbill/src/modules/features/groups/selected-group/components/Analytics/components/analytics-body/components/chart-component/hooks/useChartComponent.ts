import { ArcElement, Legend, Tooltip, TooltipItem } from "chart.js";

import { Chart } from "chart.js";
import { useGroupsContext } from "../../../../../../../../hooks/useGroupsContext";
import useAuthContext from "../../../../../../../../../../core/auth/hooks/useAuthContext";
import { useMemo } from "react";
import {
	calculateSplitAmount,
	filterTransactionsByTimeframe,
	tailwindToHex,
} from "../../../../../../../../../../core/common/commonFunctions";
import ExpenseCategory from "../../../../../../../../../../core/enums/ExpenseCategoryEnum";
import { AnalyticsGroupOrOwnerEnum } from "../../../../../../../../../../core/enums/AnalyticsTimeframeEnum";
import { expenseCategories } from "../../../../../../../../../../core/constants/ExpenseCategories";

export const useChartComponent = () => {
	// Register ChartJS components
	Chart.register(ArcElement, Tooltip, Legend);
	const { allTransactions, selectedTimeFrame, selectedGroupOrOwnAnalytics } = useGroupsContext();
	const { user } = useAuthContext();

	const categoryTotals = useMemo(() => {
		if (!allTransactions) return {};

		// First filter by timeframe
		const timeFilteredTransactions = filterTransactionsByTimeframe(
			allTransactions,
			selectedTimeFrame
		);

		// Filter out settlements
		const nonSettledTransactions = timeFilteredTransactions.filter(
			(transaction) => transaction.category !== ExpenseCategory.SettleUp
		);

		// Calculate totals by category
		return nonSettledTransactions.reduce((acc: { [key: string]: number }, transaction) => {
			// For personal analytics, use split amounts
			if (selectedGroupOrOwnAnalytics === AnalyticsGroupOrOwnerEnum.ME && user) {
				const userSplit = transaction.transaction_splits.find(
					(split) => split.split_user_id === user.id
				);

				if (userSplit) {
					const splitAmount =
						calculateSplitAmount(transaction, userSplit) +
						transaction.tax / transaction.transaction_splits.length;
					acc[transaction.category] = (acc[transaction.category] || 0) + splitAmount;
				}
			} else {
				// For group analytics, use total amounts
				acc[transaction.category] = (acc[transaction.category] || 0) + transaction.total_amount;
			}
			return acc;
		}, {});
	}, [allTransactions, selectedTimeFrame, selectedGroupOrOwnAnalytics, user]);

	// Filter out categories with zero amounts and "Settle Up"
	const filteredCategories = expenseCategories.filter(
		(category) =>
			category.label !== ExpenseCategory.SettleUp && (categoryTotals[category.label] || 0) > 0
	);

	const chartData = {
		labels: filteredCategories.map((category) => category.label),
		datasets: [
			{
				data: filteredCategories.map((category) =>
					Number((categoryTotals[category.label] || 0).toFixed(2))
				),
				backgroundColor: filteredCategories.map(
					(category) => tailwindToHex[category.color] || "#666666"
				),
				borderColor: filteredCategories.map(
					(category) => tailwindToHex[category.color] || "#666666"
				),
				borderWidth: 1,
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				callbacks: {
					label: function (context: TooltipItem<"pie">) {
						const label = context.label || "";
						const value = context.raw || 0;
						const total = (context.dataset.data as number[]).reduce((a, b) => a + b, 0);
						const percentage = (((value as number) / total) * 100).toFixed(1);
						return `${label}: ${value} (${percentage}%)`;
					},
				},
			},
		},
	};
	return { chartData, options };
};

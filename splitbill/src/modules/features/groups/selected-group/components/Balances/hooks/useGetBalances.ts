import { useEffect, useState } from "react";
import {
	IAllTransactionsTable,
	ITransactionSplitsTable,
} from "../../../../../../core/interfaces/all_transactionsTable";
import { IAllUsersTable } from "../../../../../../core/interfaces/all_usersTable";
import { IBalances } from "../../../../../../core/interfaces/user_balances";

const useGetBalances = ({
	allTransactions,
	groupUsers,
}: {
	allTransactions: IAllTransactionsTable[] | undefined;
	groupUsers: IAllUsersTable[] | null;
}): { userBalances: IBalances["userBalances"]; isLoading: boolean } => {
	const [isLoading, setIsLoading] = useState(false);
	const [userBalances, setUserBalances] = useState<IBalances["userBalances"]>({});

	useEffect(() => {
		if (!allTransactions || !groupUsers) {
			setUserBalances({});
			return;
		}

		setIsLoading(true);
		try {
			const { userBalances } = analyzeGroupExpenses(allTransactions, groupUsers);
			setUserBalances(userBalances);
		} catch (error) {
			console.error("Error analyzing expenses:", error);
		} finally {
			setIsLoading(false);
		}
	}, [allTransactions, groupUsers]);

	return {
		userBalances,
		isLoading,
	};
};

export default useGetBalances;

function analyzeGroupExpenses(
	transactions: IAllTransactionsTable[] | undefined,
	groupUsers: IAllUsersTable[] | null
) {
	if (!transactions || !groupUsers) return { userBalances: {} };
	const balances = new Map<string, { owes_users: Map<string, number> }>();

	// Initialize balances for each user with an empty Map for owing relationships
	groupUsers.forEach((user) => {
		balances.set(user.id, { owes_users: new Map() });
	});

	// Process each user's transactions
	groupUsers.forEach((user) => {
		const userTransactions = transactions.filter((transaction) =>
			transaction.transaction_splits.some((split) => split.split_user_id === user.id)
		);

		userTransactions.forEach((transaction) => {
			// Skip if user is the payer and receiving their own split
			if (transaction.paid_by === user.id) {
				// Calculate what others owe this user
				transaction.transaction_splits.forEach((split) => {
					if (split.split_user_id === user.id) return; // Skip user's own split

					const splitAmount = getSplitAmount(split, transaction.total_amount);
					const currentUserBalance = balances.get(user.id)!;
					const otherUserOwes = currentUserBalance.owes_users.get(split.split_user_id) || 0;
					currentUserBalance.owes_users.set(split.split_user_id, otherUserOwes + splitAmount);
				});
			} else {
				// User owes the payer
				const userSplit = transaction.transaction_splits.find(
					(split) => split.split_user_id === user.id
				);
				if (!userSplit) return;

				const splitAmount = getSplitAmount(userSplit, transaction.total_amount);
				const currentUserBalance = balances.get(user.id)!;
				const currentOwed = currentUserBalance.owes_users.get(transaction.paid_by) || 0;
				currentUserBalance.owes_users.set(transaction.paid_by, currentOwed - splitAmount);
			}
		});
	});

	// Convert to a more readable format
	const userBalances = Object.fromEntries(
		Array.from(balances.entries()).map(([userId, balance]) => [
			userId,
			{
				owes_users: Object.fromEntries(balance.owes_users),
			},
		])
	);

	return { userBalances };
}

function getSplitAmount(split: ITransactionSplitsTable, total_amount: number) {
	switch (split.split_type.toLowerCase()) {
		case "equal":
			if (!split.equal_split_amount) return 0;
			// console.log({ equal_split_amount: split.equal_split_amount });
			return split.equal_split_amount;
		case "unequal":
			if (!split.unequal_split_amount) return 0;
			return split.unequal_split_amount;
		case "percentage":
			if (!split.percentage_split_amount) return 0;
			return (split.percentage_split_amount / 100) * total_amount;
		default:
			return 0;
	}
}

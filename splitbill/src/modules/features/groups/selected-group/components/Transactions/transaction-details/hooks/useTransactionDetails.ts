import { IAllTransactionsTable } from "../../../../../../../core/interfaces/all_transactionsTable";

const useTransactionDetails = (data: IAllTransactionsTable | null | undefined) => {
	const paidBy = data!.paid_by;
	const amount = data!.total_amount;
	const tax = data!.tax;
	const splitBy = data!.transaction_splits[0].split_type;
	const isPayingForOthers = !data!.transaction_splits.some(
		(split) => split.split_user_id === data!.paid_by
	);

	const getUserNetAmountOwed = (user_id: string) => {
		const currentUserSplit =
			data!.transaction_splits.find((split) => {
				return split.split_user_id === user_id;
			}) || null;

		const amountOwedBeforeTax: number =
			currentUserSplit?.split_type === "Equal"
				? (currentUserSplit.equal_split_amount as number)
				: currentUserSplit?.split_type === "Custom"
				? (currentUserSplit.unequal_split_amount as number)
				: currentUserSplit?.split_type === "Percentage"
				? amount * (currentUserSplit.percentage_split_amount! / 100)
				: 0;

		const netAmountOwed = (
			isPayingForOthers
				? amountOwedBeforeTax
				: amountOwedBeforeTax + tax / (data?.transaction_splits?.length || 1)
		).toFixed(2);

		return netAmountOwed;
	};

	return { paidBy, amount, tax, splitBy, getUserNetAmountOwed };
};

export default useTransactionDetails;

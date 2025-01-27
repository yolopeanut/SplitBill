import { IAllTransactionsTable } from "../../../../../../../core/interfaces/all_transactionsTable";

const useTransactionDetails = (
    data: IAllTransactionsTable | null | undefined
) => {
    const paidBy = data!.paid_by;
    const amount = data!.total_amount;
    const tax = data!.tax;
    const splitBy = data!.transaction_splits[0].split_type;
    const isPayingForOthers = !data!.transaction_splits.some(
        (split) => split.split_user_id === data!.paid_by
    );

    /**
     * Calculates the net amount owed by a specific user for a transaction
     * @param user_id - The ID of the user to calculate amount for
     * @returns The net amount owed as a string fixed to 2 decimal places, or '0.00' if user is not part of transaction
     */
    const getUserNetAmountOwed = (user_id: string) => {
        const currentUserSplit = data!.transaction_splits.find(
            (split) => split.split_user_id === user_id
        );

        // If user is not part of the transaction splits, they owe nothing
        if (!currentUserSplit) {
            return "0.00";
        }

        const amountOwedBeforeTax: number =
            currentUserSplit.split_type === "Equal"
                ? (currentUserSplit.equal_split_amount as number)
                : currentUserSplit.split_type === "Custom"
                ? (currentUserSplit.unequal_split_amount as number)
                : currentUserSplit.split_type === "Percentage"
                ? amount * (currentUserSplit.percentage_split_amount! / 100)
                : 0;

        const netAmountOwed = (
            isPayingForOthers
                ? amountOwedBeforeTax
                : amountOwedBeforeTax + tax / data!.transaction_splits.length
        ).toFixed(2);

        return netAmountOwed;
    };

    return { paidBy, amount, tax, splitBy, getUserNetAmountOwed };
};

export default useTransactionDetails;

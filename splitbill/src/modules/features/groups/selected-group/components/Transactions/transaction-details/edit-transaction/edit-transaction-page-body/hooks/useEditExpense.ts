import { useMutation } from "@tanstack/react-query";
import useAuthContext from "../../../../../../../../../core/auth/hooks/useAuthContext";
import { supabase } from "../../../../../../../../../../config/Supabase";
import postUpdateTransactionDB from "../../../../../../../../../core/database_functions/post_update_transaction";
import postUpdateTransactionSplitsDB from "../../../../../../../../../core/database_functions/post_update_transaction_splits";
import { IAllUsersTable } from "../../../../../../../../../core/interfaces/all_usersTable";
import postCreateNewTransactionSplitDB from "../../../../../../../../../core/database_functions/post_create_new_transaction_split";

interface MutationProps {
	transaction_id: string;
	group_id: string;
	paid_by: string;
	expense_title: string;
	category: string;
	amount: number;
	remarks: string | null;
	split_by: {
		value: {
			type: string;
			users: { user: IAllUsersTable; amount: number; transaction_split_id: string }[];
		};
	};
	tax: number | 0;
}

export const useEditExpense = () => {
	const { user, session, isLoading } = useAuthContext();

	const { mutateAsync: editExpense, isPending } = useMutation({
		mutationFn: async ({
			transaction_id,
			group_id,
			paid_by,
			expense_title,
			category,
			amount,
			remarks,
			split_by,
			tax,
		}: MutationProps) => {
			if (!user || !session || !supabase || isLoading) return;

			// console.log({
			// 	transaction_id,
			// 	group_id,
			// 	paid_by,
			// 	expense_title,
			// 	category,
			// 	amount,
			// 	remarks,
			// 	tax,
			// });

			const response = await postUpdateTransactionDB(
				transaction_id,
				group_id,
				user.id,
				paid_by,
				expense_title,
				category,
				amount,
				remarks,
				tax
			);

			if (response.error) {
				throw response.error;
			}

			// console.log({ useEditExpenseSplitBy: split_by });

			if (response) {
				const split_by_values = split_by.value;

				// Equal split by
				const equal_split_amount = amount / split_by_values.users.length;

				// Custom split by
				const custom_split_by = split_by_values.users.map((user) => ({
					...user,
					amount: user.amount,
				}));
				split_by_values.users = custom_split_by;

				split_by_values.users.map(async (user) => {
					//If split by is equal, then we need to calculate the equal split amount
					if (split_by_values.type === "Equal") {
						// If the user does not have a transaction split id, then we need to create a new one
						if (!user.transaction_split_id) {
							await postCreateNewTransactionSplitDB(
								response,
								user.user.id,
								split_by_values.type,
								equal_split_amount,
								null,
								null
							);
							return;
						}

						// else update the existing transaction split
						await postUpdateTransactionSplitsDB(
							user.transaction_split_id,
							response,
							user.user.id,
							split_by_values.type,
							equal_split_amount,
							null,
							null
						);
					}
					//If split by is custom, then we need to calculate the custom split amount
					else if (split_by_values.type === "Custom") {
						// If the user does not have a transaction split id, then we need to create a new one
						if (!user.transaction_split_id) {
							await postCreateNewTransactionSplitDB(
								response,
								user.user.id,
								split_by_values.type,
								null,
								user.amount,
								null
							);
							return;
						}

						// else update the existing transaction split
						await postUpdateTransactionSplitsDB(
							user.transaction_split_id,
							response,
							user.user.id,
							split_by_values.type,
							null,
							user.amount,
							null
						);
					}
					//If split by is percentage, then we need to calculate the percentage of the amount
					else if (split_by_values.type === "Percentage") {
						// If the user does not have a transaction split id, then we need to create a new one
						if (!user.transaction_split_id) {
							await postCreateNewTransactionSplitDB(
								response,
								user.user.id,
								split_by_values.type,
								null,
								null,
								user.amount
							);
							return;
						}

						// else update the existing transaction split
						await postUpdateTransactionSplitsDB(
							user.transaction_split_id,
							response,
							user.user.id,
							split_by_values.type,
							null,
							null,
							user.amount
						);
					}
				});
			}

			if (response) return response;

			return null;
		},
		// onSuccess: (response) => {
		// 	// console.log("Expense updated successfully", response);
		// },
	});

	return { editExpense, isPending };
};

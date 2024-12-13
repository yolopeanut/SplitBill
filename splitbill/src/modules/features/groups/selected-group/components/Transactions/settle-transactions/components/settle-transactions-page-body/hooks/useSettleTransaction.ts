import { useMutation } from "@tanstack/react-query";

import { queryClient } from "../../../../../../../../../../config/ReactQuery";
import { IAllUsersTable } from "../../../../../../../../../core/interfaces/all_usersTable";
import useAuthContext from "../../../../../../../../../core/auth/hooks/useAuthContext";
import { supabase } from "../../../../../../../../../../config/Supabase";
import postCreateNewTransactionDB from "../../../../../../../../../core/database_functions/post_create_new_transaction";
import postCreateNewTransactionSplitDB from "../../../../../../../../../core/database_functions/post_create_new_transaction_split";

type MutationProps = {
	group_id: string;
	paid_by: string;
	expense_title: string;
	category: string;
	amount: number;
	remarks: string | null;
	split_by: {
		value: {
			type: string;
			users: { user: IAllUsersTable; amount: number }[];
		};
	};
	tax: number | 0;
};

export const useAddExpense = () => {
	const { user, session, isLoading } = useAuthContext();

	const { mutateAsync: addExpense, isPending } = useMutation({
		mutationFn: async ({
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

			const response = await postCreateNewTransactionDB(
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
						await postCreateNewTransactionSplitDB(
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
						await postCreateNewTransactionSplitDB(
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
						await postCreateNewTransactionSplitDB(
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
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["groups", "fetchAllTransactions"] });
		},
	});

	return { addExpense, isPending };
};

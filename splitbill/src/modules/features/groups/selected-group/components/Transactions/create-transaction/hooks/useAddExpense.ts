import { useMutation } from "@tanstack/react-query";
import useAuthContext from "../../../../../../../core/auth/hooks/useAuthContext";
import { supabase } from "../../../../../../../../config/Supabase";
import postCreateNewTransactionDB from "../../../../../../../core/database_functions/post_create_new_transaction";
import postCreateNewTransactionSplitDB from "../../../../../../../core/database_functions/post_create_new_transaction_split";
import { IAllUsersTable } from "../../../../../../../core/interfaces/all_usersTable";

export const useAddExpense = () => {
	const { user, session, isLoading } = useAuthContext();

	const { mutate: addExpense } = useMutation({
		mutationFn: async ({
			group_id,
			paid_by,
			expense_title,
			category,
			amount,
			remarks,
			split_by,
		}: {
			group_id: string;
			paid_by: string;
			expense_title: string;
			category: string;
			amount: number;
			remarks: string | null;
			split_by: {
				value: {
					type: string;
					users: IAllUsersTable[];
					equal_split_amount?: number | null;
					unequal_split_amount?: number | null;
					percentage_split_amount?: number | null;
				};
			};
		}) => {
			if (!user || !session || !supabase || isLoading) return;

			const response = await postCreateNewTransactionDB(
				group_id,
				user.id,
				paid_by,
				expense_title,
				category,
				amount,
				remarks
			);

			if (response.error) {
				throw response.error;
			}

			if (response) {
				const split_by_values = split_by.value;
				split_by_values.users.map(async (user) => {
					//If split by is equal, then we need to calculate the equal split amount
					if (split_by_values.type === "Equal") {
						split_by_values.equal_split_amount = amount / split_by_values.users.length;
						await postCreateNewTransactionSplitDB(
							response,
							user.id,
							split_by_values.type,
							split_by_values.equal_split_amount,
							null,
							null
						);
					}
					// TODO: Implement unequal split
					//If split by is unequal, then we need to calculate the unequal split amount
					else if (split_by_values.type === "Unequal") {
						split_by_values.unequal_split_amount = amount / split_by_values.users.length;
						await postCreateNewTransactionSplitDB(
							response,
							user.id,
							split_by_values.type,
							null,
							split_by_values.unequal_split_amount,
							null
						);
					}
					// TODO: Implement percentage split
					//If split by is percentage, then we need to calculate the percentage of the amount
					else if (split_by_values.type === "Percentage") {
						split_by_values.percentage_split_amount =
							split_by_values.percentage_split_amount || null;
						await postCreateNewTransactionSplitDB(
							response,
							user.id,
							split_by_values.type,
							null,
							null,
							split_by_values.percentage_split_amount
						);
					}
				});
			}

			if (response) return response;

			return null;
		},
		onSuccess: (response) => {
			console.log("Expense added successfully", response);
		},
	});

	return { addExpense };
};

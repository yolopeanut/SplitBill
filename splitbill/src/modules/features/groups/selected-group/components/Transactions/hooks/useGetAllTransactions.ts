import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { supabase } from "../../../../../../../config/Supabase";
import useAuthContext from "../../../../../../core/auth/hooks/useAuthContext";
import getGroupById from "../../../../../../core/database_functions/get_all_group_transactions_by_id";
import { IAllTransactionsTable } from "../../../../../../core/interfaces/all_transactionsTable";

export const useGetAllTransactions = (groupId: string) => {
	const { user, session, isLoading } = useAuthContext();

	const getAllTransactionsQuery = useQuery({
		queryKey: ["groups", "fetchAllTransactions"],
		queryFn: async () => {
			if (isLoading || !user || !session || !supabase) {
				return [];
			}

			const data = await getGroupById(groupId);
			return data;
		},
		enabled: !!user && !!session && !!supabase && !isLoading,
	});

	if (getAllTransactionsQuery.error) {
		throw getAllTransactionsQuery.error;
	}

	return getAllTransactionsQuery as UseQueryResult<IAllTransactionsTable[]>;
};

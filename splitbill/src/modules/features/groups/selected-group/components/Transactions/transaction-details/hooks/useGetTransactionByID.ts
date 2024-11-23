import { useQuery, UseQueryResult } from "@tanstack/react-query";
import useAuthContext from "../../../../../../../core/auth/hooks/useAuthContext";
import { supabase } from "../../../../../../../../config/Supabase";
import { IAllTransactionsTable } from "../../../../../../../core/interfaces/all_transactionsTable";
import getTransactionByTransId from "../../../../../../../core/database_functions/get_transaction_by_trans_id";

export const useGetTransactionByID = (transactionId: string) => {
	const { user, session, isLoading } = useAuthContext();

	const getTransactionByIDQuery = useQuery({
		queryKey: ["groups", "fetchTransactionByID"],
		queryFn: async () => {
			if (isLoading || !user || !session || !supabase) {
				return [];
			}

			const data = await getTransactionByTransId(transactionId);
			return data;
		},
		enabled: !!user && !!session && !!supabase && !isLoading,
	});

	if (getTransactionByIDQuery.error) {
		throw getTransactionByIDQuery.error;
	}

	return getTransactionByIDQuery as UseQueryResult<IAllTransactionsTable>;
};

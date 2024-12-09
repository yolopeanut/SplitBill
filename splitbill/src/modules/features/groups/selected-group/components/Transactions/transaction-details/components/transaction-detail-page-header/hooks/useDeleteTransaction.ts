import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../../../../../../../../config/ReactQuery";
import deleteTransactionDB from "../../../../../../../../../core/database_functions/delete_transaction";

export const useDeleteTransaction = () => {
	const { mutateAsync: deleteTransaction } = useMutation({
		mutationFn: async (transactionId: string) => {
			await deleteTransactionDB(transactionId);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["groups", "fetchAllTransactions"] });
		},
	});

	return { deleteTransaction };
};

export default useDeleteTransaction;

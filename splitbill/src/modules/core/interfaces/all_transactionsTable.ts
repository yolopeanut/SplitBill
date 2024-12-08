import ExpenseCategory from "../enums/ExpenseCategoryEnum";

interface IAllTransactionsTable {
	transaction_id: string;
	group_id: string;
	trans_creator_user_id: string;
	created_at: string;
	total_amount: number;
	remarks: string | null;
	paid_by: string;
	trans_title: string;
	category: ExpenseCategory;
	transaction_splits: ITransactionSplitsTable[];
	tax: number;
}

interface ITransactionSplitsTable {
	transaction_split_id: string;
	trans_id: string;
	split_user_id: string;
	split_type: string;
	equal_split_amount: number | null;
	unequal_split_amount: number | null;
	percentage_split_amount: number | null;
}

export type { IAllTransactionsTable, ITransactionSplitsTable };

import { IAllUsersTable } from "./all_usersTable";

export interface ICreateTransactionForm {
	title?: string;
	amount?: number;
	tax?: number;
	category?: string;
	paidBy?: string;
	remarks?: string | null;
	splitBy?: {
		value: {
			type: string;
			users: { user: IAllUsersTable; amount: number }[];
		};
	};
}

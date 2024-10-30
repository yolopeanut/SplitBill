import { IAllUsersTable } from "./all_usersTable";

interface FormValues {
	currency: string;
	title?: string;
	amount?: number;
	tax?: number;
	category?: string;
	paidBy?: string;
	splitBy?: {
		type: string;
		users: IAllUsersTable[];
		equal_split_amount?: number | null;
		unequal_split_amount?: number | null;
		percentage_split_amount?: number | null;
	};
}

export default FormValues;

import { IAllUsersTable } from "./all_usersTable";

interface FormValues {
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

export default FormValues;

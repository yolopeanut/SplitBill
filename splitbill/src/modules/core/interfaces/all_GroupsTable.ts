import { IAllUsersTable } from "./all_usersTable";

interface IAllGroupsTable {
	id: string;
	created_at: string | null;
	name: string;
	img_src: string | null;
	img_url: string | null;
	currency: string;
	invite_link: string | null;
	balance: number | null;
	num_members: number | null;

	members:
		| {
				user: IAllUsersTable;
				joined_at: string | null;
		  }[]
		| null;
	admins: IAllUsersTable[] | null;
	// transaction_history: ITransactionTable[] | null;
}

export type { IAllGroupsTable };

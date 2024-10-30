import { IAllTransactionsTable } from "./all_transactionsTable";
import { IAllFriendsTable, IAllUsersTable } from "./all_usersTable";

interface IAllGroupsTable {
	id: string;
	created_at: string | null;
	name: string;
	img_src: string | null;
	img_url: string | null;
	currency: string;
	invite_link: string | null;
	to_pay: number | null;
	to_receive: number | null;
	num_members: number | null;

	members:
		| {
				user: IAllFriendsTable;
				joined_at: string | null;
		  }[]
		| null;
	admins: IAllUsersTable[] | null;
	transaction_history: IAllTransactionsTable[] | null;
}

export type { IAllGroupsTable };

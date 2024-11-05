interface IAllUsersTable {
	id: string;
	created_at: string | null;
	name: string;
	unique_username: string;
	profile_img_src: string;
	profile_img_url: string | null;
	owes_curr_user: number | null;
	owes_users: IAllUsersTable[] | null;
}

export type { IAllUsersTable };

interface IAllFriendsTable extends IAllUsersTable {
	friend_nickname: string | null;
	is_favourited: boolean;
}
export type { IAllFriendsTable };

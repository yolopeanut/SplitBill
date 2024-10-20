interface IAllFriendsTable {
	id: string;
	name: string;
	unique_username: string;
	profile_img_src: string;
	profile_img_url: string | null;
	friend_nickname: string | null;
	is_favourited: boolean;
	total_amount_owed: number;
}

export type { IAllFriendsTable };

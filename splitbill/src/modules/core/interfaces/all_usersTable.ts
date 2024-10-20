interface IAllUsersTable {
	id: string;
	created_at: string | null;
	name: string;
	unique_username: string;
	profile_img_src: string;
	profile_img_url: string | null;
}

export type { IAllUsersTable };

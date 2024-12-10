import { IAllFriendsTable } from "./all_usersTable";

export interface ICreateGroupForm {
	group_name: string;
	description: string;
	image_src: { file: File; url: string };
	image_url: string;
	currency: string;
	new_group_users: IAllFriendsTable[];
}

import { IAllFriendsTable } from "./all_usersTable";

export interface ICreateGroupForm {
	name: string;
	description: string;
	image_src: File;
	image_url: string;
	currency: string;
	new_group_users: IAllFriendsTable[];
}

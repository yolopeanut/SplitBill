import { IAllFriendsTable } from "./all_usersTable";

export interface ICreateGroupForm {
	name: string;
	description: string;
	image_src: File;
	currency: string;
	new_group_users: IAllFriendsTable[];
}

import { formatCurrency } from "../../../../../../../../core/common/commonFunctions";
import { IAllGroupsTable } from "../../../../../../../../core/interfaces/all_GroupsTable";
import { IAllUsersTable } from "../../../../../../../../core/interfaces/all_usersTable";

interface IOwedUserCardProps {
	oweUserId: string;
	amount: number;
	selectedGroup: IAllGroupsTable | null;
	getUser: (userId: string) => IAllUsersTable | undefined;
	OwedUser: IAllUsersTable | undefined;
}

const OwedUserCard = ({
	oweUserId,
	amount,
	selectedGroup,
	getUser,
	OwedUser,
}: IOwedUserCardProps) => {
	const owedUser = getUser(oweUserId);
	return (
		<>
			<div className='flex flex-col'>
				{amount > 0 ? (
					<span className='text-sm'>
						{owedUser?.name || ""} owes {OwedUser?.name}{" "}
						<span className='text-font-red-owes inline font-bold'>
							{formatCurrency(Math.abs(amount), selectedGroup?.currency || "RM")}
						</span>{" "}
					</span>
				) : (
					<span className=' text-sm'>
						{OwedUser?.name} owes {owedUser?.name}{" "}
						<span className='text-font-green-is-owed font-bold'>
							{formatCurrency(Math.abs(amount), selectedGroup?.currency || "RM")}
						</span>{" "}
					</span>
				)}
				<span className='text-font-text-gray text-xs'>@{owedUser?.unique_username}</span>
			</div>
		</>
	);
};

export default OwedUserCard;

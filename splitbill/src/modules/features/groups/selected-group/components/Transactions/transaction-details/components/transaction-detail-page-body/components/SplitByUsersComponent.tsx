import UserCardGeneric from "../../../../../../../../../core/common/components/UserCardGeneric";
import { ITransactionSplitsTable } from "../../../../../../../../../core/interfaces/all_transactionsTable";
import { IAllUsersTable } from "../../../../../../../../../core/interfaces/all_usersTable";
interface SplitByUsersComponentProps {
	splitByType: string;
	splitByUsers: ITransactionSplitsTable[];
	groupUsers: IAllUsersTable[];
	getUserNetAmountOwed: (user_id: string) => string;
}

const SplitByUsersComponent = ({
	splitByType,
	splitByUsers,
	groupUsers,
	getUserNetAmountOwed,
}: SplitByUsersComponentProps) => {
	console.log({ splitByUsers });

	return (
		<>
			{splitByUsers.map((user) => (
				<div
					key={user.split_user_id}
					className='flex flex-row gap-4 items-center justify-between'
				>
					<UserCardGeneric
						userid={user.split_user_id}
						groupUsers={groupUsers}
					/>

					<div className='bg-card-gray-dark rounded-lg px-4 py-[0.3rem] w-32 flex items-center justify-center font-bold'>
						{splitByType === "Percentage"
							? `${user.percentage_split_amount}%`
							: `RM ${getUserNetAmountOwed(user.split_user_id)}`}
					</div>
				</div>
			))}
		</>
	);
};

export default SplitByUsersComponent;

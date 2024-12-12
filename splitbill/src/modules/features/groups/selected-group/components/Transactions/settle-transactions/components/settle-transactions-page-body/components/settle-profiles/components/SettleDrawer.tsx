import { formatCurrency } from "../../../../../../../../../../../core/common/commonFunctions";
import CommonDrawer from "../../../../../../../../../../../core/common/components/CommonDrawer";
import UserCardGeneric from "../../../../../../../../../../../core/common/components/UserCardGeneric";
import { IAllUsersTable } from "../../../../../../../../../../../core/interfaces/all_usersTable";
import { IUserBalance } from "../../../../../../../../../../../core/interfaces/user_balances";
import { useGroupsContext } from "../../../../../../../../../hooks/useGroupsContext";

interface ISettleDrawer {
	isOpen: boolean;
	toggleDrawer: () => void;
	owesUsers: IUserBalance["owes_users"] | null;
	setSelectedRepayingUser: (user: IAllUsersTable | null) => void;
}

const SettleDrawer = ({
	isOpen,
	toggleDrawer,
	owesUsers,
	setSelectedRepayingUser,
}: ISettleDrawer) => {
	const { groupUsers, selectedGroup } = useGroupsContext();

	if (!owesUsers) return null;

	return (
		<CommonDrawer
			isOpen={isOpen}
			toggleDrawer={toggleDrawer}
		>
			<div className='flex flex-col gap-2'>
				{Object.entries(owesUsers).map(([userId, amount]) => {
					if (amount > 0) return null;

					const value = Math.abs(amount);

					return (
						<div
							key={userId}
							className='flex flex-row w-full justify-center items-center bg-background-gray rounded-lg py-1'
							onClick={() => {
								setSelectedRepayingUser(groupUsers?.find((user) => user.id === userId) || null);
								toggleDrawer();
							}}
						>
							<UserCardGeneric
								userid={userId}
								groupUsers={groupUsers}
							/>
							<div className='bg-background-gray h-[70%] rounded-lg p-2 flex justify-center items-center border border-brand-orange'>
								<span>{formatCurrency(value, selectedGroup?.currency || "MYR")}</span>
							</div>
						</div>
					);
				})}
			</div>
		</CommonDrawer>
	);
};

export default SettleDrawer;

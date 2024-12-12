import { useState } from "react";
import { IAllUsersTable } from "../../../../../../../../../core/interfaces/all_usersTable";
import useGetBalances from "../../../../../Balances/hooks/useGetBalances";
import { IBalances } from "../../../../../../../../../core/interfaces/user_balances";
import { useGroupsContext } from "../../../../../../../hooks/useGroupsContext";
import useUserContext from "../../../../../../../../login/hooks/useUserContext";

const useSettleTransactionBody = () => {
	const [selectedRepayingUser, setSelectedRepayingUser] = useState<IAllUsersTable | null>(null);
	const { allTransactions, groupUsers } = useGroupsContext();
	const { currentUser } = useUserContext();
	const { userBalances }: { userBalances: IBalances["userBalances"] } = useGetBalances({
		allTransactions,
		groupUsers,
	});

	// get all users that the current user owes money to
	const selectableUsers = Object.entries(userBalances!).find(
		([userId]) => userId === currentUser?.id
	);

	const owesUsers = selectableUsers?.[1]?.owes_users;

	return { selectedRepayingUser, setSelectedRepayingUser, owesUsers };
};

export default useSettleTransactionBody;

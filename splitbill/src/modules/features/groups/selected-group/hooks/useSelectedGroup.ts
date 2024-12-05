import { IAllGroupsTable } from "../../../../core/interfaces/all_GroupsTable";
import { useGetGroupUsers } from "../components/Transactions/transaction-details/edit-transaction/edit-transaction-page-body/components/paid-by-input/hooks/useGetGroupUsers";
import { useGetAllTransactions } from "../components/Transactions/hooks/useGetAllTransactions";
import { useParams } from "react-router-dom";
import { useGetSelectedGroup } from "./useGetSelectedGroup";
import useGetBalances from "../components/Balances/hooks/useGetBalances";
import { IBalances } from "../../../../core/interfaces/user_balances";
import { useEffect } from "react";
import { useGroupsContext } from "../../hooks/useGroupsContext";

interface SelectedGroupResult {
	selectedGroup?: IAllGroupsTable;
	isLoading: boolean;
	isLoadingAllTransactions: boolean;
	isLoadingGroupUsers: boolean;
	isLoadingBalances: boolean;
}

export const useSelectedGroup = (): SelectedGroupResult => {
	const {
		setGroupUsers,
		setSelectedGroupId,
		setSelectedGroup,
		setAllTransactions,
		setUserBalances,
	} = useGroupsContext();

	// Get group id
	const { groupId } = useParams();

	// Get selected group
	const { data: selectedGroup, isLoading } = useGetSelectedGroup(groupId || "");

	// Get all transactions
	const { data: allTransactions, isLoading: isLoadingAllTransactions } = useGetAllTransactions(
		groupId || ""
	);

	// Get group users
	const { data: groupUsers, isLoading: isLoadingGroupUsers } = useGetGroupUsers({
		group_id: groupId || "",
	});

	// Get user balances
	const {
		userBalances,
		isLoading: isLoadingBalances,
	}: { userBalances: IBalances["userBalances"]; isLoading: boolean } = useGetBalances({
		allTransactions,
		groupUsers,
	});

	useEffect(() => {
		if (groupUsers) {
			setGroupUsers(groupUsers);
		}
		if (groupId) {
			setSelectedGroupId(groupId);
		}
		if (selectedGroup) {
			setSelectedGroup(selectedGroup);
		}
		if (allTransactions) {
			setAllTransactions(allTransactions);
		}
		if (userBalances) {
			setUserBalances(userBalances);
		}
	}, [
		groupUsers,
		setGroupUsers,
		groupId,
		setSelectedGroupId,
		selectedGroup,
		setSelectedGroup,
		allTransactions,
		setAllTransactions,
		userBalances,
		setUserBalances,
	]);

	return {
		selectedGroup: selectedGroup,
		isLoading,
		isLoadingAllTransactions,
		isLoadingGroupUsers,
		isLoadingBalances,
	};
};

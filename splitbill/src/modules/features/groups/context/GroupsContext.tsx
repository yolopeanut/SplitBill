import { createContext, useState } from "react";
import { IAllGroupsTable } from "../../../core/interfaces/all_GroupsTable";
import { IAllUsersTable } from "../../../core/interfaces/all_usersTable";
import { IAllTransactionsTable } from "../../../core/interfaces/all_transactionsTable";

interface GroupsContextType {
	selectedGroup: IAllGroupsTable | null;
	setSelectedGroup: (group: IAllGroupsTable | null) => void;
	selectedGroupId: string | null;
	setSelectedGroupId: (id: string | null) => void;
	groupUsers: IAllUsersTable[] | null;
	setGroupUsers: (users: IAllUsersTable[] | null) => void;
	allTransactions: IAllTransactionsTable[] | undefined;
	setAllTransactions: (transactions: IAllTransactionsTable[] | undefined) => void;
}

const GroupsContext = createContext<GroupsContextType | undefined>(undefined);

export const GroupsProvider = ({ children }: { children: React.ReactNode }) => {
	const [selectedGroup, setSelectedGroup] = useState<IAllGroupsTable | null>(null);
	const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
	const [groupUsers, setGroupUsers] = useState<IAllUsersTable[] | null>(null);
	const [allTransactions, setAllTransactions] = useState<IAllTransactionsTable[] | undefined>(
		undefined
	);
	const value = {
		selectedGroup,
		setSelectedGroup,
		selectedGroupId,
		setSelectedGroupId,
		groupUsers,
		setGroupUsers,
		allTransactions,
		setAllTransactions,
	};
	return <GroupsContext.Provider value={value}>{children}</GroupsContext.Provider>;
};

export default GroupsContext;

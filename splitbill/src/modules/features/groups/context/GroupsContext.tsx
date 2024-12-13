import { createContext, useState, Dispatch, SetStateAction } from "react";
import { IAllGroupsTable } from "../../../core/interfaces/all_GroupsTable";
import { IAllUsersTable } from "../../../core/interfaces/all_usersTable";
import { IAllTransactionsTable } from "../../../core/interfaces/all_transactionsTable";
import { IBalances } from "../../../core/interfaces/user_balances";
import { AnalyticsTimeframeEnum } from "../../../core/enums/AnalyticsTimeframeEnum";

interface GroupsContextType {
	selectedGroup: IAllGroupsTable | null;
	setSelectedGroup: (group: IAllGroupsTable | null) => void;
	selectedGroupId: string | null;
	setSelectedGroupId: (id: string | null) => void;
	groupUsers: IAllUsersTable[] | undefined;
	setGroupUsers: (users: IAllUsersTable[] | undefined) => void;
	allTransactions: IAllTransactionsTable[] | undefined;
	setAllTransactions: (transactions: IAllTransactionsTable[] | undefined) => void;
	userBalances: IBalances["userBalances"] | undefined;
	setUserBalances: (balances: IBalances["userBalances"] | undefined) => void;
	selectedTimeFrame: AnalyticsTimeframeEnum;
	setSelectedTimeFrame: (timeFrame: AnalyticsTimeframeEnum) => void;
	isAnalyticsTimeframeDrawerOpen: boolean;
	setIsAnalyticsTimeframeDrawerOpen: Dispatch<SetStateAction<boolean>>;
	selectedGroupOrOwnAnalytics: string;
	setSelectedGroupOrOwnAnalytics: (analytics: string) => void;
	isAnalyticsGroupOrOwnerDrawerOpen: boolean;
	setIsAnalyticsGroupOrOwnerDrawerOpen: Dispatch<SetStateAction<boolean>>;
}

const GroupsContext = createContext<GroupsContextType | undefined>(undefined);

export const GroupsProvider = ({ children }: { children: React.ReactNode }) => {
	const [selectedGroup, setSelectedGroup] = useState<IAllGroupsTable | null>(null);
	const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
	const [groupUsers, setGroupUsers] = useState<IAllUsersTable[] | undefined>(undefined);
	const [allTransactions, setAllTransactions] = useState<IAllTransactionsTable[] | undefined>(
		undefined
	);
	const [userBalances, setUserBalances] = useState<IBalances["userBalances"] | undefined>(
		undefined
	);
	const [selectedTimeFrame, setSelectedTimeFrame] = useState<AnalyticsTimeframeEnum>(
		AnalyticsTimeframeEnum.CURRENT_MONTH
	);
	const [selectedGroupOrOwnAnalytics, setSelectedGroupOrOwnAnalytics] = useState<string>("group");
	const [isAnalyticsGroupOrOwnerDrawerOpen, setIsAnalyticsGroupOrOwnerDrawerOpen] = useState(false);

	const [isAnalyticsTimeframeDrawerOpen, setIsAnalyticsTimeframeDrawerOpen] = useState(false);
	const value = {
		selectedGroup,
		setSelectedGroup,
		selectedGroupId,
		setSelectedGroupId,
		groupUsers,
		setGroupUsers,
		allTransactions,
		setAllTransactions,
		userBalances,
		setUserBalances,
		selectedTimeFrame,
		setSelectedTimeFrame,
		isAnalyticsTimeframeDrawerOpen,
		setIsAnalyticsTimeframeDrawerOpen,
		selectedGroupOrOwnAnalytics,
		setSelectedGroupOrOwnAnalytics,
		isAnalyticsGroupOrOwnerDrawerOpen,
		setIsAnalyticsGroupOrOwnerDrawerOpen,
	};
	return <GroupsContext.Provider value={value}>{children}</GroupsContext.Provider>;
};

export default GroupsContext;

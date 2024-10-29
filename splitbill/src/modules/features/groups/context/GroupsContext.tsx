import { createContext, useState } from "react";
import { IAllGroupsTable } from "../../../core/interfaces/all_GroupsTable";

interface GroupsContextType {
	selectedGroup: IAllGroupsTable | null;
	setSelectedGroup: (group: IAllGroupsTable | null) => void;
	selectedGroupId: string | null;
	setSelectedGroupId: (id: string | null) => void;
}

const GroupsContext = createContext<GroupsContextType | undefined>(undefined);

export const GroupsProvider = ({ children }: { children: React.ReactNode }) => {
	const [selectedGroup, setSelectedGroup] = useState<IAllGroupsTable | null>(null);
	const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
	const value = {
		selectedGroup,
		setSelectedGroup,
		selectedGroupId,
		setSelectedGroupId,
	};
	return <GroupsContext.Provider value={value}>{children}</GroupsContext.Provider>;
};

export default GroupsContext;

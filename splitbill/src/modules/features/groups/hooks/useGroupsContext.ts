import { useContext } from "react";
import GroupsContext from "../context/GroupsContext";

export const useGroupsContext = () => {
	const context = useContext(GroupsContext);
	if (!context) {
		throw new Error("useGroupsContext must be used within a GroupsProvider");
	}
	return context;
};

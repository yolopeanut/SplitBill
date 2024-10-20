import { useContext } from "react";
import FriendsContext from "../context/FriendsContext";

const useFriendsContext = () => {
	return useContext(FriendsContext);
};

export default useFriendsContext;

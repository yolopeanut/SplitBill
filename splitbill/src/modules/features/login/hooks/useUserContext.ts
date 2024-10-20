import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const useUserContext = () => {
	const { currentUser, hasCreatedProfile, getUserById } = useContext(UserContext);
	return { currentUser, hasCreatedProfile, getUserById };
};

export default useUserContext;

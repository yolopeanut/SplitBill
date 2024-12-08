import useUserContext from "../../../login/hooks/useUserContext";
import { useGroupsContext } from "../../hooks/useGroupsContext";

const useGetHeaderBalances = () => {
	const { userBalances } = useGroupsContext();
	const { currentUser } = useUserContext();

	const totalToPay = Object.values(userBalances?.[currentUser?.id ?? ""]?.owes_users ?? {}).reduce(
		(acc, curr) => {
			if (curr < 0) {
				return acc + curr;
			}
			return acc;
		},
		0
	);

	const totalToReceive = Object.values(
		userBalances?.[currentUser?.id ?? ""]?.owes_users ?? {}
	).reduce((acc, curr) => {
		if (curr > 0) {
			return acc + curr;
		}
		return acc;
	}, 0);

	return {
		totalToPay,
		totalToReceive,
	};
};

export default useGetHeaderBalances;

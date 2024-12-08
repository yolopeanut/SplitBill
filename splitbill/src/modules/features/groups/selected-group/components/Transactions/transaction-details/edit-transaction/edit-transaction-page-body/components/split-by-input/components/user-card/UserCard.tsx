import { ControllerRenderProps, UseFormGetValues } from "react-hook-form";
import { ICreateTransactionForm } from "../../../../../../../../../../../../core/interfaces/createTransactionForm";
import { IAllUsersTable } from "../../../../../../../../../../../../core/interfaces/all_usersTable";
import UserCardCustomSplit from "./components/UserCardCustomSplit";
import UserCardPercentageSplit from "./components/UserCardPercentageSplit";
import UserCardEqualSplit from "./components/UserCardEqualSplit";
import UserCardDefault from "./components/UserCardDefault";
import { useEffect, useState } from "react";

interface UserCardProps {
	user: IAllUsersTable;
	field: ControllerRenderProps<ICreateTransactionForm, "splitBy"> | undefined;
	selectedSplitType: string | undefined;
	getValues: UseFormGetValues<ICreateTransactionForm>;
}

const UserCard = ({ user, field, selectedSplitType, getValues }: UserCardProps) => {
	const [originalSplitBy, setOriginalSplitBy] = useState<
		ICreateTransactionForm["splitBy"] | undefined
	>(getValues().splitBy);

	// Set original split by when the form is mounted (needed for transaction split id)
	useEffect(() => {
		setOriginalSplitBy(getValues().splitBy);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!field) return <UserCardDefault user={user} />;
	if (selectedSplitType?.toLowerCase() === "equal")
		return (
			<UserCardEqualSplit
				key={user.id}
				user={user}
				field={field}
				getValues={getValues}
				originalSplitBy={originalSplitBy}
			/>
		);
	else if (selectedSplitType?.toLowerCase() === "custom")
		return (
			<UserCardCustomSplit
				key={user.id}
				user={user}
				field={field}
				getValues={getValues}
				originalSplitBy={originalSplitBy}
			/>
		);
	else if (selectedSplitType?.toLowerCase() === "percentage")
		return (
			<UserCardPercentageSplit
				key={user.id}
				user={user}
				field={field}
				getValues={getValues}
				originalSplitBy={originalSplitBy}
			/>
		);
};

export default UserCard;

import { ControllerRenderProps, UseFormGetValues } from "react-hook-form";
import { ICreateTransactionForm } from "../../../../../../../../../../core/interfaces/createTransactionForm";
import { IAllUsersTable } from "../../../../../../../../../../core/interfaces/all_usersTable";
import UserCardDefault from "./components/user-card-default/UserCardDefault";
import UserCardCustomSplit from "./components/user-card-custom-split/UserCardCustomSplit";
import UserCardEqualSplit from "./components/user-card-equal-split/UserCardEqualSplit";
import UserCardPercentageSplit from "./components/user-card-percentage-split/UserCardPercentageSplit";

interface IUserCardProps {
	user: IAllUsersTable;
	field: ControllerRenderProps<ICreateTransactionForm, "splitBy"> | undefined;
	selectedSplitType: string | undefined;
	getValues: UseFormGetValues<ICreateTransactionForm>;
}

const UserCard = ({ user, field, selectedSplitType, getValues }: IUserCardProps) => {
	if (!field) return <UserCardDefault user={user} />;
	if (selectedSplitType?.toLowerCase() === "equal")
		return (
			<UserCardEqualSplit
				key={user.id}
				user={user}
				field={field}
				getValues={getValues}
			/>
		);
	else if (selectedSplitType?.toLowerCase() === "custom")
		return (
			<UserCardCustomSplit
				key={user.id}
				user={user}
				field={field}
				getValues={getValues}
			/>
		);
	else if (selectedSplitType?.toLowerCase() === "percentage")
		return (
			<UserCardPercentageSplit
				key={user.id}
				user={user}
				field={field}
				getValues={getValues}
			/>
		);
};

export default UserCard;

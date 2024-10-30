// react
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";

// react-icons
import { IoArrowBack } from "react-icons/io5";
import { FaShareSquare } from "react-icons/fa";

// interfaces
import { IAllGroupsTable } from "../../../core/interfaces/all_GroupsTable";
import { formatCurrency, getInitials } from "../../../core/common/commonFunctions";

// components
import { useEffect, useState } from "react";
import Badges from "./components/BadgesComponent";
import Transactions from "./components/Transactions/TransactionsComponent";
import Balances from "./components/Balances/BalancesComponent";
import Analytics from "./components/Analytics/AnalyticsComponent";
import DropdownComponent from "./components/DropdownComponent";
import { useGetSelectedGroup } from "./hooks/useGetSelectedGroup";
import Loading from "../../../core/common/components/Loading";
import { useGetAllTransactions } from "./hooks/useGetAllTransactions";
import { IAllTransactionsTable } from "../../../core/interfaces/all_transactionsTable";
import { useGetGroupUsers } from "./hooks/useGetGroupUsers";
import { useGroupsContext } from "../hooks/useGroupsContext";

const handleEditGroupDropDown = ({
	navigate,
	groupId,
}: {
	navigate: NavigateFunction;
	groupId: string;
}) => {
	navigate(`/groups/${groupId}/edit-group`);
};

const handleLeaveGroupDropDown = () => {
	console.log("leave group");
};

//=========== Selected Group Page ============//
const SelectedGroupPage = () => {
	const { groupId } = useParams();
	const { data: selectedGroup, isLoading } = useGetSelectedGroup(groupId || "");
	const { data: allTransactions, isLoading: isLoadingAllTransactions } = useGetAllTransactions(
		groupId || ""
	);
	const { data: groupUsers, isLoading: isLoadingGroupUsers } = useGetGroupUsers({
		group_id: groupId || "",
	});

	const { setGroupUsers, setSelectedGroupId } = useGroupsContext();
	useEffect(() => {
		if (groupUsers) {
			setGroupUsers(groupUsers);
		}
		if (groupId) {
			setSelectedGroupId(groupId);
		}
	}, [groupUsers, setGroupUsers, groupId, setSelectedGroupId]);

	// If loading, show loading screen
	if (isLoading || isLoadingAllTransactions || isLoadingGroupUsers) {
		return <Loading />;
	}

	return (
		<>
			<div className='flex flex-col gap-4 relative p-1 h-full overflow-y-auto'>
				<SelectedGroupHeader selectedGroup={selectedGroup} />
				<SelectedGroupBody allTransactions={allTransactions} />
			</div>
		</>
	);
};
export default SelectedGroupPage;
//=========== Selected Group Page ============//

//=========== Selected Group Header ============//
const SelectedGroupHeader = ({ selectedGroup }: { selectedGroup: IAllGroupsTable | undefined }) => {
	const navigate = useNavigate();

	const GroupImg = ({ className }: { className: string }) => {
		if (selectedGroup?.img_url) {
			return (
				<img
					src={selectedGroup.img_url}
					alt='group'
					className={className}
				/>
			);
		}
		return (
			<div className='w-10 h-10 rounded-full bg-brand-orange'>
				{getInitials(selectedGroup?.name || "")}
			</div>
		);
	};

	// Styling classes for to pay, to receive, and total amounts
	const amountClass = "text-font-white text-sm font-bold";
	const amountTitleClass = "text-font-white text-xs font-light";

	return (
		<>
			<div className='min-h-48 flex flex-col justify-between'>
				{/* Header and bg image */}
				<div className='flex flex-row justify-between items-center relative px-4 py-2'>
					<GroupImg className='w-screen absolute left-0 object-cover h-64 -z-10 brightness-[40%]' />
					<button
						className='btn border-none p-0'
						onClick={() => {
							navigate("/groups");
						}}
					>
						<IoArrowBack
							size={20}
							className='text-brand-orange'
						/>
					</button>
					<span className='text-font-white text-xl font-semibold absolute left-1/2 -translate-x-1/2'>
						{selectedGroup?.name}
					</span>

					<div className='flex flex-row items-center'>
						<FaShareSquare
							size={20}
							className='text-brand-orange'
						/>
						<DropdownComponent
							editGroup={() =>
								handleEditGroupDropDown({ navigate, groupId: selectedGroup?.id || "" })
							}
							leaveGroup={handleLeaveGroupDropDown}
						/>
					</div>
				</div>

				{/* Amounts Bar */}
				<div className='px-4 pt-4'>
					<div className='flex flex-row justify-between items-center py-2 bg-card-gray-dark px-4 h-16 rounded-xl'>
						<div className='flex flex-col gap-2 items-center'>
							<span className={amountTitleClass}>To pay</span>
							<span className={amountClass}>
								{formatCurrency(
									selectedGroup?.to_pay ? selectedGroup.to_pay : 0,
									selectedGroup?.currency || ""
								)}
							</span>
						</div>
						<div className='flex flex-col gap-2 items-center'>
							<span className={amountTitleClass}>To receive</span>
							<span className={amountClass}>
								{formatCurrency(
									selectedGroup?.to_receive ? selectedGroup.to_receive : 0,
									selectedGroup?.currency || ""
								)}
							</span>
						</div>
						<div className='flex flex-col gap-2 items-center'>
							<span className={amountTitleClass}>Total</span>
							<span className={amountClass}>
								{formatCurrency(
									(selectedGroup?.to_pay ? selectedGroup.to_pay : 0) +
										(selectedGroup?.to_receive ? selectedGroup.to_receive : 0),
									selectedGroup?.currency || ""
								)}
							</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
//=========== Selected Group Header ============//

//=========== Selected Group Body ============//
const SelectedGroupBody = ({
	allTransactions,
}: {
	allTransactions: IAllTransactionsTable[] | undefined;
}) => {
	const [selectedBadge, setSelectedBadge] = useState("Transactions");
	console.log(allTransactions);
	return (
		<div className='flex flex-col gap-4 px-4 w-full h-full'>
			<Badges
				selectedBadge={selectedBadge}
				setSelectedBadge={setSelectedBadge}
			/>
			{selectedBadge === "Transactions" && <Transactions allTransactions={allTransactions} />}
			{selectedBadge === "Balances" && <Balances />}
			{selectedBadge === "Analytics" && <Analytics />}
		</div>
	);
};
//=========== Selected Group Body ============//

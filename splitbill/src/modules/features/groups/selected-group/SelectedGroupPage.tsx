// react
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";

// react-icons
import { IoArrowBack } from "react-icons/io5";
import { FaShareSquare } from "react-icons/fa";

// interfaces
import { IAllGroupsTable } from "../../../core/interfaces/all_GroupsTable";
import { formatCurrency } from "../../../core/common/commonFunctions";

// components
import { useCallback, useEffect, useRef, useState } from "react";
import Badges from "./components/BadgesComponent";
import Transactions from "./components/Transactions/TransactionsComponent";
import Balances from "./components/Balances/BalancesComponent";
import Analytics from "./components/Analytics/AnalyticsComponent";
import DropdownComponent from "./components/DropdownComponent";
import Loading from "../../../core/common/components/Loading";
import { useGroupsContext } from "../hooks/useGroupsContext";
import { useGetSelectedGroup } from "./hooks/useGetSelectedGroup";
import { useGetAllTransactions } from "./components/Transactions/hooks/useGetAllTransactions";
import { useGetGroupUsers } from "./hooks/useGetGroupUsers";
import { IBalances } from "../../../core/interfaces/user_balances";
import useGetBalances from "./components/Balances/hooks/useGetBalances";
import useGetHeaderBalances from "./hooks/useGetHeaderBalances";
import GroupImg from "./components/GroupImg";

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
	const {
		setGroupUsers,
		setSelectedGroupId,
		setSelectedGroup,
		setAllTransactions,
		setUserBalances,
	} = useGroupsContext();

	// Get group id
	const { groupId } = useParams();

	// Get selected group
	const { data: selectedGroup, isLoading } = useGetSelectedGroup(groupId || "");

	// Get all transactions
	const { data: allTransactions, isLoading: isLoadingAllTransactions } = useGetAllTransactions(
		groupId || ""
	);

	// Get group users
	const { data: groupUsers, isLoading: isLoadingGroupUsers } = useGetGroupUsers({
		group_id: groupId || "",
	});

	// Get user balances
	const {
		userBalances,
		isLoading: isLoadingBalances,
	}: { userBalances: IBalances["userBalances"]; isLoading: boolean } = useGetBalances({
		allTransactions,
		groupUsers,
	});

	useEffect(() => {
		if (groupUsers) {
			setGroupUsers(groupUsers);
		}
		if (groupId) {
			setSelectedGroupId(groupId);
		}
		if (selectedGroup) {
			setSelectedGroup(selectedGroup);
		}
		if (allTransactions) {
			setAllTransactions(allTransactions);
		}
		if (userBalances) {
			setUserBalances(userBalances);
		}
	}, [
		groupUsers,
		setGroupUsers,
		groupId,
		setSelectedGroupId,
		selectedGroup,
		setSelectedGroup,
		allTransactions,
		setAllTransactions,
		userBalances,
		setUserBalances,
	]);

	// If loading, show loading screen
	if (isLoading || isLoadingAllTransactions || isLoadingGroupUsers || isLoadingBalances) {
		return <Loading />;
	}

	return (
		<>
			<div className='flex flex-col gap-4 relative'>
				<SelectedGroupHeader selectedGroup={selectedGroup} />
				<SelectedGroupBody />
			</div>
		</>
	);
};
export default SelectedGroupPage;
//=========== Selected Group Page ============//

//=========== Selected Group Header ============//
const SelectedGroupHeader = ({ selectedGroup }: { selectedGroup: IAllGroupsTable | undefined }) => {
	const navigate = useNavigate();

	// Styling classes for to pay, to receive, and total amounts
	const amountClass = "text-font-white text-sm font-bold";
	const amountTitleClass = "text-font-white text-xs font-light";

	const { totalToPay, totalToReceive } = useGetHeaderBalances();

	return (
		<>
			<div className='min-h-48 flex flex-col justify-between w-full'>
				{/* Header and bg image */}
				<div className='flex flex-row justify-between items-center relative px-4 py-2'>
					<GroupImg
						className='w-screen absolute left-0 object-cover h-64 -z-10 brightness-[40%]'
						selectedGroup={selectedGroup}
					/>
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
								{formatCurrency(Math.abs(totalToPay), selectedGroup?.currency || "")}
							</span>
						</div>
						<div className='flex flex-col gap-2 items-center'>
							<span className={amountTitleClass}>To receive</span>
							<span className={amountClass}>
								{formatCurrency(totalToReceive, selectedGroup?.currency || "")}
							</span>
						</div>
						<div className='flex flex-col gap-2 items-center'>
							<span className={amountTitleClass}>Total</span>
							<span className={amountClass}>
								{formatCurrency(totalToPay + totalToReceive, selectedGroup?.currency || "")}
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
const SelectedGroupBody = () => {
	const [selectedBadge, setSelectedBadge] = useState("Transactions");
	const { groupId } = useParams();
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	const handleScroll = useCallback(
		(event: React.UIEvent<HTMLDivElement>) => {
			const scrollPosition = event.currentTarget.scrollTop;

			const timeoutId = setTimeout(() => {
				sessionStorage.setItem(`transactions-scroll-${groupId}`, scrollPosition.toString());
			}, 100);

			return () => clearTimeout(timeoutId);
		},
		[groupId]
	);
	// Add useEffect to restore scroll position on mount
	useEffect(() => {
		const savedScrollPosition = sessionStorage.getItem(`transactions-scroll-${groupId}`);
		if (savedScrollPosition && scrollContainerRef.current) {
			scrollContainerRef.current.scrollTop = parseInt(savedScrollPosition);
		}
	}, [groupId]);

	return (
		<>
			<div className='flex flex-row justify-between items-center px-4'>
				<Badges
					selectedBadge={selectedBadge}
					setSelectedBadge={setSelectedBadge}
				/>
			</div>
			<div
				className='flex flex-col gap-4 px-4 w-full h-full overflow-auto'
				onScroll={handleScroll}
				ref={scrollContainerRef}
			>
				{selectedBadge === "Transactions" && <Transactions />}
				{selectedBadge === "Balances" && <Balances />}
				{selectedBadge === "Analytics" && <Analytics />}
			</div>
		</>
	);
};
//=========== Selected Group Body ============//

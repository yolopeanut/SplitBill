// react
import { useNavigate, useParams } from "react-router-dom";

// react-icons
import { IoArrowBack } from "react-icons/io5";
import { FaShareSquare } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";

// interfaces
import { IAllGroupsTable } from "../../../core/interfaces/all_GroupsTable";
import { IAllFriendsTable, IAllUsersTable } from "../../../core/interfaces/all_usersTable";
import { formatCurrency, getInitials } from "../../../core/common/commonFunctions";

// components
import { useEffect, useState } from "react";
import Badges from "./components/BadgesComponent";
import Transactions from "./components/Transactions/TransactionsComponent";
import Balances from "./components/Balances/BalancesComponent";
import Analytics from "./components/Analytics/AnalyticsComponent";
import { useGroupsContext } from "../hooks/useGroupsContext";

const mockData = {
	id: "1",
	created_at: "2021-01-01",
	name: "yomama",
	img_src: "1729435490604-ccdr 2024-04-29 173202.387.jpeg",
	img_url:
		"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzndTVBnZT77MkpzCBozPmVf-1SJtu5DNsug&s",
	currency: "RM",
	invite_link: null,
	to_pay: 100,
	to_receive: 100,
	num_members: 1,
	members: [
		{
			user: {
				id: "1",
				created_at: "2021-01-01",
				name: "John Doe",
				unique_username: "johndoe",
				profile_img_src: "1729435490604-ccdr 2024-04-29 173202.387.jpeg",
				profile_img_url:
					"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzndTVBnZT77MkpzCBozPmVf-1SJtu5DNsug&s",
				owes_curr_user: 100,
				friend_nickname: "John",
				is_favourited: false,
			} as IAllFriendsTable,
			joined_at: "2021-01-01",
		},
	] as { user: IAllFriendsTable; joined_at: string }[],
	admins: [
		{
			id: "1",
			created_at: "2021-01-01",
			name: "John Doe",
			unique_username: "johndoe",
			profile_img_src: "1729435490604-ccdr 2024-04-29 173202.387.jpeg",
			profile_img_url:
				"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzndTVBnZT77MkpzCBozPmVf-1SJtu5DNsug&s",
		},
	] as IAllUsersTable[],
} as IAllGroupsTable;

//=========== Selected Group Page ============//
const SelectedGroupPage = () => {
	const { groupId } = useParams();
	const { setSelectedGroupId } = useGroupsContext();
	useEffect(() => {
		setSelectedGroupId(groupId || "");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [groupId]);

	if (!groupId) {
		return <div>No group ID</div>;
	}

	return (
		<>
			<div className='flex flex-col gap-4 relative p-1 h-full overflow-y-auto'>
				<SelectedGroupHeader groupName={mockData.name} />
				<SelectedGroupBody />
			</div>
		</>
	);
};
export default SelectedGroupPage;
//=========== Selected Group Page ============//

//=========== Selected Group Header ============//
const SelectedGroupHeader = ({ groupName }: { groupName: string }) => {
	const navigate = useNavigate();

	const GroupImg = ({ className }: { className: string }) => {
		if (mockData.img_url) {
			return (
				<img
					src={mockData.img_url}
					alt='group'
					className={className}
				/>
			);
		}
		return <div className='w-10 h-10 rounded-full bg-brand-orange'>{getInitials(groupName)}</div>;
	};

	// Styling classes for to pay, to receive, and total amounts
	const amountClass = "text-font-white text-sm font-bold";
	const amountTitleClass = "text-font-white text-xs font-light";

	return (
		<>
			<div className='min-h-48 flex flex-col justify-between'>
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
						{groupName}
					</span>

					<div className='flex flex-row gap-4'>
						<FaShareSquare
							size={20}
							className='text-brand-orange'
						/>
						<SlOptions
							size={20}
							className='text-brand-orange'
						/>
					</div>
				</div>

				<div className='px-4 pt-4'>
					<div className='flex flex-row justify-between items-center py-2 bg-card-gray-dark px-4 h-16 rounded-xl'>
						<div className='flex flex-col gap-2 items-center'>
							<span className={amountTitleClass}>To pay</span>
							<span className={amountClass}>
								{formatCurrency(mockData.to_pay ? mockData.to_pay : 0, mockData.currency)}
							</span>
						</div>
						<div className='flex flex-col gap-2 items-center'>
							<span className={amountTitleClass}>To receive</span>
							<span className={amountClass}>
								{formatCurrency(mockData.to_receive ? mockData.to_receive : 0, mockData.currency)}
							</span>
						</div>
						<div className='flex flex-col gap-2 items-center'>
							<span className={amountTitleClass}>Total</span>
							<span className={amountClass}>
								{formatCurrency(
									(mockData.to_pay ? mockData.to_pay : 0) +
										(mockData.to_receive ? mockData.to_receive : 0),
									mockData.currency
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
const SelectedGroupBody = () => {
	const [selectedBadge, setSelectedBadge] = useState("Transactions");
	return (
		<div className='flex flex-col gap-4 px-4 w-full h-full'>
			<Badges
				selectedBadge={selectedBadge}
				setSelectedBadge={setSelectedBadge}
			/>
			{selectedBadge === "Transactions" && <Transactions />}
			{selectedBadge === "Balances" && <Balances />}
			{selectedBadge === "Analytics" && <Analytics />}
		</div>
	);
};
//=========== Selected Group Body ============//

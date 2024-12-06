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
import useGetHeaderBalances from "./hooks/useGetHeaderBalances";
import GroupImg from "./components/GroupImg";
import { useSelectedGroup } from "./hooks/useSelectedGroup";

// Import Swiper React components
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface handleEditGroupDropDownProps {
	navigate: NavigateFunction;
	groupId: string;
}

const handleEditGroupDropDown = ({ navigate, groupId }: handleEditGroupDropDownProps) => {
	navigate(`/groups/${groupId}/edit-group`);
};

const handleLeaveGroupDropDown = () => {
	console.log("leave group");
};

//=========== Selected Group Page ============//
const SelectedGroupPage = () => {
	const {
		selectedGroup,
		isLoading,
		isLoadingAllTransactions,
		isLoadingGroupUsers,
		isLoadingBalances,
	} = useSelectedGroup();

	// If loading, show loading screen
	if (isLoading || isLoadingAllTransactions || isLoadingGroupUsers || isLoadingBalances) {
		return <Loading />;
	}

	return (
		<>
			<div className='flex flex-col gap-4 relative h-[calc(100vh-4rem)]'>
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
	const swiperRef = useRef<SwiperClass | null>(null);

	// Handle slide changes and scroll reset
	const handleSlideChange = (swiper: SwiperClass) => {
		const badges = ["Transactions", "Balances", "Analytics"];
		setSelectedBadge(badges[swiper.activeIndex]);
	};

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
					swiperRef={swiperRef}
				/>
			</div>
			<div
				className='flex flex-col gap-4 px-4 w-full h-[calc(100vh-9.75rem)] overflow-y-auto'
				onScroll={handleScroll}
				ref={scrollContainerRef}
			>
				<Swiper
					modules={[]}
					spaceBetween={50}
					slidesPerView={1}
					onSlideChange={handleSlideChange}
					onSwiper={(swiper) => {
						swiperRef.current = swiper;
					}}
					touchRatio={1}
					resistance={true}
					resistanceRatio={0.85}
					threshold={5}
					updateOnWindowResize={true}
					observer={true}
					observeParents={true}
					className='w-full h-full overflow-y-auto'
				>
					<SwiperSlide className='h-full'>
						<div className='h-full'>
							<Transactions />
						</div>
					</SwiperSlide>
					<SwiperSlide className='h-full'>
						<div className='h-full'>
							<Balances />
						</div>
					</SwiperSlide>
					<SwiperSlide className='h-full'>
						<div className='h-full'>
							<Analytics />
						</div>
					</SwiperSlide>
				</Swiper>
			</div>
		</>
	);
};
//=========== Selected Group Body ============//

import CommonDrawer from "../../../../../core/common/components/CommonDrawer";
import { AnalyticsTimeframeEnum } from "../../../../../core/enums/AnalyticsTimeframeEnum";
import { DropdownItem } from "../../../../../core/common/components/CommonDropdownComponent";
import { useGroupsContext } from "../../../hooks/useGroupsContext";
import { BsFillCalendar2CheckFill } from "react-icons/bs";

const AnalyticsTimeframeDrawer = () => {
	const {
		setSelectedTimeFrame,
		isAnalyticsTimeframeDrawerOpen,
		setIsAnalyticsTimeframeDrawerOpen,
		selectedTimeFrame,
	} = useGroupsContext();

	const dropdownItems: DropdownItem[] = [
		{
			icon: null,
			label: AnalyticsTimeframeEnum.CURRENT_MONTH,
			onClick: () => {
				setSelectedTimeFrame(AnalyticsTimeframeEnum.CURRENT_MONTH);
				setIsAnalyticsTimeframeDrawerOpen(false);
			},
		},
		{
			icon: null,
			label: AnalyticsTimeframeEnum.LAST_MONTH,
			onClick: () => {
				setSelectedTimeFrame(AnalyticsTimeframeEnum.LAST_MONTH);
				setIsAnalyticsTimeframeDrawerOpen(false);
			},
		},
		{
			icon: null,
			label: AnalyticsTimeframeEnum.THIS_YEAR,
			onClick: () => {
				setSelectedTimeFrame(AnalyticsTimeframeEnum.THIS_YEAR);
				setIsAnalyticsTimeframeDrawerOpen(false);
			},
		},
		{
			icon: null,
			label: AnalyticsTimeframeEnum.ALL_TIME,
			onClick: () => {
				setSelectedTimeFrame(AnalyticsTimeframeEnum.ALL_TIME);
				setIsAnalyticsTimeframeDrawerOpen(false);
			},
		},
	];

	return (
		<CommonDrawer
			isOpen={isAnalyticsTimeframeDrawerOpen}
			toggleDrawer={() => setIsAnalyticsTimeframeDrawerOpen(false)}
		>
			<div className='flex flex-col items-center justify-center gap-8 w-full h-full'>
				<div className='text-xl text-font-white font-semibold flex items-center justify-center gap-2'>
					Select Timeframe
					<BsFillCalendar2CheckFill
						size={20}
						className='text-brand-orange'
					/>
				</div>

				<div className='text-center text-white text-2xl font-semibold flex flex-col items-center justify-center gap-2 w-full'>
					{dropdownItems.map((item) => (
						<div
							key={item.label}
							onClick={item.onClick}
							className={`${
								selectedTimeFrame === item.label
									? "bg-brand-orange text-font-black border-none"
									: "text-white border border-brand-orange"
							} text-base font-bold rounded-xl p-2 cursor-pointer w-60`}
						>
							{item.label}
						</div>
					))}
				</div>
			</div>
		</CommonDrawer>
	);
};

export default AnalyticsTimeframeDrawer;

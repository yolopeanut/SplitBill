import CommonDrawer from "../../../../../core/common/components/CommonDrawer";
import { DropdownItem } from "../../../../../core/common/components/CommonDropdownComponent";
import { useGroupsContext } from "../../../hooks/useGroupsContext";
import { RiMapPinUserFill } from "react-icons/ri";
import { RiGroup3Fill } from "react-icons/ri";
import { IoAnalytics } from "react-icons/io5";
import { AnalyticsGroupOrOwnerEnum } from "../../../../../core/enums/AnalyticsTimeframeEnum";

const AnalyticsGroupOrOwnerDrawer = () => {
	const {
		setSelectedGroupOrOwnAnalytics,
		selectedGroupOrOwnAnalytics,
		isAnalyticsGroupOrOwnerDrawerOpen,
		setIsAnalyticsGroupOrOwnerDrawerOpen,
	} = useGroupsContext();

	const dropdownItems: DropdownItem[] = [
		{
			icon: (
				<RiMapPinUserFill
					size={20}
					className='text-brand-orange'
				/>
			),
			label: AnalyticsGroupOrOwnerEnum.GROUP,
			onClick: () => {
				setSelectedGroupOrOwnAnalytics(AnalyticsGroupOrOwnerEnum.GROUP);
				setIsAnalyticsGroupOrOwnerDrawerOpen(false);
			},
		},
		{
			icon: (
				<RiGroup3Fill
					size={20}
					className='text-brand-orange'
				/>
			),
			label: AnalyticsGroupOrOwnerEnum.ME,
			onClick: () => {
				setSelectedGroupOrOwnAnalytics(AnalyticsGroupOrOwnerEnum.ME);
				setIsAnalyticsGroupOrOwnerDrawerOpen(false);
			},
		},
	];

	return (
		<CommonDrawer
			isOpen={isAnalyticsGroupOrOwnerDrawerOpen}
			toggleDrawer={() => setIsAnalyticsGroupOrOwnerDrawerOpen(false)}
		>
			<div className='flex flex-col items-center justify-center gap-8 w-full h-full pb-16'>
				<div className='flex flex-col text-xl text-font-white font-semibold items-center justify-center gap-2'>
					<IoAnalytics
						size={50}
						className='text-brand-orange'
					/>
					<span className='text-base font-semibold text-center'>
						Do you want to see the analytics for the yourself or the group?
					</span>
				</div>

				<div className='text-center text-white text-2xl font-semibold flex flex-row items-center justify-center gap-2 w-full'>
					{dropdownItems.map((item) => (
						<div
							key={item.label}
							onClick={item.onClick}
							className={`${
								selectedGroupOrOwnAnalytics === item.label
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

export default AnalyticsGroupOrOwnerDrawer;

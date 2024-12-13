import { RiArrowDropDownLine } from "react-icons/ri";
import { useGroupsContext } from "../../../../../hooks/useGroupsContext";

const TimeframeSelector = () => {
	const { selectedTimeFrame, setIsAnalyticsTimeframeDrawerOpen, isAnalyticsTimeframeDrawerOpen } =
		useGroupsContext();
	return (
		<>
			<div className='w-full flex justify-center items-center'>
				<div
					onClick={() => {
						setIsAnalyticsTimeframeDrawerOpen(!isAnalyticsTimeframeDrawerOpen);
					}}
					className='w-40 border border-brand-orange text-center flex items-center justify-center gap-0 rounded-xl cursor-pointer'
				>
					<span className='pl-4 text-font-white text-sm font-semibold'>{selectedTimeFrame}</span>
					<RiArrowDropDownLine
						className={`text-font-white ${isAnalyticsTimeframeDrawerOpen ? "rotate-180" : ""}`}
						size={30}
					/>
				</div>
			</div>
		</>
	);
};

export default TimeframeSelector;

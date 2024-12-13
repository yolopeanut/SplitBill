import AnalyticsBody from "./components/analytics-body/AnalyticsBody";
import TimeframeSelector from "./components/timeframe-selector/TimeframeSelector";

const Analytics = () => {
	return (
		<>
			<div className='overflow-visible'>
				<div className='h-[63vh] overflow-y-auto pb-40 overflow-visible flex flex-col gap-4'>
					<TimeframeSelector />
					<AnalyticsBody />
				</div>
			</div>
		</>
	);
};

export default Analytics;

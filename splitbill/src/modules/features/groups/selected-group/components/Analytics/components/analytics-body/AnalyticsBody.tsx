import { useGroupsContext } from "../../../../../hooks/useGroupsContext";
import TotalAmounts from "./components/total-amounts/TotalAmounts";
import { RiArrowDropDownLine } from "react-icons/ri";
import ChartComponent from "./components/chart-component/ChartComponent";
import CategorySpendingComponent from "./components/category-spending-component/CategorySpendingComponent";

const AnalyticsBody = () => {
	const { selectedGroupOrOwnAnalytics, setIsAnalyticsGroupOrOwnerDrawerOpen } = useGroupsContext();

	return (
		<>
			<div className='flex flex-col gap-4'>
				<div className='w-full bg-card-gray-dark rounded-xl p-4 px-8 flex flex-row gap-4'>
					<TotalAmounts />
				</div>
				<div className='flex flex-col w-full h-full bg-card-gray-dark rounded-xl p-4 px-8'>
					<div
						className='flex flex-row justify-between items-center'
						onClick={() => {
							setIsAnalyticsGroupOrOwnerDrawerOpen(true);
						}}
					>
						<span className='text-font-text-gray text-sm'>
							Expense Categories{" "}
							<span className='font-bold text-brand-orange'>({selectedGroupOrOwnAnalytics})</span>
						</span>
						<RiArrowDropDownLine
							className='text-font-white'
							size={30}
						/>
					</div>
					<div className='w-full h-full flex flex-col justify-center items-center gap-4'>
						<div className='w-[60%] flex flex-col justify-center items-center '>
							<ChartComponent />
						</div>
						<div className='w-full h-full'>
							<CategorySpendingComponent />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AnalyticsBody;

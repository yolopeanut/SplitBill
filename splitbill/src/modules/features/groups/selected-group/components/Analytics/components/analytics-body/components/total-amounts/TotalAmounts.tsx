import { useTotalAmounts } from "./hooks/useTotalAmounts";
import { formatCurrency } from "../../../../../../../../../core/common/commonFunctions";
import { useGroupsContext } from "../../../../../../../hooks/useGroupsContext";

const TotalAmounts = () => {
	const { totalGroupExpenses, totalYouPaidFor } = useTotalAmounts();
	const { selectedGroup } = useGroupsContext();

	return (
		<>
			<div className='flex flex-col w-[45%] justify-center items-center'>
				<div className='flex flex-col'>
					<span className='text-font-text-gray text-xs'>Total group expenses</span>
					<span className='text-font-white text-lg font-semibold'>
						{formatCurrency(
							totalGroupExpenses ? totalGroupExpenses : 0,
							selectedGroup?.currency ?? "MYR"
						)}
					</span>
				</div>
			</div>

			<div className='h-full w-px bg-outline-gray'></div>

			<div className='flex flex-col w-[45%] justify-center items-center'>
				<div className='flex flex-col'>
					<span className='text-font-text-gray text-xs'>Total you paid for</span>
					<span className='text-font-white text-lg font-semibold'>
						{formatCurrency(
							totalYouPaidFor ? totalYouPaidFor : 0,
							selectedGroup?.currency ?? "MYR"
						)}
					</span>
				</div>
			</div>
		</>
	);
};

export default TotalAmounts;

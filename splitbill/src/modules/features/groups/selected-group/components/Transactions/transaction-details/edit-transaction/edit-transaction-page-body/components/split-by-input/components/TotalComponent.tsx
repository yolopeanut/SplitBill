import { UseFormGetValues } from "react-hook-form";
import { ICreateTransactionForm } from "../../../../../../../../../../../core/interfaces/createTransactionForm";
import { useGroupsContext } from "../../../../../../../../../hooks/useGroupsContext";

type TotalComponentProps = {
	type: "Equal" | "Custom" | "Percentage";
	getValues: UseFormGetValues<ICreateTransactionForm>;
};

const TotalComponent = ({ type, getValues }: TotalComponentProps) => {
	const { selectedGroup } = useGroupsContext();
	const users = getValues().splitBy?.value.users;
	const totalAmount = users?.reduce((acc, curr) => acc + Number(curr.amount), 0);

	if (type === "Custom") {
		const total = getValues().amount;

		if (!total)
			return <span className='text-font-red-dark text-lg font-semibold'>Enter Amount First</span>;

		const missing = (total - (totalAmount ? totalAmount : 0)).toFixed(2);
		return (
			<>
				<div className='flex flex-col gap-6 pr-7'>
					<div className='flex flex-row items-center gap-2 justify-between'>
						<span className='text-font-white text-lg font-semibold'>Total</span>
						<span className='text-font-white text-lg font-semibold'>
							{selectedGroup?.currency} {total}
						</span>
					</div>
					<div className='flex flex-row items-center gap-2 justify-between'>
						<span className='text-font-white text-lg font-semibold'>Remaining</span>
						<span className='text-font-white text-lg font-semibold'>
							{selectedGroup?.currency} {missing}
						</span>
					</div>
				</div>
			</>
		);
	} else if (type === "Percentage") {
		const missing = 100 - (totalAmount ? totalAmount : 0);

		return (
			<>
				<div className='flex flex-col gap-6 pr-7'>
					<div className='flex flex-row items-center gap-2 justify-between'>
						<span className='text-font-white text-lg font-semibold'>Total</span>
						<span className='text-font-white text-lg font-semibold'>{totalAmount}%</span>
					</div>
					<div className='flex flex-row items-center gap-2 justify-between'>
						<span className='text-font-white text-lg font-semibold'>Remaining</span>
						<span className='text-font-white text-lg font-semibold'>{missing}%</span>
					</div>
				</div>
			</>
		);
	} else {
		return <></>;
	}
};

export default TotalComponent;

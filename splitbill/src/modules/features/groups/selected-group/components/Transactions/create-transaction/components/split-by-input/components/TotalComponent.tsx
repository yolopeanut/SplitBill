import { UseFormGetValues } from "react-hook-form";
import FormValues from "../../../../../../../../../core/interfaces/createTransactionForm";
import { useGroupsContext } from "../../../../../../../hooks/useGroupsContext";

type TotalComponentProps = {
	getValues: UseFormGetValues<FormValues>;
};

const TotalComponent = ({ getValues }: TotalComponentProps) => {
	const { selectedGroup } = useGroupsContext();
	const total = getValues().amount;
	const users = getValues().splitBy?.value.users;

	const totalAmount = users?.reduce((acc, curr) => acc + Number(curr.amount), 0);

	if (!total)
		return <span className='text-font-red-dark text-lg font-semibold'>Enter Amount First</span>;

	const missing = Math.abs(total - (totalAmount ? totalAmount : 0)).toFixed(2);

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
};

export default TotalComponent;

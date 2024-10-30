import { ControllerRenderProps } from "react-hook-form";
import FormValues from "../../../../../../../core/interfaces/createTransactionForm";

const SplitByCard = ({
	type,
	field,
	selectedSplitType,
	handleSplitTypeChange,
}: {
	type: string;
	field: ControllerRenderProps<FormValues, "splitBy">;
	selectedSplitType: string;
	handleSplitTypeChange: (
		type: string,
		field: ControllerRenderProps<FormValues, "splitBy">
	) => void;
}) => {
	return (
		<>
			<div
				className={`w-1/3 flex flex-row justify-between items-center cursor-pointer py-2 rounded-lg text-sm font-semibold ${
					selectedSplitType === type
						? "bg-brand-orange text-font-black "
						: "outline outline-1 outline-brand-orange text-font-white "
				}`}
				onClick={() => handleSplitTypeChange(type, field)}
			>
				<span className='w-full text-center'>{type}</span>
			</div>
		</>
	);
};

export default SplitByCard;

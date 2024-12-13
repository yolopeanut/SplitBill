import { expenseCategories } from "../../../../../../../../../../../core/constants/ExpenseCategories";
import ExpenseCategory from "../../../../../../../../../../../core/enums/ExpenseCategoryEnum";
import { formatCurrency } from "../../../../../../../../../../../core/common/commonFunctions";
import { useSelectedGroup } from "../../../../../../../../hooks/useSelectedGroup";

interface ICategorySpendingCardProps {
	category: ExpenseCategory;
	amount: number;
}

const CategorySpendingCard = (props: ICategorySpendingCardProps) => {
	const category = expenseCategories.find((category) => category.label === props.category);
	const { selectedGroup } = useSelectedGroup();

	return (
		<div className='flex flex-col gap-2 bg-background-black rounded-lg p-2 px-4 w-full border border-outline-gray'>
			<div className='flex flex-row items-center gap-4'>
				<div
					className={`flex flex-row items-center justify-center ${category?.color} w-10 h-10 rounded-full`}
				>
					{category?.icon}
				</div>
				<div className='flex flex-col'>
					<span className='text-xs text-font-text-gray font-medium'>{category?.label}</span>
					<span className='text-base text-text-secondary font-medium'>
						{formatCurrency(props.amount, selectedGroup?.currency ?? "MYR")}
					</span>
				</div>
			</div>
		</div>
	);
};

export default CategorySpendingCard;

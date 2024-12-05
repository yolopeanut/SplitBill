import { ControllerRenderProps } from "react-hook-form";
import { ICreateTransactionForm } from "../../../../../../../../../core/interfaces/createTransactionForm";
import { Dispatch, SetStateAction } from "react";
import { expenseCategories } from "../../../../../../../../../core/constants/ExpenseCategories";
import ExpenseCategory from "../../../../../../../../../core/enums/ExpenseCategoryEnum";

interface CategoryCardProps {
	category: ExpenseCategory;
	field: ControllerRenderProps<ICreateTransactionForm, "category"> | undefined;
	setSelectedCategory: Dispatch<SetStateAction<ExpenseCategory | null>> | undefined;
	setIsDrawerOpen: Dispatch<SetStateAction<boolean>> | undefined;
}

const CategoryCard = ({
	category,
	field,
	setSelectedCategory,
	setIsDrawerOpen,
}: CategoryCardProps) => {
	const categoryData = expenseCategories.find((categories) => categories.label === category);
	const categoryIcon = categoryData?.icon;
	const categoryColor = categoryData?.color;
	return (
		<>
			<div
				className='flex flex-row justify-between items-center w-full gap-4 cursor-pointer'
				onClick={() => {
					field?.onChange(category);
					setSelectedCategory?.(category);
					setIsDrawerOpen?.(false);
				}}
			>
				<div className='flex flex-row items-center gap-6'>
					<div
						className={`flex justify-center items-center rounded-full w-12 h-12 text-font-black ${categoryColor}`}
					>
						{categoryIcon}
					</div>
					<span className='text-font-white text-lg font-semibold'>{category}</span>
				</div>
			</div>
		</>
	);
};

export default CategoryCard;

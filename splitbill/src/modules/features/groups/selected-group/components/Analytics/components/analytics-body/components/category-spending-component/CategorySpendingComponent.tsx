import CategorySpendingCard from "./components/category-spending-card/CategorySpendingCard";
import { useCategorySpendingComponent } from "./hooks/useCategorySpendingComponent";

const CategorySpendingComponent = () => {
	const { categoryTotals } = useCategorySpendingComponent();

	return (
		<>
			<div className='flex flex-col gap-2'>
				{categoryTotals.map((categoryTotal) => (
					<CategorySpendingCard
						key={categoryTotal.category}
						category={categoryTotal.category}
						amount={categoryTotal.amount}
					/>
				))}
			</div>
		</>
	);
};

export default CategorySpendingComponent;

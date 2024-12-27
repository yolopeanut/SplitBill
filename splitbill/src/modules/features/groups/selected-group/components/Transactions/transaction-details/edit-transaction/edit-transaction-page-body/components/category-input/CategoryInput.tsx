import {
    Controller,
    Control,
    ControllerRenderProps,
    FieldErrors,
} from "react-hook-form";
import ExpenseCategory from "../../../../../../../../../../core/enums/ExpenseCategoryEnum";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { expenseCategories } from "../../../../../../../../../../core/constants/ExpenseCategories";
import { ICreateTransactionForm } from "../../../../../../../../../../core/interfaces/createTransactionForm";
import CommonDrawer from "../../../../../../../../../../core/common/components/CommonDrawer";

interface ICategoryInputProps {
    control: Control<ICreateTransactionForm>;
    errors: FieldErrors<ICreateTransactionForm>;
}

export const CategoryInput = ({ control, errors }: ICategoryInputProps) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] =
        useState<ExpenseCategory | null>(null);

    const [searchQuery, setSearchQuery] = useState("");

    const handleDrawerOpen = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    // Filter categories based on search query (contains search query)
    const filteredCategories = Object.values(ExpenseCategory).filter(
        (category) => {
            return category.toLowerCase().includes(searchQuery.toLowerCase());
        }
    );

    useEffect(() => {
        setSelectedCategory(control._defaultValues.category as ExpenseCategory);
    }, [control]);

    return (
        <>
            {/* Category Input Box */}
            <div
                className='flex flex-col gap-2 w-full pb-4'
                onClick={handleDrawerOpen}
            >
                <span className='text-font-white text-sm font-semibold'>
                    Category
                </span>
                <div className='w-full min-h-16 bg-card-gray-dark rounded-lg flex items-center px-4 text-font-text-gray'>
                    {selectedCategory ? (
                        <div className='py-4'>
                            <CategoryCard
                                category={selectedCategory}
                                field={undefined}
                                setSelectedCategory={undefined}
                                setIsDrawerOpen={undefined}
                            />
                        </div>
                    ) : (
                        "Select Category"
                    )}
                </div>
                {errors.category && (
                    <span className='text-font-red text-sm'>
                        {errors.category.message}
                    </span>
                )}
            </div>

            {/* Category Drawer Controller */}
            <Controller
                name='category'
                control={control}
                rules={{
                    validate: {
                        minCategory: (value) => {
                            if (!value) {
                                return "Please select a category";
                            }

                            return true;
                        },
                    },
                }}
                render={({ field }) => (
                    <CommonDrawer
                        isOpen={isDrawerOpen}
                        toggleDrawer={handleDrawerOpen}
                        size='80vh'
                    >
                        <div className='flex flex-col gap-4 p-4 pt-4 h-full overflow-y-auto pb-20'>
                            {/* Search Input */}
                            <div className='relative'>
                                <input
                                    type='text'
                                    id='floating_outlined'
                                    className='block px-2.5 pb-2.5 pt-4 w-full text-sm text-font-white bg-input-search-gray rounded-lg border border-input-search-gray appearance-auto focus:border-input-search-gray focus:outline-none focus:ring-0 peer'
                                    placeholder=' '
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                />
                                <label
                                    htmlFor='floating_outlined'
                                    className='absolute text-sm text-gray-400 duration-300 transform -translate-y-24 scale-75 top-0 z-10 origin-[0] bg-transparent px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[0.4rem] peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 '
                                >
                                    Search Category
                                </label>
                            </div>

                            {/* Category Cards */}
                            {filteredCategories.map((category) => {
                                if (category === ExpenseCategory.SettleUp)
                                    return null;
                                return (
                                    <CategoryCard
                                        category={category}
                                        key={category}
                                        field={field}
                                        setSelectedCategory={
                                            setSelectedCategory
                                        }
                                        setIsDrawerOpen={setIsDrawerOpen}
                                    />
                                );
                            })}
                        </div>
                    </CommonDrawer>
                )}
            />
        </>
    );
};

export default CategoryInput;

const CategoryCard = ({
    category,
    field,
    setSelectedCategory,
    setIsDrawerOpen,
}: {
    category: ExpenseCategory;
    field:
        | ControllerRenderProps<ICreateTransactionForm, "category">
        | undefined;
    setSelectedCategory:
        | Dispatch<SetStateAction<ExpenseCategory | null>>
        | undefined;
    setIsDrawerOpen: Dispatch<SetStateAction<boolean>> | undefined;
}) => {
    const categoryData = expenseCategories.find(
        (categories) => categories.label === category
    );
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
                    <span className='text-font-white text-lg font-semibold'>
                        {category}
                    </span>
                </div>
            </div>
        </>
    );
};

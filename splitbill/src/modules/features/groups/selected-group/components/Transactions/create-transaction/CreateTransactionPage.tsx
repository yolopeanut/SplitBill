// React
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useLocation, useParams } from "react-router-dom";

// Icons
import { IoArrowBack } from "react-icons/io5";

import { useEffect } from "react";
import FormValues from "../../../../../../core/interfaces/createTransactionForm";
import TitleInput from "./components/title-input/TitleInput";
import AmountInput from "./components/amount-input/AmountInput";
import CategoryInput from "./components/category-input/CategoryInput";
import PaidByInput from "./components/paid-by-input/PaidByInput";
import SplitByInput from "./components/split-by-input/SplitByInput";
import RemarksInput from "./components/remarks-input/RemarksInput";
import { useGroupsContext } from "../../../../hooks/useGroupsContext";
import { useAddExpense } from "./hooks/useAddExpense";

const CreateTransactionPage = () => {
	const navigate = useNavigate();
	const { selectedGroupId } = useGroupsContext();
	const { groupId } = useParams();

	// Handling if the groupId is not found,
	// because other components are dependent on selectedGroupId from context
	useEffect(() => {
		if (!selectedGroupId) {
			navigate(`/groups/${groupId}`);
		}
	}, [selectedGroupId, navigate, groupId]);

	return (
		<>
			<div className='flex flex-col gap-4 p-4 h-full'>
				<CreateTransactionHeader />
				<CreateTransactionBody />
			</div>
		</>
	);
};

export default CreateTransactionPage;

const CreateTransactionHeader = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const groupName = location.pathname.split("/")[2];

	return (
		<>
			<div className='flex flex-row items-center justify-between'>
				<button
					className='btn border-none p-0'
					onClick={() => {
						navigate(`/groups/${groupName}`);
					}}
				>
					<IoArrowBack
						size={20}
						className='text-brand-orange'
					/>
				</button>
				<span className='text-font-white text-xl font-semibold absolute left-1/2 -translate-x-1/2'>
					Add New Expense
				</span>
				<div></div>
			</div>
		</>
	);
};

const CreateTransactionBody = () => {
	const { addExpense } = useAddExpense();
	const { selectedGroupId } = useGroupsContext();
	const { register, handleSubmit, control, getValues } = useForm<FormValues>({
		defaultValues: {
			splitBy: {
				value: {
					type: "equal",
					users: [],
				},
			},
		},
	});

	const onSubmit: SubmitHandler<FormValues> = (data) => {
		// Check if all required fields are filled
		if (!selectedGroupId) return;
		if (!data.paidBy) return;
		if (!data.title) return;
		if (!data.category) return;
		if (!data.amount) return;
		if (!data.splitBy) return;

		addExpense({
			group_id: selectedGroupId,
			paid_by: data.paidBy,
			expense_title: data.title,
			category: data.category,
			amount: data.amount,
			remarks: data.remarks || null,
			split_by: data.splitBy,
		});
	};

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='h-full'
			>
				<div className='flex flex-col gap-8 w-full h-full'>
					<div className='flex flex-col h-full pb-80 overflow-y-auto'>
						<TitleInput register={register} />
						<AmountInput register={register} />
						<CategoryInput control={control} />
						<PaidByInput control={control} />
						<SplitByInput
							control={control}
							getValues={getValues}
						/>
						<RemarksInput register={register} />
						<button
							type='submit'
							className='btn bg-brand-orange text-font-black w-full'
						>
							Add Expense
						</button>
					</div>
				</div>
			</form>
		</>
	);
};

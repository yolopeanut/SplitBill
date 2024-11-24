// React
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useLocation, useParams } from "react-router-dom";

// Icons
import { IoArrowBack } from "react-icons/io5";

import { useEffect } from "react";
import TitleInput from "./components/title-input/TitleInput";
import AmountInput from "./components/amount-input/AmountInput";
import CategoryInput from "./components/category-input/CategoryInput";
import PaidByInput from "./components/paid-by-input/PaidByInput";
import SplitByInput from "./components/split-by-input/SplitByInput";
import RemarksInput from "./components/remarks-input/RemarksInput";
import { useAddExpense } from "./hooks/useAddExpense";
import { useGroupsContext } from "../../../../../hooks/useGroupsContext";
import { ICreateTransactionForm } from "../../../../../../../core/interfaces/createTransactionForm";
import { queryClient } from "../../../../../../../../config/ReactQuery";
import { useGetTransactionByID } from "../../transaction-details/hooks/useGetTransactionByID";
import { IAllUsersTable } from "../../../../../../../core/interfaces/all_usersTable";
const EditTransactionPage = () => {
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
				<EditTransactionHeader />
				<EditTransactionBody />
			</div>
		</>
	);
};

export default EditTransactionPage;

const EditTransactionHeader = () => {
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
					Update Expense
				</span>
				<div></div>
			</div>
		</>
	);
};

const EditTransactionBody = () => {
	const navigate = useNavigate();
	const { groupId, transactionId } = useParams();
	const { data, isLoading } = useGetTransactionByID(transactionId!);
	console.log({ data });

	const { addExpense, isPending } = useAddExpense();
	const { selectedGroupId, groupUsers } = useGroupsContext();

	const { register, handleSubmit, control, getValues, setValue } = useForm<ICreateTransactionForm>({
		defaultValues: {
			splitBy: {
				value: {
					type: "equal",
					users: [],
				},
			},
		},
	});

	// Use useEffect to set form values when data is loaded
	useEffect(() => {
		if (!data || !groupUsers) return; // Exit if either data is not available

		if (isLoading) return;

		// Set basic values
		setValue("title", data.trans_title);
		setValue("amount", data.total_amount);
		setValue("category", data.category);
		setValue("paidBy", data.paid_by);
		setValue("remarks", data.remarks);
		setValue("tax", data.tax);
		// Set split by values
		const splitByValue = {
			value: {
				type: data.transaction_splits[0]?.split_type || "Error",
				users: data.transaction_splits
					.map((split) => {
						const user = groupUsers.find((u) => u.id === split.split_user_id);
						if (!user) return null;

						return {
							user: user,
							amount:
								split.unequal_split_amount ||
								split.equal_split_amount ||
								split.percentage_split_amount ||
								0,
						};
					})
					.filter((split): split is { user: IAllUsersTable; amount: number } => split !== null),
			},
		};
		setValue("splitBy", splitByValue, { shouldValidate: true });

		console.log("Setting values:", {
			title: data.trans_title,
			amount: data.total_amount,
			category: data.category,
			paidBy: data.paid_by,
			remarks: data.remarks,
			tax: data.tax,
			splitBy: splitByValue,
		});
	}, [data, groupUsers, setValue, isLoading]);

	const onSubmit: SubmitHandler<ICreateTransactionForm> = (data) => {
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
			tax: data.tax || 0,
		});
		if (isPending) {
			console.log("isPending");
			return;
		}

		queryClient.invalidateQueries({ queryKey: ["groups", "fetchAllTransactions"] });

		navigate(`/groups/${groupId}`);
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
							disabled={isPending}
						>
							{isPending ? "Adding..." : "Add Expense"}
						</button>
					</div>
				</div>
			</form>
		</>
	);
};

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useGroupsContext } from "../../../../../../hooks/useGroupsContext";
import { useGetTransactionByID } from "../../hooks/useGetTransactionByID";
import TitleInput from "./components/title-input/TitleInput";
import CategoryInput from "./components/category-input/CategoryInput";
import PaidByInput from "./components/paid-by-input/PaidByInput";
import SplitByInput from "./components/split-by-input/SplitByInput";
import RemarksInput from "./components/remarks-input/RemarksInput";
import { ICreateTransactionForm } from "../../../../../../../../core/interfaces/createTransactionForm";
import { queryClient } from "../../../../../../../../../config/ReactQuery";
import AmountInput from "./components/amount-input/AmountInput";
import { useGetGroupUsers } from "./components/paid-by-input/hooks/useGetGroupUsers";
import { IAllUsersTable } from "../../../../../../../../core/interfaces/all_usersTable";
import { useEditExpense } from "./hooks/useEditExpense";
import { useEffect } from "react";

const EditTransactionBody = () => {
	const navigate = useNavigate();
	const { groupId, transactionId } = useParams();
	const { data } = useGetTransactionByID(transactionId!);

	const { editExpense, isPending } = useEditExpense();
	const { selectedGroupId } = useGroupsContext();
	const { data: groupUsers } = useGetGroupUsers({ group_id: selectedGroupId || "" });
	const {
		register,
		handleSubmit,
		control,
		getValues,
		setValue,
		formState: { errors },
	} = useForm<ICreateTransactionForm>({
		defaultValues:
			data && groupUsers
				? {
						title: data.trans_title,
						amount: data.total_amount,
						category: data.category,
						paidBy: data.paid_by,
						remarks: data.remarks,
						tax: data.tax,
						splitBy: {
							value: {
								type: data.transaction_splits[0]?.split_type || "equal",
								users: data.transaction_splits
									.map((split) => {
										const user = groupUsers?.find((u) => u.id === split.split_user_id);
										if (!user) return null;

										return {
											transaction_split_id: split.transaction_split_id,
											user: user,
											amount:
												split.unequal_split_amount ||
												split.equal_split_amount ||
												split.percentage_split_amount ||
												0,
										};
									})
									.filter(
										(
											split
										): split is {
											transaction_split_id: string;
											user: IAllUsersTable;
											amount: number;
										} => split !== null
									),
							},
						},
				  }
				: {
						splitBy: {
							value: {
								type: "equal",
								users: [],
							},
						},
				  },
	});

	const onSubmit: SubmitHandler<ICreateTransactionForm> = async (data) => {
		// Check if all required fields are filled
		if (!selectedGroupId) return;
		if (!data.paidBy) return;
		if (!data.title) return;
		if (!data.category) return;
		if (!data.amount) return;
		if (!data.splitBy) return;

		await editExpense({
			transaction_id: transactionId!,
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
			// console.log("isPending");
			return;
		}

		queryClient.invalidateQueries({ queryKey: ["groups", "fetchAllTransactions"] });

		navigate(`/groups/${groupId}`);
	};

	useEffect(() => {
		if (!groupUsers) {
			navigate(`/groups/${groupId}`);
		}
	}, [groupUsers, navigate, groupId]);

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='h-full'
			>
				<div className='flex flex-col gap-8 w-full h-full'>
					<div className='flex flex-col h-full pb-80 overflow-y-auto'>
						<TitleInput
							register={register}
							errors={errors}
						/>
						<AmountInput
							control={control}
							setValue={setValue}
							errors={errors}
						/>
						<CategoryInput
							control={control}
							errors={errors}
						/>
						<PaidByInput
							control={control}
							errors={errors}
						/>
						<SplitByInput
							control={control}
							getValues={getValues}
							errors={errors}
						/>
						<RemarksInput register={register} />
						<button
							type='submit'
							className='btn bg-brand-orange text-font-black w-full'
							// disabled={isPending}
						>
							{/* {isPending ? "Updating..." : "Update Expense"} */}
							Update Expense
						</button>
					</div>
				</div>
			</form>
		</>
	);
};

export default EditTransactionBody;

// React
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";

// Icons
import { IoArrowBack } from "react-icons/io5";

import FormValues from "../../../../core/interfaces/createTransactionForm";
import AmountInput from "./components/amount-input/AmountInput";
import CategoryInput from "./components/category-input/CategoryInput";
import PaidByInput from "./components/paid-by-input/PaidByInput";
import SplitByInput from "./components/split-by-input/SplitByInput";
import TitleInput from "./components/title-input/TitleInput";

const CreateTransactionPage = () => {
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
	const { register, handleSubmit } = useForm<FormValues>({
		defaultValues: {
			currency: "MYR",
		},
	});

	const onSubmit: SubmitHandler<FormValues> = (data) => {
		console.log(data);
	};

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='h-full'
			>
				<div className='flex flex-col gap-8 w-full h-full'>
					<div className='flex flex-col gap-8 h-full pb-80 overflow-y-auto'>
						<TitleInput register={register} />
						<AmountInput register={register} />
						<CategoryInput register={register} />
						<PaidByInput register={register} />
						<SplitByInput register={register} />

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

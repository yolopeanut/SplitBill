import { SubmitHandler, useForm } from "react-hook-form";
import { ICreateGroupForm } from "../../../../core/interfaces/createGroupForm";
import GroupNameInput from "./group-name-input/GroupNameInput";
import CurrencyInput from "./currency-input/CurrencyInput";

const CreateGroupPageBody = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<ICreateGroupForm>();

	const onSubmit: SubmitHandler<ICreateGroupForm> = (data) => {
		console.log(data);
	};

	return (
		<>
			<div className='flex flex-col items-center w-full h-full p-2'>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='w-full flex flex-col gap-4'
				>
					<GroupNameInput
						register={register}
						errors={errors}
					/>
					{/* <DescriptionInput
						register={register}
						errors={errors}
					/> */}
					<CurrencyInput
						register={register}
						errors={errors}
						control={control}
					/>
					<button
						type='submit'
						className='btn w-full bg-brand-orange text-font-black font-semibold outline-none border-none'
					>
						Create Group
					</button>
				</form>
			</div>
		</>
	);
};

export default CreateGroupPageBody;

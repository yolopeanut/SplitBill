import { SubmitHandler, useForm } from "react-hook-form";
import { ICreateGroupForm } from "../../../../core/interfaces/createGroupForm";
import GroupNameInput from "./group-name-input/GroupNameInput";
import CurrencyInput from "./currency-input/CurrencyInput";
import GroupImageInput from "./image-src-input/ImageSrcInput";
import SelectUsersInput from "./select-users-input/SelectUsersInput";
import usePostCreateGroup from "./select-users-input/hooks/usePostCreateGroup";

const CreateGroupPageBody = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
		getValues,
	} = useForm<ICreateGroupForm>({
		defaultValues: {
			currency: "MYR",
		},
	});
	const { postCreateGroup } = usePostCreateGroup({ data: getValues(), getValues });

	const onSubmit: SubmitHandler<ICreateGroupForm> = async (data) => {
		console.log(data);
		await postCreateGroup();
	};

	return (
		<>
			<div className='flex flex-col items-center w-full h-full p-2'>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='w-full flex flex-col gap-4 overflow-y-auto pb-40'
				>
					<GroupImageInput register={register} />
					<GroupNameInput
						register={register}
						errors={errors}
					/>
					{/* <DescriptionInput
						register={register}
						errors={errors}
					/> */}
					<CurrencyInput
						errors={errors}
						control={control}
					/>

					<SelectUsersInput
						control={control}
						getValues={getValues}
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

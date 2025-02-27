import { SubmitHandler, useForm } from "react-hook-form";
import { ICreateGroupForm } from "../../../../core/interfaces/createGroupForm";
import GroupNameInput from "./group-name-input/GroupNameInput";
import CurrencyInput from "./currency-input/CurrencyInput";
import GroupImageInput from "./image-src-input/ImageSrcInput";
import SelectUsersInput from "./select-users-input/SelectUsersInput";
import usePostCreateGroup from "./select-users-input/hooks/usePostCreateGroup";
import { queryClient } from "../../../../../config/ReactQuery";
import { useNavigate } from "react-router-dom";

const CreateGroupPageBody = () => {
	// Form setup
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
		getValues,
	} = useForm<ICreateGroupForm>({
		defaultValues: {
			group_name: "",
			currency: "MYR",
		},
	});

	// Post create group hook
	const { postCreateGroup } = usePostCreateGroup({ getValues });

	// Navigation
	const navigate = useNavigate();

	// Submit handler for the form
	const onSubmit: SubmitHandler<ICreateGroupForm> = async (data) => {
		await postCreateGroup(data);
		queryClient.invalidateQueries({ queryKey: ["groups", "fetchOwnGroups"] });
		navigate("/groups");
	};

	return (
		<>
			<div className='flex flex-col items-center w-full h-full p-4'>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='w-full flex flex-col gap-4 overflow-y-auto pb-40'
				>
					<GroupImageInput register={register} />
					<GroupNameInput
						register={register}
						errors={errors}
					/>

					<CurrencyInput
						errors={errors}
						control={control}
					/>

					<SelectUsersInput
						control={control}
						getValues={getValues}
						errors={errors}
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

import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ICreateGroupForm } from "../../../../../core/interfaces/createGroupForm";

type GroupNameInputProps = {
	register: UseFormRegister<ICreateGroupForm>;
	errors: FieldErrors<ICreateGroupForm>;
};

const GroupNameInput = ({ register, errors }: GroupNameInputProps) => {
	return (
		<>
			<div className='flex flex-col gap-2 pb-4 w-full'>
				<span className='text-font-white text-sm font-semibold'>Group Name</span>
				<input
					type='text'
					className='input w-full bg-input-box-gray outline-none border-none placeholder:text-font-text-gray focus:outline-none focus:border-none'
					placeholder='Group Name'
					{...register("group_name", {
						required: "Group name is required",
						validate: {
							notEmpty: (value) =>
								value.trim() !== "" || "Group name cannot be empty or only spaces",
						},
					})}
				/>
				{errors.group_name && (
					<span className='text-font-red-dark text-sm'>{errors.group_name.message}</span>
				)}
			</div>
		</>
	);
};

export default GroupNameInput;

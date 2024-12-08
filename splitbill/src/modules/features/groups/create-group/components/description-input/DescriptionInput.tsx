import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ICreateGroupForm } from "../../../../../core/interfaces/createGroupForm";

type DescriptionInputProps = {
	register: UseFormRegister<ICreateGroupForm>;
	errors: FieldErrors<ICreateGroupForm>;
};

const DescriptionInput = ({ register, errors }: DescriptionInputProps) => {
	return (
		<>
			<div className='flex flex-col gap-2 pb-4 w-full'>
				<span className='text-font-white text-sm font-semibold'>Description</span>
				<input
					type='text'
					className='input w-full bg-input-box-gray outline-none border-none placeholder:text-font-text-gray focus:outline-none focus:border-none'
					placeholder='Group Name'
					{...register("description", { required: true })}
				/>
				{errors.description && (
					<span className='text-font-red-dark text-sm'>This field is required</span>
				)}
			</div>
		</>
	);
};

export default DescriptionInput;

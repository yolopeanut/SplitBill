import { UseFormRegister } from "react-hook-form";
import { IFormInput } from "../../../../core/interfaces/createProfileForm";

const UserNameInput = ({ register }: { register: UseFormRegister<IFormInput> }) => {
	return (
		<>
			<div className='label'>
				<span className='label-text text-font-white text-base font-semibold'>Unique Username</span>
			</div>
			<input
				type='text'
				placeholder=''
				className='input w-full max-w-xs bg-input-box-gray text-font-white rounded-xl'
				{...register("username")}
			/>
		</>
	);
};

export default UserNameInput;

import { IFormInput } from "../../../../core/interfaces/createProfileForm";
import { UseFormRegister } from "react-hook-form";

const NameInput = ({ register }: { register: UseFormRegister<IFormInput> }) => {
	return (
		<>
			<div className='label'>
				<span className='label-text text-font-white text-base font-semibold'>Display Name</span>
			</div>
			<input
				type='text'
				placeholder=''
				className='input w-full max-w-xs bg-input-box-gray text-font-white rounded-xl'
				{...register("displayName")}
			/>
		</>
	);
};

export default NameInput;

import { IFormInput } from "../../../../core/interfaces/createProfileForm";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface INameInputProps {
    register: UseFormRegister<IFormInput>;
    errors: FieldErrors<IFormInput>;
}

const NameInput = ({ register, errors }: INameInputProps) => {
    return (
        <>
            <div className='label'>
                <span className='label-text text-font-white text-base font-semibold'>
                    Display Name
                </span>
            </div>
            <input
                type='text'
                placeholder=''
                className='input w-full max-w-xs bg-input-box-gray text-font-white rounded-xl'
                {...register("displayName", {
                    required: "Display name is required",
                    minLength: {
                        value: 2,
                        message: "Display name must be at least 2 characters",
                    },
                })}
            />
            {errors.displayName && (
                <span className='text-red-500 text-sm mt-1'>
                    {errors.displayName.message}
                </span>
            )}
        </>
    );
};

export default NameInput;

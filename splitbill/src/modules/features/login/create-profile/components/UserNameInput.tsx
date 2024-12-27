import { FieldErrors, UseFormRegister } from "react-hook-form";
import { IFormInput } from "../../../../core/interfaces/createProfileForm";

interface IUserNameInputProps {
    register: UseFormRegister<IFormInput>;
    errors: FieldErrors<IFormInput>;
}

const UserNameInput = ({ register, errors }: IUserNameInputProps) => {
    return (
        <>
            <div className='label'>
                <span className='label-text text-font-white text-base font-semibold'>
                    Unique Username
                </span>
            </div>
            <input
                type='text'
                placeholder=''
                className='input w-full max-w-xs bg-input-box-gray text-font-white rounded-xl'
                {...register("username", {
                    required: "Username is required",
                    minLength: {
                        value: 3,
                        message: "Username must be at least 3 characters",
                    },
                })}
            />
            {errors.username && (
                <span className='text-red-500 text-sm mt-1'>
                    {errors.username.message}
                </span>
            )}
        </>
    );
};

export default UserNameInput;

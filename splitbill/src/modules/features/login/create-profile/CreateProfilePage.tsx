import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleImageUpload } from "../../../core/common/commonFunctions";
import { useForm, UseFormRegister } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
import { IFormInput } from "../../../core/interfaces/createProfileForm";
import update_user_profile from "../../../core/database/createProfilePost";
import post_image_to_storage_and_ref_table from "../../../core/database/postImageToStorage";
import useAuthContext from "../../../core/auth/hooks/useAuthContext";

const CreateProfileText = (
	<div className='flex flex-col gap-2 items-start w-full'>
		<span className='text-3xl font-bold text-font-white self-start'>Create Profile</span>
	</div>
);

const MakeItUniqueText = <span className='text-sm text-font-white'>Remember to make it unique! 😉</span>;

const CreateProfilePage = () => {
	const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(null);
	const navigate = useNavigate();
	const { user } = useAuthContext();
	const { register, handleSubmit } = useForm<IFormInput>();
	const onSubmit: SubmitHandler<IFormInput> = async (data) => {
		// console.log(data);

		//TODO: upload form data to backend
		if (user) {
			const imagePath = await post_image_to_storage_and_ref_table(data.profilePicture, user.id);
			await update_user_profile(data, imagePath, user.id);
		}

		// revoke the picture to prevent memory leaks
		if (profilePictureUrl) {
			URL.revokeObjectURL(profilePictureUrl);
		}
		navigate("/groups");
	};
	return (
		<>
			<div className='w-full h-full '>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='flex flex-col w-full h-full justify-between items-center pb-10'
				>
					{/* div to space items */}
					<div></div>
					<div className='flex flex-col w-[80%] justify-center items-center gap-10'>
						{CreateProfileText}
						<div className='flex flex-col gap-2 w-full justify-start items-start'>
							{/* Passing setProfilePictureUrl because we need to revoke the object URL when the user goes to the next page */}
							<ProfilePictureInput
								setProfilePictureUrl={setProfilePictureUrl}
								register={register}
							/>
							<UserNameInput register={register} />
							<NameInput register={register} />
						</div>
						{MakeItUniqueText}
					</div>

					<LetsGoButton />
				</form>
			</div>
		</>
	);
};

export default CreateProfilePage;
const LetsGoButton = () => {
	return (
		<div className='flex h-14 w-full justify-center items-center'>
			<button
				type='submit'
				className='btn bg-brand-orange text-font-black font-black text-base rounded-full w-full max-w-xs h-full '
			>
				Let's go
			</button>
		</div>
	);
};
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

const ProfilePictureInput = ({
	setProfilePictureUrl,
	register,
}: {
	setProfilePictureUrl: (url: string | null) => void;
	register: UseFormRegister<IFormInput>;
}) => {
	const [profilePicture, setProfilePicture] = useState<File | null>(null);

	return (
		<>
			<div className='flex flex-col gap-2 w-20 h-20 justify-center items-center bg-font-white rounded-full '>
				<label className='w-64 flex flex-col items-center px-4 py-6 '>
					{profilePicture ? (
						<img
							src={profilePicture ? URL.createObjectURL(profilePicture) : ""}
							alt='Profile Picture'
							className='w-20 h-20 object-cover rounded-full'
						/>
					) : (
						<span className='text-font-black text-4xl font-semibold'>+</span>
					)}
					<input
						type='file'
						placeholder=''
						className='hidden'
						accept='image/png, image/gif, image/jpeg'
						onChange={(e) => {
							if (e.target.files && e.target.files.length > 0) {
								handleImageUpload(e).then((file) => {
									if (file) {
										setProfilePictureUrl(URL.createObjectURL(file));
										setProfilePicture(file);
										register("profilePicture", { value: file });
									}
								});
							}
						}}
					/>
				</label>
			</div>
		</>
	);
};

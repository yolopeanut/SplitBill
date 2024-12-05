import { UseFormRegister } from "react-hook-form";
import { IFormInput } from "../../../../core/interfaces/createProfileForm";
import { useState } from "react";
import { handleImageUpload } from "../../../../core/common/commonFunctions";

interface ProfilePictureInputProps {
	setProfilePictureUrl: (url: string | null) => void;
	register: UseFormRegister<IFormInput>;
}

const ProfilePictureInput = ({ setProfilePictureUrl, register }: ProfilePictureInputProps) => {
	const [profilePicture, setProfilePicture] = useState<File | null>(null);
	const options = { maxSizeMB: 0.7, maxWidthOrHeight: 1000, useWebWorker: true };

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
								handleImageUpload({ event: e, options }).then((file) => {
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

export default ProfilePictureInput;

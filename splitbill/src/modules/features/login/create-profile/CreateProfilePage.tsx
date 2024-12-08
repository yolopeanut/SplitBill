import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
import { IFormInput } from "../../../core/interfaces/createProfileForm";
import update_user_profile from "../../../core/database_functions/createProfilePost";
import useAuthContext from "../../../core/auth/hooks/useAuthContext";
import useUserContext from "../hooks/useUserContext";
import post_image_to_storage from "../../../core/database_functions/postImageToStorage";
import LetsGoButton from "./components/LetsGoButton";
import UserNameInput from "./components/UserNameInput";
import NameInput from "./components/NameInput";
import ProfilePictureInput from "./components/ProfilePictureInput";

const CreateProfileText = (
	<div className='flex flex-col gap-2 items-start w-full'>
		<span className='text-3xl font-bold text-font-white self-start'>Create Profile</span>
	</div>
);

const MakeItUniqueText = (
	<span className='text-sm text-font-white'>Remember to make it unique! 😉</span>
);

const CreateProfilePage = () => {
	const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(null);
	const navigate = useNavigate();
	const { user } = useAuthContext();
	const { getUserById } = useUserContext();

	const { register, handleSubmit } = useForm<IFormInput>();
	const onSubmit: SubmitHandler<IFormInput> = async (data) => {
		// console.log(data);

		// upload form data to backend
		if (user) {
			// upload image to storage and get the path, waiting for the image path to be returned
			const imagePath = await post_image_to_storage(data.profilePicture);

			// update user profile, waiting for the user profile to update
			await update_user_profile(data, imagePath, user.id);

			// refresh user context, waiting for the user context to update
			await getUserById.refetch();
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

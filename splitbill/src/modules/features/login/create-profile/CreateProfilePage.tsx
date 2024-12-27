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
        <span className='text-3xl font-bold text-font-white self-start'>
            Create Profile
        </span>
    </div>
);

const MakeItUniqueText = (
    <span className='text-sm text-font-white'>
        Remember to make it unique! 😉
    </span>
);

const CreateProfilePage = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { getUserById } = useUserContext();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInput>({
        defaultValues: {
            username: "",
            displayName: "",
        },
    });
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        if (user) {
            let imagePath = "";
            if (data.profilePicture?.file) {
                imagePath = await post_image_to_storage(
                    data.profilePicture.file
                );
            }

            await update_user_profile(data, imagePath, user.id);
            await getUserById.refetch();
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
                            <ProfilePictureInput register={register} />
                            <UserNameInput
                                register={register}
                                errors={errors}
                            />
                            <NameInput register={register} errors={errors} />
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

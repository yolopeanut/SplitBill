import { UseFormRegister } from "react-hook-form";
import { IFormInput } from "../../../../core/interfaces/createProfileForm";
import { useState } from "react";
import { handleImageUpload } from "../../../../core/common/commonFunctions";
import ImageCropperDialog from "../../../../core/common/components/ImageCropperDialog";

interface ProfilePictureInputProps {
    register: UseFormRegister<IFormInput>;
}

const ProfilePictureInput = ({ register }: ProfilePictureInputProps) => {
    const [profilePicture, setProfilePicture] = useState<File | null>(null);
    const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(
        null
    );
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);

    const options = {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 300,
        useWebWorker: true,
    };

    return (
        <>
            <div className='flex flex-col gap-2 w-20 h-20 justify-center items-center bg-font-white rounded-full '>
                <label className='w-64 flex flex-col items-center px-4 py-6 '>
                    {profilePicture ? (
                        <img
                            src={croppedImageUrl ?? profilePictureUrl ?? ""}
                            alt='Profile Picture'
                            className='w-20 h-20 object-cover rounded-full'
                        />
                    ) : (
                        <span className='text-font-black text-4xl font-semibold'>
                            +
                        </span>
                    )}
                    <input
                        type='file'
                        placeholder=''
                        className='hidden'
                        accept='image/png, image/gif, image/jpeg'
                        onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                                handleImageUpload({ event: e, options }).then(
                                    (file) => {
                                        if (file) {
                                            setProfilePictureUrl(
                                                URL.createObjectURL(file)
                                            );
                                            setProfilePicture(file);
                                            setIsModalOpen(true);
                                        }
                                    }
                                );
                            }
                        }}
                    />
                </label>
            </div>

            <ImageCropperDialog
                imageUrl={profilePictureUrl ?? ""}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                setCroppedImageUrl={setCroppedImageUrl}
                register={register}
                registerName='profilePicture'
                customHandleCropComplete={() => {}}
            />
        </>
    );
};

export default ProfilePictureInput;

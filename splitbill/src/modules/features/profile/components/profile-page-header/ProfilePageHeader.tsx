import { getInitials } from "../../../../core/common/commonFunctions";

interface IProfilePageHeaderProps {
    name: string;
    userName: string;
    profile_img_url: string | null;
}

const ProfilePageHeader = ({
    name,
    userName,
    profile_img_url,
}: IProfilePageHeaderProps) => {
    // Returns the profile image or the initials if the profile image is not available
    const ProfileImg = () => {
        if (profile_img_url) {
            return <img src={profile_img_url} />;
        }
        return (
            <div className='w-36 h-36 bg-card-gray rounded-full flex items-center justify-center'>
                {getInitials(name)}
            </div>
        );
    };

    return (
        <div className='w-full h-64 bg-card-gray-dark rounded-xl flex flex-col items-center justify-start gap-4'>
            <div className='avatar pt-6'>
                <div className='w-36 rounded-full'>
                    <ProfileImg />
                </div>
            </div>

            <div className='flex flex-col items-center justify-center '>
                <p className='text-font-white text-xl font-bold'>{name}</p>
                <p className='text-font-text-gray text-sm font-light'>
                    @{userName}
                </p>
            </div>
        </div>
    );
};
export default ProfilePageHeader;

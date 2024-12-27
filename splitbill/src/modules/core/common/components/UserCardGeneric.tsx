import { IAllUsersTable } from "../../interfaces/all_usersTable";
import CommonProfileImage from "./CommonProfileImage";

interface UserCardGenericProps {
    userid: string;
    groupUsers: IAllUsersTable[] | undefined;
    activatable?: boolean;
}

const UserCardGeneric = ({
    userid,
    groupUsers,
    activatable = false,
}: UserCardGenericProps) => {
    const user = groupUsers?.find((user) => user.id === userid);
    return (
        <>
            <div
                className={`flex flex-row gap-4 items-center rounded-lg p-2 transition-all duration-200 min-h-16 ${
                    activatable
                        ? "active:bg-gray-800 active:border active:border-gray-700"
                        : ""
                }`}
            >
                <div className='w-10 h-10 flex justify-center items-center bg-card-gray rounded-full'>
                    <CommonProfileImage
                        imgSrc={user?.profile_img_url ?? null}
                        name={user?.name ?? ""}
                        size={10}
                    />
                </div>
                <div className='flex flex-col max-w-32 min-w-32 overflow-x-auto whitespace-normal'>
                    <span className='text-font-white font-bold leading-tight'>
                        {user?.name}
                    </span>
                    <span className='text-font-text-gray text-sm'>
                        @{user?.unique_username}
                    </span>
                </div>
            </div>
        </>
    );
};

export default UserCardGeneric;

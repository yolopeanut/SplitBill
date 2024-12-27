import CommonProfileImage from "../../../../../../core/common/components/CommonProfileImage";
import { IAllUsersTable } from "../../../../../../core/interfaces/all_usersTable";
import { useGroupsContext } from "../../../../hooks/useGroupsContext";
import TotalOwedSpan from "./total-owed-span/TotalOwedSpan";

interface IUserCardProps {
    userId: string;
    groupUsers: IAllUsersTable[] | undefined;
    totalOwed: number;
}

const UserCard = ({ userId, groupUsers, totalOwed }: IUserCardProps) => {
    const { selectedGroup } = useGroupsContext();
    const currency = selectedGroup?.currency;
    if (!groupUsers || !userId) return null;

    const user = groupUsers?.find((user) => user.id === userId);
    if (!user) return null;

    return (
        <>
            <div className='flex flex-row items-center gap-2'>
                <div className='w-10 h-10 flex justify-center items-center bg-card-gray rounded-full'>
                    <CommonProfileImage
                        imgSrc={user.profile_img_url}
                        name={user.name}
                        size={10}
                    />
                </div>

                <div className='flex flex-col'>
                    <TotalOwedSpan
                        totalOwed={totalOwed}
                        user={user}
                        currency={currency || ""}
                    />
                    <span className='text-font-text-gray text-sm'>
                        @{user.unique_username}
                    </span>
                </div>
            </div>
        </>
    );
};

export default UserCard;

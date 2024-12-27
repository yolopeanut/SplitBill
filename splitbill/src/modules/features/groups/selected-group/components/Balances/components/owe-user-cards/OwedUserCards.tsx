import CommonProfileImage from "../../../../../../../core/common/components/CommonProfileImage";
import { IAllGroupsTable } from "../../../../../../../core/interfaces/all_GroupsTable";
import { IAllUsersTable } from "../../../../../../../core/interfaces/all_usersTable";
import OwedUserCard from "./components/OwedUserCard";

interface IOwedUserCardsProps {
    owes_users: Record<string, number>;
    groupUsers: IAllUsersTable[] | undefined;
    selectedGroup: IAllGroupsTable | null;
    userId: string;
}

const OwedUserCards = ({
    owes_users,
    groupUsers,
    selectedGroup,
    userId,
}: IOwedUserCardsProps) => {
    const getUser = (userId: string) => {
        return groupUsers?.find((user) => user.id === userId);
    };

    const OwedUser = getUser(userId);

    return (
        <>
            <div className='px-10 flex flex-col gap-4 py-4'>
                {Object.entries(owes_users).map(([oweUserId, amount]) => {
                    if (Math.round(amount * 100) === 0) return null;
                    return (
                        <div
                            key={oweUserId}
                            className='flex flex-row items-center gap-2'
                        >
                            <div className='w-10 h-10 flex justify-center items-center bg-card-gray rounded-full'>
                                <CommonProfileImage
                                    imgSrc={
                                        getUser(oweUserId)?.profile_img_url ??
                                        null
                                    }
                                    name={getUser(oweUserId)?.name || ""}
                                    size={10}
                                />
                            </div>

                            <div>
                                <OwedUserCard
                                    oweUserId={oweUserId}
                                    amount={amount}
                                    selectedGroup={selectedGroup}
                                    getUser={getUser}
                                    OwedUser={OwedUser}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default OwedUserCards;

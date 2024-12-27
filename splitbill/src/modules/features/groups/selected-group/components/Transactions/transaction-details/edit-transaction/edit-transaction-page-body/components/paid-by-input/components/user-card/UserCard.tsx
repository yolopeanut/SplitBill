import { Dispatch } from "react";
import { ControllerRenderProps } from "react-hook-form";
import CommonProfileImage from "../../../../../../../../../../../../core/common/components/CommonProfileImage";
import { IAllUsersTable } from "../../../../../../../../../../../../core/interfaces/all_usersTable";
import { ICreateTransactionForm } from "../../../../../../../../../../../../core/interfaces/createTransactionForm";
import { SetStateAction } from "react";

interface IUserCardProps {
    user: IAllUsersTable;
    field: ControllerRenderProps<ICreateTransactionForm, "paidBy"> | undefined;
    setSelectedUser:
        | Dispatch<SetStateAction<IAllUsersTable | null>>
        | undefined;
    setIsDrawerOpen: Dispatch<SetStateAction<boolean>> | undefined;
}

const UserCard = ({
    user,
    field,
    setSelectedUser,
    setIsDrawerOpen,
}: IUserCardProps) => {
    return (
        <>
            <div
                className='flex flex-row justify-between items-center w-full gap-4 cursor-pointer'
                onClick={() => {
                    field?.onChange(user.id);
                    setSelectedUser?.(user);
                    setIsDrawerOpen?.(false);
                }}
            >
                <div className='flex flex-row items-center gap-6'>
                    <CommonProfileImage
                        imgSrc={user.profile_img_url || ""}
                        name={user.name}
                        size={12}
                    />

                    <span className='text-font-white text-lg font-semibold'>
                        {user.name}
                    </span>
                </div>
            </div>
        </>
    );
};

export default UserCard;

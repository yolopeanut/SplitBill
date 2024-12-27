import { UseFormGetValues } from "react-hook-form";
import { ControllerRenderProps } from "react-hook-form";
import { IAllUsersTable } from "../../../../../../../../../../../../core/interfaces/all_usersTable";
import { ICreateTransactionForm } from "../../../../../../../../../../../../core/interfaces/createTransactionForm";
import CommonProfileImage from "../../../../../../../../../../../../core/common/components/CommonProfileImage";

interface IUserCardPercentageSplitProps {
    user: IAllUsersTable;
    field: ControllerRenderProps<ICreateTransactionForm, "splitBy"> | undefined;
    getValues: UseFormGetValues<ICreateTransactionForm>;
}

const UserCardPercentageSplit = ({
    user,
    field,
    getValues,
}: IUserCardPercentageSplitProps) => {
    return (
        <>
            <div className='flex flex-row items-center gap-6 justify-between'>
                <div className='flex flex-row items-center gap-6'>
                    <CommonProfileImage
                        imgSrc={user.profile_img_url || ""}
                        name={user.name}
                        size={12}
                    />

                    <span className='text-font-white text-base font-semibold'>
                        {user.name}
                    </span>
                </div>

                <div className='flex flex-row items-center gap-2 min-w-[40%] max-w-[40%] justify-end'>
                    <input
                        type='number'
                        className='input w-[79%] max-w-xs outline-none border-none bg-input-box-gray rounded-lg text-center font-semibold text-sm focus:outline-none focus:border-none focus:ring-0 h-full'
                        onChange={(e) => {
                            const usersArray =
                                getValues().splitBy?.value.users || [];
                            const isUserInArray = usersArray.some(
                                (addedUsers) => addedUsers.user.id === user.id
                            );

                            let newUsersArray = null;
                            const newAmount = e.target.value;

                            if (newAmount === "") {
                                // Remove user if amount is 0.00
                                newUsersArray = usersArray.filter(
                                    (addedUsers) =>
                                        addedUsers.user.id !== user.id
                                );
                            } else if (isUserInArray) {
                                // Update existing user's amount
                                newUsersArray = usersArray.map((addedUsers) =>
                                    addedUsers.user.id === user.id
                                        ? { ...addedUsers, amount: newAmount }
                                        : addedUsers
                                );
                            } else {
                                // Add new user
                                newUsersArray = [
                                    ...usersArray,
                                    { user: user, amount: newAmount },
                                ];
                            }

                            field?.onChange({
                                value: {
                                    type: "Percentage",
                                    users: newUsersArray,
                                },
                            });
                        }}
                    />
                    <span>%</span>
                </div>
            </div>
        </>
    );
};

export default UserCardPercentageSplit;

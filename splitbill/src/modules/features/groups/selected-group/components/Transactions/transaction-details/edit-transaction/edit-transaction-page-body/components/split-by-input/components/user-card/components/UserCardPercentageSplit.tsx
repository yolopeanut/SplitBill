import { IAllUsersTable } from "../../../../../../../../../../../../../core/interfaces/all_usersTable";
import { ControllerRenderProps } from "react-hook-form";
import { UseFormGetValues } from "react-hook-form";
import { ICreateTransactionForm } from "../../../../../../../../../../../../../core/interfaces/createTransactionForm";
import CommonProfileImage from "../../../../../../../../../../../../../core/common/components/CommonProfileImage";

interface UserCardPercentageSplitProps {
    user: IAllUsersTable;
    field: ControllerRenderProps<ICreateTransactionForm, "splitBy"> | undefined;
    getValues: UseFormGetValues<ICreateTransactionForm>;
    originalSplitBy: ICreateTransactionForm["splitBy"] | undefined;
}

const UserCardPercentageSplit = ({
    user,
    field,
    getValues,
    originalSplitBy,
}: UserCardPercentageSplitProps) => {
    return (
        <>
            <div className='flex flex-row items-center gap-6 justify-between'>
                <div className='flex flex-row items-center gap-6'>
                    <div className='w-12 h-12 flex justify-center items-center bg-card-gray rounded-full'>
                        <CommonProfileImage
                            imgSrc={user.profile_img_url || ""}
                            name={user.name}
                            size={12}
                        />
                    </div>

                    <span className='text-font-white text-lg font-semibold'>
                        {user.name}
                    </span>
                </div>

                <div className='flex flex-row items-center gap-2 min-w-[40%] max-w-[40%] justify-end'>
                    <input
                        type='number'
                        className='input w-[79%] max-w-xs outline-none border-none bg-input-box-gray rounded-lg text-center font-semibold text-sm focus:outline-none focus:border-none focus:ring-0 h-full'
                        value={
                            getValues().splitBy?.value.users.find(
                                (selectedUsers) =>
                                    selectedUsers.user.id === user.id
                            )?.amount
                        }
                        onChange={(e) => {
                            const usersArray =
                                getValues().splitBy?.value.users || [];
                            const isUserInArray = usersArray.some(
                                (addedUsers) => addedUsers.user.id === user.id
                            );

                            // Find the original transaction split ID from originalSplitBy
                            const originalUserData =
                                originalSplitBy?.value.users.find(
                                    (selectedUsers) =>
                                        selectedUsers.user.id === user.id
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
                                newUsersArray = [
                                    ...usersArray,
                                    {
                                        user: user,
                                        amount: newAmount,
                                        transaction_split_id:
                                            originalUserData?.transaction_split_id ||
                                            null,
                                    },
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

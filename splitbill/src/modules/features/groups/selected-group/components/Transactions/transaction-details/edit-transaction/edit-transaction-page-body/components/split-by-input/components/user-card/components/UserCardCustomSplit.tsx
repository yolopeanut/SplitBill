import { UseFormGetValues } from "react-hook-form";
import { ControllerRenderProps } from "react-hook-form";
import { IAllUsersTable } from "../../../../../../../../../../../../../core/interfaces/all_usersTable";
import { ICreateTransactionForm } from "../../../../../../../../../../../../../core/interfaces/createTransactionForm";
import NumericInput from "./NumericInput";
import CommonProfileImage from "../../../../../../../../../../../../../core/common/components/CommonProfileImage";

interface UserCardCustomSplitProps {
    user: IAllUsersTable;
    field: ControllerRenderProps<ICreateTransactionForm, "splitBy"> | undefined;
    getValues: UseFormGetValues<ICreateTransactionForm>;
    originalSplitBy: ICreateTransactionForm["splitBy"] | undefined;
}

const UserCardCustomSplit = ({
    user,
    field,
    getValues,
    originalSplitBy,
}: UserCardCustomSplitProps) => {
    return (
        <>
            <div className='flex flex-row items-center gap-6 justify-between'>
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

                <div className='flex flex-row items-center gap-2 min-w-[45%] max-w-[45%]'>
                    RM
                    <NumericInput
                        initialValue={
                            getValues().splitBy?.value.users.find(
                                (selectedUsers) =>
                                    selectedUsers.user.id === user.id
                            )?.amount
                        }
                        onChange={(e) => {
                            const usersArray =
                                getValues().splitBy?.value?.users || [];
                            const isUserInArray = usersArray.some(
                                (addedUsers) => addedUsers.user.id === user.id
                            );
                            const newAmount = parseFloat(e.target.value);

                            // Find the original transaction split ID
                            const originalUserData =
                                originalSplitBy?.value.users.find(
                                    (selectedUsers) =>
                                        selectedUsers.user.id === user.id
                                );

                            let newUsersArray = null;

                            if (newAmount === 0) {
                                newUsersArray = usersArray.filter(
                                    (addedUsers) =>
                                        addedUsers.user.id !== user.id
                                );
                            } else if (isUserInArray) {
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
                                    type: "Custom",
                                    users: newUsersArray,
                                },
                            });
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default UserCardCustomSplit;

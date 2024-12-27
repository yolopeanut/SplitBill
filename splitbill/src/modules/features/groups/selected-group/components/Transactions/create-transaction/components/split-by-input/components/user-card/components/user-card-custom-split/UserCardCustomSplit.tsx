import { UseFormGetValues } from "react-hook-form";
import { ControllerRenderProps } from "react-hook-form";
import { IAllUsersTable } from "../../../../../../../../../../../../core/interfaces/all_usersTable";
import { ICreateTransactionForm } from "../../../../../../../../../../../../core/interfaces/createTransactionForm";
import NumericInput from "../numeric-input/NumericInput";
import CommonProfileImage from "../../../../../../../../../../../../core/common/components/CommonProfileImage";

interface IUserCardCustomSplitProps {
    user: IAllUsersTable;
    field: ControllerRenderProps<ICreateTransactionForm, "splitBy"> | undefined;
    getValues: UseFormGetValues<ICreateTransactionForm>;
}

const UserCardCustomSplit = ({
    user,
    field,
    getValues,
}: IUserCardCustomSplitProps) => {
    const currentAmount =
        field?.value?.value?.users
            ?.find((u) => u.user.id === user.id)
            ?.amount?.toFixed(2) || "0.00";
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
                        field={field}
                        value={currentAmount}
                        onChange={(e) => {
                            const usersArray =
                                getValues().splitBy?.value?.users || [];
                            const isUserInArray = usersArray.some(
                                (addedUsers) => addedUsers.user.id === user.id
                            );
                            const newAmount = parseFloat(e.target.value); // Convert string to number for the interface
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
                                        transaction_split_id: "", // Add empty string or generate an ID if needed
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

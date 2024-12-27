import { IAllUsersTable } from "../../../../../../../../../../../../../core/interfaces/all_usersTable";
import { ControllerRenderProps } from "react-hook-form";
import { UseFormGetValues } from "react-hook-form";
import { ICreateTransactionForm } from "../../../../../../../../../../../../../core/interfaces/createTransactionForm";
import CheckBox from "../../../../../../../../../../../../../core/common/components/CheckBox";
import CommonProfileImage from "../../../../../../../../../../../../../core/common/components/CommonProfileImage";

interface UserCardEqualSplitProps {
    user: IAllUsersTable;
    field: ControllerRenderProps<ICreateTransactionForm, "splitBy"> | undefined;
    getValues: UseFormGetValues<ICreateTransactionForm>;
    originalSplitBy: ICreateTransactionForm["splitBy"] | undefined;
}

const UserCardEqualSplit = ({
    user,
    field,
    getValues,
    originalSplitBy,
}: UserCardEqualSplitProps) => {
    // console.log({ getValues: getValues(), originalSplitBy });

    return (
        <>
            <div className='flex flex-row items-center justify-between'>
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

                <CheckBox
                    divClassName='w-5 h-5 text-brand-orange outline outline-1 outline-brand-orange rounded flex items-center justify-center'
                    iconClassName='text-font-black text-xl'
                    isCheckedInitially={getValues().splitBy?.value.users.some(
                        (selectedUsers) => selectedUsers.user.id === user.id
                    )}
                    onClick={() => {
                        const selectedUsersArray =
                            getValues().splitBy?.value.users || [];
                        const isUserSelected = selectedUsersArray.some(
                            (selectedUsers) => selectedUsers.user.id === user.id
                        );

                        // Find the original transaction split ID from originalSplitBy
                        const originalUserData =
                            originalSplitBy?.value.users.find(
                                (selectedUsers) =>
                                    selectedUsers.user.id === user.id
                            );

                        const newUsers = isUserSelected
                            ? selectedUsersArray.filter(
                                  (selectedUsers) =>
                                      selectedUsers.user.id !== user.id
                              )
                            : [
                                  ...selectedUsersArray,
                                  {
                                      user: user,
                                      amount:
                                          (getValues().amount || 0) /
                                          (getValues().splitBy?.value.users
                                              .length || 1),
                                      transaction_split_id:
                                          originalUserData?.transaction_split_id ||
                                          null,
                                  },
                              ];

                        // Update the field value with the new list of users
                        field?.onChange({
                            value: {
                                type: "Equal",
                                users: newUsers,
                            },
                        });
                    }}
                />
            </div>
        </>
    );
};

export default UserCardEqualSplit;

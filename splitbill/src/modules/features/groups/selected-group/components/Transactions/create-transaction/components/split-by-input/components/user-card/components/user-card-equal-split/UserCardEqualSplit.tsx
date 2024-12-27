import { ControllerRenderProps } from "react-hook-form";
import { UseFormGetValues } from "react-hook-form";
import { ICreateTransactionForm } from "../../../../../../../../../../../../core/interfaces/createTransactionForm";
import { IAllUsersTable } from "../../../../../../../../../../../../core/interfaces/all_usersTable";
import CheckBox from "../../../../../../../../../../../../core/common/components/CheckBox";
import CommonProfileImage from "../../../../../../../../../../../../core/common/components/CommonProfileImage";

interface IUserCardEqualSplitProps {
    user: IAllUsersTable;
    field: ControllerRenderProps<ICreateTransactionForm, "splitBy"> | undefined;
    getValues: UseFormGetValues<ICreateTransactionForm>;
}

const UserCardEqualSplit = ({
    user,
    field,
    getValues,
}: IUserCardEqualSplitProps) => {
    return (
        <>
            <div className='flex flex-row items-center justify-between'>
                <div className='flex flex-row items-center gap-6'>
                    <div className='w-12 h-12 flex justify-center items-center bg-card-gray rounded-full'>
                        <CommonProfileImage
                            imgSrc={user.profile_img_url || ""}
                            name={user.name}
                            size={12}
                        />
                    </div>

                    <span className='text-font-white text-base font-semibold'>
                        {user.name}
                    </span>
                </div>

                <CheckBox
                    divClassName='w-5 h-5 text-brand-orange outline outline-1 outline-brand-orange rounded flex items-center justify-center'
                    iconClassName='text-font-black text-xl'
                    onClick={() => {
                        const selectedUsersArray =
                            getValues().splitBy?.value.users || [];
                        const isUserSelected = selectedUsersArray.some(
                            (selectedUsers) => selectedUsers.user.id === user.id
                        );

                        const newUsers = isUserSelected
                            ? selectedUsersArray.filter(
                                  (selectedUsers) =>
                                      selectedUsers.user.id !== user.id
                              ) // Remove user if already selected
                            : [
                                  ...selectedUsersArray,
                                  { user: user, amount: 0 },
                              ]; // Add user if not selected

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

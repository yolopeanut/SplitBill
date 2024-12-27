import { Controller, ControllerRenderProps, Control } from "react-hook-form";
import { ICreateTransactionForm } from "../../../../../../../../../../core/interfaces/createTransactionForm";
import { useGetGroupUsers } from "./hooks/useGetGroupUsers";
import { useGroupsContext } from "../../../../../../../../hooks/useGroupsContext";
import { IAllUsersTable } from "../../../../../../../../../../core/interfaces/all_usersTable";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FieldErrors } from "react-hook-form";
import CommonDrawer from "../../../../../../../../../../core/common/components/CommonDrawer";
import useFilterKickedGroupUsers from "../../../../../../../../../../core/common/hooks/useFilterKickedGroupUsers";

interface PaidByInputProps {
    control: Control<ICreateTransactionForm>;
    errors: FieldErrors<ICreateTransactionForm>;
}

export const PaidByInput = ({ control, errors }: PaidByInputProps) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<IAllUsersTable | null>(
        null
    );
    const [searchQuery, setSearchQuery] = useState("");
    const { selectedGroupId } = useGroupsContext();

    const { data: groupUsers } = useGetGroupUsers({
        group_id: selectedGroupId || "",
    });

    const filteredGroupUsers = useFilterKickedGroupUsers(groupUsers);

    // Filter users based on search query (contains search query)
    const filteredUsersBySearchQuery = filteredGroupUsers?.filter((user) => {
        return user.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const handleDrawerOpen = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    useEffect(() => {
        setSelectedUser(
            groupUsers?.find(
                (user) => user.id === control._defaultValues.paidBy
            ) || null
        );
    }, [control, groupUsers]);

    return (
        <>
            {/* Paid By Input Box */}
            <div
                className='flex flex-col gap-2 w-full pb-4'
                onClick={handleDrawerOpen}
            >
                <span className='text-font-white text-sm font-semibold'>
                    Paid By
                </span>
                <div className='w-full min-h-16 bg-card-gray-dark rounded-lg flex items-center px-4 text-font-text-gray'>
                    {selectedUser ? (
                        <div className='py-4'>
                            <UserCard
                                user={selectedUser}
                                field={undefined}
                                setSelectedUser={undefined}
                                setIsDrawerOpen={undefined}
                            />
                        </div>
                    ) : (
                        "Select who paid"
                    )}
                </div>
                {errors.paidBy && (
                    <span className='text-font-red text-sm'>
                        {errors.paidBy.message}
                    </span>
                )}
            </div>

            {/* Paid By Drawer Controller */}
            <Controller
                name='paidBy'
                control={control}
                rules={{
                    validate: {
                        minPaidBy: (value) => {
                            if (!value) {
                                return "Please select a user";
                            }
                        },
                    },
                }}
                render={({ field }) => (
                    <CommonDrawer
                        isOpen={isDrawerOpen}
                        toggleDrawer={handleDrawerOpen}
                        size='80vh'
                    >
                        <div className='flex flex-col gap-4 p-4 pt-4 h-full overflow-y-auto pb-20'>
                            {/* Search Input */}
                            <div className='relative'>
                                <input
                                    type='text'
                                    id='floating_outlined'
                                    className='block px-2.5 pb-2.5 pt-4 w-full text-sm bg-input-search-gray rounded-lg border border-input-search-gray appearance-auto text-white focus:border-input-search-gray focus:outline-none focus:ring-0 peer'
                                    placeholder=' '
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                />
                                <label
                                    htmlFor='floating_outlined'
                                    className='absolute text-sm text-gray-500 duration-300 transform -translate-y-24 scale-75 top-0 z-10 origin-[0] bg-transparent px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[0.4rem] peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 '
                                >
                                    Search User
                                </label>
                            </div>

                            {/* User Cards */}
                            {filteredUsersBySearchQuery?.map((user) => (
                                <UserCard
                                    user={user}
                                    key={user.id}
                                    field={field}
                                    setSelectedUser={setSelectedUser}
                                    setIsDrawerOpen={setIsDrawerOpen}
                                />
                            ))}
                        </div>
                    </CommonDrawer>
                )}
            />
        </>
    );
};

export default PaidByInput;

const UserCard = ({
    user,
    field,
    setSelectedUser,
    setIsDrawerOpen,
}: {
    user: IAllUsersTable;
    field: ControllerRenderProps<ICreateTransactionForm, "paidBy"> | undefined;
    setSelectedUser:
        | Dispatch<SetStateAction<IAllUsersTable | null>>
        | undefined;
    setIsDrawerOpen: Dispatch<SetStateAction<boolean>> | undefined;
}) => {
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
                    {user.profile_img_src ? (
                        <img
                            src={user.profile_img_url || ""}
                            alt='user profile'
                            className='w-12 h-12 rounded-full'
                        />
                    ) : (
                        <span className='text-font-black text-lg font-semibold'>
                            {user.name.charAt(0)}
                        </span>
                    )}
                    <span className='text-font-white text-lg font-semibold'>
                        {user.name}
                    </span>
                </div>
            </div>
        </>
    );
};

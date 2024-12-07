import { Controller, useForm } from "react-hook-form";
import useGetAllFriends from "./hooks/useGetAllFriends";
import UserCard from "./components/UserCard";
import useFilterCurrentUser from "../../../../../../../../core/common/hooks/useFilterCurrentUser";
import { Dispatch, SetStateAction } from "react";
import { IEditUserForm } from "../../../../../../../../core/interfaces/editUserForm";
import useFavouritedFriends from "../../../../../../../../core/common/hooks/useFavouritedFriends";
import { useGroupsContext } from "../../../../../../hooks/useGroupsContext";
import CommonDrawer from "../../../../../../../../core/common/components/CommonDrawer";
import { PiConfetti } from "react-icons/pi";
import useAddUsersToGroup from "./hooks/useAddUsersToGroup";
import useFilterGroupUsersByFriends from "../../../../../../../../core/common/hooks/useFilterGroupUsersByFriends";

interface ISelectUsersInputProps {
	isSelectUsersDrawerOpen: boolean;
	setIsSelectUsersDrawerOpen: Dispatch<SetStateAction<boolean>>;
}

const SelectUsersInput = ({
	setIsSelectUsersDrawerOpen,
	isSelectUsersDrawerOpen,
}: ISelectUsersInputProps) => {
	const { groupUsers } = useGroupsContext();

	// Get all friends
	const { data: friends } = useGetAllFriends();

	// // Filter current user from friends
	const filteredFriends = useFilterCurrentUser(friends ?? []);

	// Filter out users that are already in the group
	const filteredGroupUsersAndCurrentUser = useFilterGroupUsersByFriends(
		filteredFriends ?? [],
		groupUsers ?? undefined
	);

	// Filter favourited friends
	const { favouritedFriends, normalFriends } = useFavouritedFriends({
		data: filteredGroupUsersAndCurrentUser ?? [],
		searchQuery: "",
	});

	const { control, getValues } = useForm<IEditUserForm>({});

	const drawerSize = filteredGroupUsersAndCurrentUser.length > 0 ? "90vh" : "50vh";

	const { addUsersToGroup } = useAddUsersToGroup();

	return (
		<>
			{/* Select Friends Drawer Controller */}
			<Controller
				name='users'
				control={control}
				rules={{
					validate: {
						minUsers: (value) => {
							if (!Array.isArray(value) || value.length <= 0) {
								return "Please select at least one person";
							}

							return true;
						},
					},
				}}
				render={({ field }) => (
					<CommonDrawer
						isOpen={isSelectUsersDrawerOpen}
						toggleDrawer={() => setIsSelectUsersDrawerOpen(false)}
						size={drawerSize}
					>
						<div className='flex flex-col gap-4 pt-4 h-full overflow-y-auto pb-20'>
							{/* {Any Friends} */}
							{filteredGroupUsersAndCurrentUser && filteredGroupUsersAndCurrentUser.length > 0 && (
								<>
									<div className='flex flex-col gap-12 h-full items-center justify-center w-full'>
										<div className='flex flex-col gap-4 h-full overflow-y-auto px-4 w-full'>
											{/* Search Input */}
											<div className='relative'>
												<input
													type='text'
													id='floating_outlined'
													className='block px-2.5 pb-2.5 pt-4 w-full text-sm bg-input-search-gray rounded-lg border border-input-search-gray appearance-auto text-white focus:border-input-search-gray focus:outline-none focus:ring-0 peer'
													placeholder=' '
												/>
												<label
													htmlFor='floating_outlined'
													className='absolute text-sm text-font-text-gray duration-300 transform -translate-y-24 scale-75 top-0 z-10 origin-[0] bg-transparent px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[0.4rem] peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 '
												>
													Search User
												</label>
											</div>

											{/* Favourited User Cards */}
											{favouritedFriends && favouritedFriends.length > 0 && (
												<div className='flex flex-col gap-2'>
													<span className='text-font-white text-lg font-semibold'>Favourites</span>
													{favouritedFriends?.map((user) => (
														<UserCard
															user={user}
															key={user.id}
															field={field}
															getValues={getValues}
															type='checkbox'
														/>
													))}
												</div>
											)}

											{/* Normal User Cards */}
											{normalFriends && normalFriends.length > 0 && (
												<div className='flex flex-col gap-2'>
													<span className='text-font-white text-lg font-semibold'>Friends</span>
													{normalFriends?.map((user) => (
														<UserCard
															user={user}
															key={user.id}
															field={field}
															getValues={getValues}
															type='checkbox'
														/>
													))}
												</div>
											)}
										</div>

										<button
											className='bg-brand-orange text-font-black font-semibold rounded-lg w-[70%] outline-none border-none py-2'
											onClick={async () => {
												setIsSelectUsersDrawerOpen(false);
												await addUsersToGroup({ getValues });
												field.onChange([]);
											}}
										>
											Add Friends to Group
										</button>
									</div>
								</>
							)}

							{/* {No Friends found} */}
							{filteredGroupUsersAndCurrentUser &&
								filteredGroupUsersAndCurrentUser.length === 0 && (
									<div className='flex flex-col justify-center items-center gap-2 h-full'>
										<PiConfetti
											size={100}
											className='text-brand-orange'
										/>
										<span className='text-font-white text-xl font-semibold'>
											All your friends are in the group!
										</span>
									</div>
								)}
						</div>
					</CommonDrawer>
				)}
			/>
		</>
	);
};

export default SelectUsersInput;

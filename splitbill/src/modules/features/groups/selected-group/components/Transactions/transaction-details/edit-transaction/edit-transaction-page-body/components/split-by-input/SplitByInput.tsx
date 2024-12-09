import {
	Controller,
	ControllerRenderProps,
	Control,
	UseFormGetValues,
	FieldErrors,
} from "react-hook-form";
import { ICreateTransactionForm } from "../../../../../../../../../../core/interfaces/createTransactionForm";
import { useGetGroupUsers } from "../paid-by-input/hooks/useGetGroupUsers";
import { useGroupsContext } from "../../../../../../../../hooks/useGroupsContext";
import { useEffect, useState } from "react";
import SplitByCard from "./components/SplitByCard";
import UserCard from "./components/user-card/UserCard";
import TotalComponent from "./components/TotalComponent";
import useFilterKickedGroupUsers from "../../../../../../../../../../core/common/hooks/useFilterKickedGroupUsers";
import CommonDrawer from "../../../../../../../../../../core/common/components/CommonDrawer";

type SplitByInputProps = {
	control: Control<ICreateTransactionForm>;
	getValues: UseFormGetValues<ICreateTransactionForm>;
	errors: FieldErrors<ICreateTransactionForm>;
};

type SelectedSplitType = "Equal" | "Custom" | "Percentage";

export const SplitByInput = ({ control, getValues, errors }: SplitByInputProps) => {
	// Drawer State
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	// Split By State
	const [selectedSplitType, setSelectedSplitType] = useState<SelectedSplitType>("Equal");

	// Get Group Users
	const { selectedGroupId } = useGroupsContext();

	// Get Group Users from Database
	const { data: groupUsers } = useGetGroupUsers({ group_id: selectedGroupId || "" });

	// Filter Kicked Users
	const filteredGroupUsers = useFilterKickedGroupUsers(groupUsers);

	// Handle Drawer Open
	const handleDrawerOpen = () => {
		setIsDrawerOpen(!isDrawerOpen);
	};

	// On Split Type Change
	const handleSplitTypeChange = (
		type: string,
		field: ControllerRenderProps<ICreateTransactionForm, "splitBy">
	) => {
		// Set Selected Split Type
		setSelectedSplitType(type as SelectedSplitType);

		// Set Selected Users in Field
		field.onChange({ value: { type: type, users: [] } });
	};

	const splitByUsers = getValues().splitBy?.value.users;

	useEffect(() => {
		setSelectedSplitType(getValues().splitBy?.value.type as SelectedSplitType);
	}, [getValues, splitByUsers]);

	return (
		<>
			{/* Split By Input Box */}
			<div
				className='flex flex-col gap-2 w-full pb-4'
				onClick={handleDrawerOpen}
			>
				<span className='text-font-white text-sm font-semibold'>
					Split By <span className='text-brand-orange'> [{selectedSplitType}]</span>
				</span>
				<div className='w-full bg-card-gray-dark rounded-lg flex flex-col items-start p-4 gap-2 min-h-16 text-font-text-gray justify-center'>
					{splitByUsers !== undefined && splitByUsers.length > 0
						? splitByUsers.map((user, index) => (
								<UserCard
									key={`selected-user-${user.user.id}-${index}`}
									user={user.user}
									field={undefined}
									selectedSplitType={undefined}
									getValues={getValues}
								/>
						  ))
						: "Select friends"}
				</div>
				{errors.splitBy && <span className='text-font-red text-sm'>{errors.splitBy.message}</span>}
			</div>

			{/* Split By Drawer Controller */}
			<Controller
				name='splitBy'
				control={control}
				rules={{
					validate: {
						minSplitBy: (value) => {
							if (!value) return "Please select a split type or users";
							if (value.value.users.length <= 1) {
								return "Please select two or more users";
							}
							return true;
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
									className='block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-input-search-gray rounded-lg border border-input-search-gray appearance-auto focus:border-input-search-gray focus:outline-none focus:ring-0 peer'
									placeholder=' '
								/>
								<label
									htmlFor='floating_outlined'
									className='absolute text-sm text-gray-500 duration-300 transform -translate-y-24 scale-75 top-0 z-10 origin-[0] bg-transparent px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[0.4rem] peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 '
								>
									Search User
								</label>
							</div>

							{/* Split By Cards */}
							<div className='flex flex-row gap-4'>
								<SplitByCard
									type='Equal'
									field={field}
									selectedSplitType={selectedSplitType}
									handleSplitTypeChange={handleSplitTypeChange}
								/>
								<SplitByCard
									type='Custom'
									field={field}
									selectedSplitType={selectedSplitType}
									handleSplitTypeChange={handleSplitTypeChange}
								/>
								<SplitByCard
									type='Percentage'
									field={field}
									selectedSplitType={selectedSplitType}
									handleSplitTypeChange={handleSplitTypeChange}
								/>
							</div>

							{/* User Cards */}
							{filteredGroupUsers?.map((user) => (
								<UserCard
									key={user.id}
									user={user}
									field={field}
									selectedSplitType={selectedSplitType}
									getValues={getValues}
								/>
							))}

							<hr className='border-[0.1px] border-brand-orange rounded-lg w-full' />

							{/* Total Component */}
							<TotalComponent
								type={selectedSplitType}
								getValues={getValues}
							/>

							<button
								type='button'
								className='btn bg-brand-orange text-font-black rounded-lg p-2 w-full'
								onClick={handleDrawerOpen}
							>
								<span className='text-font-black text-lg font-semibold'>Done</span>
							</button>
						</div>
					</CommonDrawer>
				)}
			/>
		</>
	);
};

export default SplitByInput;

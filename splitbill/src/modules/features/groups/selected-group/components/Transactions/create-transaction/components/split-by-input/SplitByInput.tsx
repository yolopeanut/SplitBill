import { Controller, ControllerRenderProps, Control, UseFormGetValues } from "react-hook-form";
import FormValues from "../../../../../../../../core/interfaces/createTransactionForm";
import { useGetGroupUsers } from "../paid-by-input/hooks/useGetGroupUsers";
import { useGroupsContext } from "../../../../../../hooks/useGroupsContext";
import Drawer from "react-modern-drawer";
import { useState } from "react";
import SplitByCard from "./components/SplitByCard";
import UserCard from "./components/user-card/UserCard";
import TotalComponent from "./components/TotalComponent";

type SplitByInputProps = {
	control: Control<FormValues>;
	getValues: UseFormGetValues<FormValues>;
};

type SelectedSplitType = "Equal" | "Custom" | "Percentage";

export const SplitByInput = ({ control, getValues }: SplitByInputProps) => {
	// Drawer State
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	// Split By State
	const [selectedSplitType, setSelectedSplitType] = useState<SelectedSplitType>("Equal");

	// Get Group Users
	const { selectedGroupId } = useGroupsContext();

	// Get Group Users from Database
	const { data: groupUsers } = useGetGroupUsers({ group_id: selectedGroupId || "" });

	// Handle Drawer Open
	const handleDrawerOpen = () => {
		setIsDrawerOpen(!isDrawerOpen);
	};

	// On Split Type Change
	const handleSplitTypeChange = (
		type: string,
		field: ControllerRenderProps<FormValues, "splitBy">
	) => {
		// Set Selected Split Type
		setSelectedSplitType(type as SelectedSplitType);

		// Set Selected Users in Field
		field.onChange({ value: { type: type, users: [] } });
	};

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
				<div className='w-full bg-card-gray-dark rounded-lg flex flex-col items-start p-4 gap-2 min-h-16 '>
					{getValues().splitBy?.value.users !== undefined
						? getValues().splitBy?.value.users.map((user, index) => (
								<UserCard
									key={`selected-user-${user.user.id}-${index}`}
									user={user.user}
									field={undefined}
									selectedSplitType={undefined}
									getValues={getValues}
								/>
						  ))
						: "Select User"}
				</div>
			</div>

			{/* Split By Drawer Controller */}
			<Controller
				name='splitBy'
				control={control}
				render={({ field }) => (
					<Drawer
						open={isDrawerOpen}
						onClose={handleDrawerOpen}
						direction='bottom'
						className='rounded-t-lg h-full w-full'
						size='80%'
						lockBackgroundScroll={true}
						style={{ backgroundColor: "#1F1F1F" }}
						duration={400}
					>
						<div className='flex flex-col gap-4 p-8 pt-4 h-full overflow-y-auto pb-20'>
							{/* Swipe to close */}
							<div className='border-brand-orange border-2 rounded-lg w-14 self-center'></div>

							{/* Search Input */}
							<div className='relative'>
								<input
									type='text'
									id='floating_outlined'
									className='block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-input-search-gray rounded-lg border border-input-search-gray appearance-auto text-white focus:border-input-search-gray focus:outline-none focus:ring-0 peer'
									placeholder=' '
								/>
								<label
									htmlFor='floating_outlined'
									className='absolute text-sm text-gray-500 text-gray-400 duration-300 transform -translate-y-24 scale-75 top-0 z-10 origin-[0] bg-gray-900 px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[0.4rem] peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 '
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
							{groupUsers?.map((user) => (
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
					</Drawer>
				)}
			/>
		</>
	);
};

export default SplitByInput;

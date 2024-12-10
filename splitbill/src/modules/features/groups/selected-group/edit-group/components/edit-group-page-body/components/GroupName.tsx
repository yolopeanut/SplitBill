import { UseFormRegister } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import { IAllGroupsTable } from "../../../../../../../core/interfaces/all_GroupsTable";

interface IGroupNameProps {
	selectedGroup: IAllGroupsTable | null;
	register: UseFormRegister<FieldValues>;
}

const GroupName = ({ selectedGroup, register }: IGroupNameProps) => {
	return (
		<div className='flex flex-col gap-2'>
			<span className='text-font-white text-base font-semibold'>Group Name</span>
			<input
				type='text'
				className='input w-full bg-input-box-gray outline-none border-none'
				placeholder={selectedGroup?.name}
				{...register("groupName")}
			/>
		</div>
	);
};

export default GroupName;

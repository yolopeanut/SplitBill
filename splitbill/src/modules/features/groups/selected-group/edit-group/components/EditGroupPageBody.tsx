import { useForm } from "react-hook-form";
import { useGroupsContext } from "../../../hooks/useGroupsContext";
import { BiSolidEditAlt } from "react-icons/bi";
import { IoIosAdd } from "react-icons/io";

const EditGroupPageBody = () => {
	const { selectedGroup, groupUsers } = useGroupsContext();
	const { register } = useForm();

	const handleDeleteGroup = () => {
		console.log("Delete Group");
	};

	return (
		<>
			<div className='flex flex-col gap-4 px-4 w-full h-full'>
				{/* Group Image */}
				<div className='h-[30%] relative'>
					<img
						src={selectedGroup?.img_url || ""}
						alt='group-image'
						className='w-full max-h-full aspect-square object-fill rounded-xl'
					/>
					<button className='btn btn-sm absolute bottom-2 right-2 bg-brand-orange p-1 rounded-md text-font-black'>
						<BiSolidEditAlt size={20} />
					</button>
				</div>

				{/* Group Name */}
				<div className='flex flex-col gap-2'>
					<span className='text-font-white text-sm font-semibold'>Group Name</span>
					<input
						type='text'
						className='input w-full bg-input-box-gray outline-none border-none'
						placeholder={selectedGroup?.name}
						{...register("groupName")}
					/>
				</div>

				{/* Users */}
				<div className='flex flex-col gap-4 pb-8'>
					<div className='flex flex-row justify-between'>
						<span className='text-font-white text-sm font-semibold'>Group Members</span>
						<button className='btn btn-xs min-w-[4.5rem] border-brand-orange text-brand-orange rounded-full'>
							<div className='flex flex-row items-center gap-2 justify-between w-full'>
								<IoIosAdd
									size={15}
									className='bg-brand-orange text-font-black rounded-full'
								/>
								<span className='text-font-white text-xs font-normal'>Add</span>
							</div>
						</button>
					</div>

					{groupUsers?.map((user) => (
						<div
							key={user.id}
							className='flex flex-row items-center gap-6'
						>
							<img
								src={user.profile_img_url || ""}
								alt='user-image'
								className='w-10 h-10 rounded-full'
							/>
							<div className='flex flex-col gap-1'>
								<span className='text-font-white text-sm font-semibold'>{user.name}</span>
								<span className='text-font-text-gray text-xs font-semibold'>
									@{user.unique_username}
								</span>
							</div>
						</div>
					))}
				</div>

				{/* Save Button */}
				<button
					type='submit'
					className='btn bg-brand-orange text-font-black w-full'
				>
					Save
				</button>

				{/* Delete Group Button */}
				<button
					type='button'
					className='btn border-outline-red text-outline-red w-full'
					onClick={handleDeleteGroup}
				>
					Delete Group
				</button>
			</div>
		</>
	);
};

export default EditGroupPageBody;

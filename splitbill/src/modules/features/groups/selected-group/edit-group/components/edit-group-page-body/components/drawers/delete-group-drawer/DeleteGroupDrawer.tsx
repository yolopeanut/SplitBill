import { Dispatch, SetStateAction } from "react";
import CommonDrawer from "../../../../../../../../../core/common/components/CommonDrawer";
import { TbHttpDelete } from "react-icons/tb";
import useDeleteGroup from "./hook/useDeleteGroup";
import { useNavigate } from "react-router-dom";

interface DeleteGroupDrawerProps {
	setIsDeleteGroupDrawerOpen: Dispatch<SetStateAction<boolean>>;
	isDeleteGroupDrawerOpen: boolean;
	selectedGroupId: string;
}

const DeleteGroupDrawer = ({
	setIsDeleteGroupDrawerOpen,
	isDeleteGroupDrawerOpen,
	selectedGroupId,
}: DeleteGroupDrawerProps) => {
	const { deleteGroup } = useDeleteGroup();
	const navigate = useNavigate();

	const handleDeleteGroup = async () => {
		await deleteGroup({ groupId: selectedGroupId ?? "" });
		setIsDeleteGroupDrawerOpen(false);
		navigate("/groups");
	};

	return (
		<CommonDrawer
			isOpen={isDeleteGroupDrawerOpen}
			toggleDrawer={() => setIsDeleteGroupDrawerOpen(false)}
		>
			<div className='flex flex-col items-center justify-center gap-8 w-full h-full'>
				<div className='text-center text-white text-2xl font-semibold flex flex-col items-center justify-center gap-2 w-full'>
					<TbHttpDelete
						size={100}
						className='text-font-red-dark'
					/>
					<div className='text-xl'>Delete group?</div>
					<span className='text-font-red-light text-sm'>
						Warning: This action cannot be undone.
					</span>
				</div>
				<button
					className='btn bg-background-red-dark text-font-white w-[70%] outline-none border-none'
					onClick={handleDeleteGroup}
				>
					Delete Group
				</button>
			</div>
		</CommonDrawer>
	);
};

export default DeleteGroupDrawer;

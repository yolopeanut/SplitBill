import { Dispatch, SetStateAction } from "react";
import CommonDrawer from "../../../../../core/common/components/CommonDrawer";
import { FaPersonWalkingLuggage } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import useLeaveGroup from "./hooks/useLeaveGroup";
import { useGroupsContext } from "../../../hooks/useGroupsContext";

interface LeaveGroupDrawerProps {
	setIsLeaveGroupDrawerOpen: Dispatch<SetStateAction<boolean>>;
	isLeaveGroupDrawerOpen: boolean;
}

const LeaveGroupDrawer = ({
	setIsLeaveGroupDrawerOpen,
	isLeaveGroupDrawerOpen,
}: LeaveGroupDrawerProps) => {
	const { leaveGroup } = useLeaveGroup();
	const { selectedGroup } = useGroupsContext();
	const navigate = useNavigate();

	const handleDeleteGroup = async () => {
		await leaveGroup({ groupId: selectedGroup?.id ?? "" });
		setIsLeaveGroupDrawerOpen(false);
		navigate("/groups");
	};

	return (
		<CommonDrawer
			isOpen={isLeaveGroupDrawerOpen}
			toggleDrawer={() => setIsLeaveGroupDrawerOpen(false)}
		>
			<div className='flex flex-col items-center justify-center gap-8 w-full h-full'>
				<div className='text-center text-white text-2xl font-semibold flex flex-col items-center justify-center gap-2 w-full'>
					<FaPersonWalkingLuggage
						size={100}
						className='text-brand-orange'
					/>
					<div className='text-xl'>Leave group?</div>
					<span className='text-font-red-light text-sm'>
						Warning: This action cannot be undone.
					</span>
				</div>
				<button
					className='btn bg-background-red-dark text-font-white w-[70%] outline-none border-none'
					onClick={handleDeleteGroup}
				>
					Leave Group
				</button>
			</div>
		</CommonDrawer>
	);
};

export default LeaveGroupDrawer;
// Compare this snippet from src/modules/features/groups/selected-group/edit-group/components/edit-group-page-body/components/edit-group-page-body.tsx:

import { Dispatch, SetStateAction } from "react";
import useKickGroupMember from "../../hooks/useKickGroupMember";
import CommonDrawer from "../../../../../../../../core/common/components/CommonDrawer";
import { useGroupsContext } from "../../../../../../hooks/useGroupsContext";
import { GiBootKick } from "react-icons/gi";

interface KickUsersDrawerProps {
	setIsKickUsersDrawerOpen: Dispatch<SetStateAction<boolean>>;
	isKickUsersDrawerOpen: boolean;
	selectedId: string;
	selectedGroupId: string;
}

const KickUsersDrawer = ({
	setIsKickUsersDrawerOpen,
	isKickUsersDrawerOpen,
	selectedId,
	selectedGroupId,
}: KickUsersDrawerProps) => {
	const { kickGroupMember } = useKickGroupMember();

	const handleKickUser = () => {
		kickGroupMember({ userId: selectedId, groupId: selectedGroupId ?? "" });
		setIsKickUsersDrawerOpen(false);
	};

	const { groupUsers } = useGroupsContext();
	const selectedUser = groupUsers?.find((user) => user.id === selectedId);

	return (
		<CommonDrawer
			isOpen={isKickUsersDrawerOpen}
			toggleDrawer={() => setIsKickUsersDrawerOpen(false)}
		>
			<div className='flex flex-col items-center justify-center gap-8 w-full h-full'>
				<div className='text-center text-white text-2xl font-semibold flex flex-col items-center justify-center gap-2 w-full'>
					<GiBootKick
						size={100}
						className='text-brand-orange'
					/>
					<div className='text-xl'>
						Kick user <span className='text-brand-orange'>{selectedUser?.name}</span> from group?
					</div>
				</div>
				<button
					className='btn bg-background-red-dark text-font-white w-[70%] outline-none border-none'
					onClick={handleKickUser}
					disabled={!selectedId}
				>
					Kick User
				</button>
			</div>
		</CommonDrawer>
	);
};

export default KickUsersDrawer;

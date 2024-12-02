import { queryClient } from "../../../../config/ReactQuery";
import CommonDrawer from "../../../core/common/components/CommonDrawer";
import { GiBackstab } from "react-icons/gi";
import { useDeleteFriend } from "../hooks/useDeleteFriend";

interface DrawerComponentProps {
	isOpen: boolean;
	toggleDrawer: () => void;
	friendId: string;
}

const DrawerComponent = ({ isOpen, toggleDrawer, friendId }: DrawerComponentProps) => {
	const deleteFriend = useDeleteFriend();

	const handleCancel = () => {
		toggleDrawer();
	};

	const handleBetray = async () => {
		await deleteFriend(friendId);
		toggleDrawer();
		queryClient.invalidateQueries({ queryKey: ["friends", "fetchFriends"] });
	};

	return (
		<div className='w-full rounded-t-2xl h-full flex flex-col items-center justify-center'>
			<CommonDrawer
				isOpen={isOpen}
				toggleDrawer={toggleDrawer}
			>
				<div className='flex flex-col items-center gap-16 h-full justify-center'>
					<div className='flex flex-col items-center gap-2'>
						<GiBackstab
							size={70}
							className='text-brand-orange'
						/>
						<span className='text-font-white text-2xl font-semibold'>Betray Friend?</span>
						<span className='text-font-text-gray text-sm font-thin'>
							This action may have consequences...
						</span>
					</div>

					<div className='flex flex-row justify-center gap-8'>
						<button
							onClick={handleCancel}
							className='btn rounded-full w-[30vw] border-brand-orange font-bold'
						>
							Cancel
						</button>
						<button
							onClick={handleBetray}
							className='btn rounded-full w-[30vw] bg-brand-orange border-brand-orange text-font-black font-semibold'
						>
							Betray
						</button>
					</div>
				</div>
			</CommonDrawer>
		</div>
	);
};

export default DrawerComponent;

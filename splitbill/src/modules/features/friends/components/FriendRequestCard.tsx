import ImagePlaceholder from "../../../core/common/components/ImagePlaceholder";
import { useAcceptFriendRequest } from "../hooks/useAcceptFriendRequest";

const FriendRequestCard = ({
	name,
	uniqueUsername,
	img_src,
	sender_id,
}: {
	name: string;
	uniqueUsername: string;
	img_src: string | null;
	sender_id: string;
}) => {
	const acceptFriendRequest = useAcceptFriendRequest();

	const handleAcceptFriendRequest = () => {
		acceptFriendRequest(sender_id);
	};
	return (
		<div className='bg-input-search-gray rounded-lg flex flex-col items-start gap-4 p-4'>
			<div className='flex flex-row items-center gap-2 w-full'>
				<div className='avatar w-14 '>
					<ImagePlaceholder
						imgSrc={img_src}
						name={name}
						className='bg-background-black'
					/>
				</div>
				<div className='flex flex-col justify-center gap-2'>
					<div className='flex flex-col'>
						<span className='text-font-white text-lg font-semibold'>{name}</span>
						<span className='text-font-text-gray text-sm font-normal'>@{uniqueUsername}</span>
					</div>
					<span className='text-font-white text-sm font-normal'>Has sent you a friend request</span>
				</div>
			</div>
			<div className='flex flex-row items-center gap-2 w-full self-center justify-center'>
				<button
					onClick={handleAcceptFriendRequest}
					className='btn btn-sm border-none bg-brand-orange w-[48%] text-font-black text-base font-bold'
				>
					Accept
				</button>
				<button className='btn btn-sm border-brand-orange w-[48%] bg-background-black text-font-white text-base font-bold'>
					Decline
				</button>
			</div>
		</div>
	);
};

export default FriendRequestCard;

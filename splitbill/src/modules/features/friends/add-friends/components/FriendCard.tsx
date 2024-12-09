import { IoMdPersonAdd } from "react-icons/io";
import ImagePlaceholder from "../../../../core/common/components/ImagePlaceholder";
import { FaUserCheck } from "react-icons/fa";
import { queryClient } from "../../../../../config/ReactQuery";
import useDeleteFriendRequest from "../hooks/useDeleteFriendRequest";
import useSendFriendRequest from "../hooks/useSendFriendRequest";
import useGetAllSentFriendRequests from "../hooks/useGetAllSentFriendRequests";

interface IFriendCardProps {
	id: string;
	imgSrc: string | null;
	name: string;
	uniqueUsername: string;
}

const FriendCard = ({ id, imgSrc, name, uniqueUsername }: IFriendCardProps) => {
	const sendFriendRequest = useSendFriendRequest();
	const deleteFriendRequest = useDeleteFriendRequest();
	const isRequested = useGetAllSentFriendRequests();

	const FriendRequestButton = () => {
		if (isRequested.data?.some((request) => request.id === id)) {
			return (
				<button
					className='btn btn-primary text-brand-orange border-none'
					onClick={async () => {
						await deleteFriendRequest({ p_receiver_id: id });
						queryClient.invalidateQueries({ queryKey: ["friends", "fetchSentFriendRequests"] });
					}}
				>
					<FaUserCheck size={30} />
				</button>
			);
		} else {
			return (
				<button
					className='btn btn-primary text-brand-orange border-none'
					onClick={async () => {
						await sendFriendRequest({ p_receiver_id: id });
						queryClient.invalidateQueries({ queryKey: ["friends", "fetchSentFriendRequests"] });
					}}
				>
					<IoMdPersonAdd size={30} />
				</button>
			);
		}
	};

	return (
		<div className='flex flex-row justify-between gap-4'>
			<div className='flex flex-row gap-4'>
				<div className='avatar min-w-14 min-h-14 max-w-14 max-h-14'>
					<ImagePlaceholder
						imgSrc={imgSrc}
						name={name}
						className='bg-input-search-gray'
					/>
				</div>

				<div className='flex flex-col gap-1 justify-start'>
					<span className='text-font-white text-lg font-semibold '>{name}</span>
					<span className='text-font-text-gray text-sm font-normal'>@{uniqueUsername}</span>
				</div>
			</div>
			<FriendRequestButton />
		</div>
	);
};

export default FriendCard;

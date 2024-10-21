import { IoPersonAddSharp } from "react-icons/io5";
import { getInitials } from "../../core/common/commonFunctions";
import { BsStar } from "react-icons/bs";
import { BsStarFill } from "react-icons/bs";
import { Dispatch, SetStateAction, useState } from "react";
import { useGetAllFriends } from "./hooks/useGetAllFriends";
import { useGetAllFriendRequests } from "./hooks/useGetFriendRequests";
import Loading from "../../core/common/Loading";
import { useAcceptFriendRequest } from "./hooks/useAcceptFriendRequest";
import { CustomInputField } from "../../core/common/CustomInputField";

const FriendsPage = () => {
	return (
		<>
			<div className='flex flex-col gap-4 px-4 pt-8'>
				<FriendsPageHeader />
				<FriendsPageBody />
			</div>
		</>
	);
};

export default FriendsPage;

const FriendsPageHeader = () => {
	return (
		<div className='flex flex-col gap-4 h-28'>
			<div className='flex flex-row justify-between items-center'>
				<span className='text-font-white text-3xl font-semibold'>Friends</span>
				<button className='btn border-none p-0'>
					<IoPersonAddSharp
						size={30}
						className='text-brand-orange'
					/>
				</button>
			</div>

			<CustomInputField />
		</div>
	);
};

const FriendsPageBody = () => {
	const [showMore, setShowMore] = useState(false);
	const getFriends = useGetAllFriends();
	const getFriendRequests = useGetAllFriendRequests();

	if (getFriendRequests.isLoading || getFriends.isLoading) {
		return <Loading />;
	}

	if (getFriendRequests.isError || getFriends.isError) {
		return <div className='text-font-white text-lg font-semibold'>Error loading data</div>;
	}

	return (
		<div className='flex flex-col gap-4 overflow-y-scroll h-[calc(100vh-14rem)] pb-20'>
			{/* Show only 2 friend requests at a time */}
			{getFriendRequests.data
				?.slice(0, showMore ? getFriendRequests.data?.length : 2)
				.map((friendRequest) => (
					<FriendRequestCard
						key={friendRequest.unique_username}
						sender_id={friendRequest.id}
						name={friendRequest.name}
						uniqueUsername={friendRequest.unique_username}
						img_src={friendRequest.profile_img_url}
					/>
				))}

			{/* If there are more than 2 friend requests, show the show more card */}
			{getFriendRequests.data && getFriendRequests.data?.length > 2 && (
				<>
					<ShowMoreCard
						showMore={showMore}
						setShowMore={setShowMore}
					/>
				</>
			)}

			{/* Horizontal line */}
			<hr className='border-b-2 border-input-search-gray' />

			{/* Show all friends */}
			{getFriends.data?.map((friend) => (
				<FriendCard
					key={friend.id}
					imgSrc={friend.profile_img_url}
					name={friend.name}
					uniqueUsername={friend.unique_username}
					isFavourite={friend.is_favourited}
				/>
			))}
		</div>
	);
};

const ImagePlaceholder = ({
	imgSrc,
	name,
	className,
}: {
	imgSrc: string | null;
	name: string;
	className?: string;
}) => {
	const initials = getInitials(name);

	if (imgSrc) {
		return (
			<div className='avatar placeholder'>
				<img
					className='rounded-full w-14'
					src={imgSrc}
				/>
			</div>
		);
	} else {
		return (
			<div className='avatar placeholder'>
				<div className={` text-font-white w-14 rounded-full ${className}`}>
					<span className='text-lg'>{initials}</span>
				</div>
			</div>
		);
	}
};

const FriendCard = ({
	imgSrc,
	name,
	uniqueUsername,
	isFavourite,
}: {
	imgSrc: string | null;
	name: string;
	uniqueUsername: string;
	isFavourite: boolean;
}) => {
	const FavouriteIcon = () => {
		if (isFavourite) {
			return (
				<BsStarFill
					size={25}
					className='text-brand-orange'
				/>
			);
		}
		return (
			<BsStar
				size={25}
				className='text-brand-orange'
			/>
		);
	};

	return (
		<div className='flex flex-row justify-between gap-4'>
			<div className='flex flex-row gap-4'>
				<div className='avatar w-14'>
					<ImagePlaceholder
						imgSrc={imgSrc}
						name={name}
						className='bg-input-search-gray'
					/>
				</div>

				<div className='flex flex-col gap-1 justify-center'>
					<span className='text-font-white text-lg font-semibold'>{name}</span>
					<span className='text-font-text-gray text-sm font-normal'>@{uniqueUsername}</span>
				</div>
			</div>

			<div className='flex items-center'>
				<FavouriteIcon />
			</div>
		</div>
	);
};

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

const ShowMoreCard = ({
	setShowMore,
	showMore,
}: {
	setShowMore: Dispatch<SetStateAction<boolean>>;
	showMore: boolean;
}) => {
	const handleShowMore = () => {
		setShowMore(!showMore);
	};
	return (
		<div className='bg-input-search-gray rounded-lg'>
			<button
				onClick={handleShowMore}
				className='btn w-full text-font-white text-lg font-bold'
			>
				{showMore ? "Collapse" : "Expand"}
			</button>
		</div>
	);
};

import { IoPersonAddSharp } from "react-icons/io5";
import { Dispatch, SetStateAction, useState } from "react";
import { useGetAllFriends } from "./hooks/useGetAllFriends";
import { useGetAllFriendRequests } from "./hooks/useGetFriendRequests";
import Loading from "../../core/common/components/Loading";
import { CustomInputField } from "../../core/common/components/CustomInputField";
import { useNavigate } from "react-router-dom";
import FriendRequestCard from "./components/FriendRequestCard";
import FriendCard from "./components/friend-card/FriendCard";
import ShowMoreCard from "./components/ShowMoreCard";
import useFavouritedFriends from "./hooks/useFavouritedFriends";

import {
	SwipeableList,
	SwipeableListItem,
	SwipeAction,
	TrailingActions,
	Type,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import DrawerComponent from "./components/DrawerComponent";

const FriendsPage = () => {
	const [searchQuery, setSearchQuery] = useState("");
	return (
		<>
			<div className='flex flex-col gap-4 px-4 pt-8 overflow-x-hidden'>
				<FriendsPageHeader setSearchQuery={setSearchQuery} />
				<FriendsPageBody searchQuery={searchQuery} />
			</div>
		</>
	);
};

export default FriendsPage;

const FriendsPageHeader = ({
	setSearchQuery,
}: {
	setSearchQuery: Dispatch<SetStateAction<string>>;
}) => {
	const navigate = useNavigate();
	return (
		<div className='flex flex-col gap-4 h-28'>
			<div className='flex flex-row justify-between items-center'>
				<span className='text-font-white text-3xl font-semibold'>Friends</span>
				<button
					className='btn border-none p-0'
					onClick={() => {
						navigate("/friends/add-friends");
					}}
				>
					<IoPersonAddSharp
						size={30}
						className='text-brand-orange'
					/>
				</button>
			</div>

			<CustomInputField setSearchQuery={setSearchQuery} />
		</div>
	);
};

const FriendsPageBody = ({ searchQuery }: { searchQuery: string }) => {
	const [showMore, setShowMore] = useState(false);
	const getFriends = useGetAllFriends();
	const getFriendRequests = useGetAllFriendRequests();
	const { favouritedFriends, normalFriends } = useFavouritedFriends(getFriends.data || []);
	const [isOpen, setIsOpen] = useState(false);
	const [friendId, setFriendId] = useState("");

	if (getFriendRequests.isLoading || getFriends.isLoading) {
		return <Loading />;
	}

	if (getFriendRequests.isError || getFriends.isError) {
		return <div className='text-font-white text-lg font-semibold'>Error loading data</div>;
	}

	const toggleDrawer = () => {
		setIsOpen((prevState) => !prevState);
	};

	console.log(searchQuery);

	//set the swiper to slide to the first slide

	return (
		<div className='flex flex-col gap-4 overflow-y-scroll h-full pb-20 w-full'>
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

			{/* Favourited friends */}
			{favouritedFriends.length > 0 && (
				<>
					<span className='text-font-white text-lg font-semibold'>Favourites</span>
					<SwipeableList
						className='w-full'
						type={Type.IOS}
					>
						{favouritedFriends?.map((friend) => (
							<SwipeableListItem
								key={friend.id}
								trailingActions={trailingActions(friend.id, toggleDrawer, setFriendId)} // Pass friend.id to identify which friend to delete
								className='w-full '
							>
								<FriendCard
									key={friend.id}
									friend_id={friend.id}
									imgSrc={friend.profile_img_url}
									name={friend.name}
									uniqueUsername={friend.unique_username}
									isFavourite={friend.is_favourited}
								/>
							</SwipeableListItem>
						))}
					</SwipeableList>
				</>
			)}

			{/* Horizontal line if there are favourited friends */}
			{favouritedFriends.length > 0 && normalFriends.length > 0 && (
				<hr className='border-b-2 border-input-search-gray' />
			)}

			{/* Show all friends */}
			{normalFriends.length > 0 && (
				<>
					<span className='text-font-white text-lg font-semibold'>Friends</span>
					<SwipeableList
						className='flex flex-col w-full gap-4'
						type={Type.IOS}
					>
						{normalFriends.map((friend) => (
							<SwipeableListItem
								key={friend.id}
								trailingActions={trailingActions(friend.id, toggleDrawer, setFriendId)} // Pass friend.id to identify which friend to delete
								className='w-full'
								maxSwipe={0.6}
							>
								<FriendCard
									friend_id={friend.id}
									imgSrc={friend.profile_img_url}
									name={friend.name}
									uniqueUsername={friend.unique_username}
									isFavourite={friend.is_favourited}
								/>
							</SwipeableListItem>
						))}
					</SwipeableList>
				</>
			)}

			<DrawerComponent
				isOpen={isOpen}
				toggleDrawer={toggleDrawer}
				friendId={friendId}
			/>
		</div>
	);
};

const trailingActions = (
	friendId: string,
	toggleDrawer: () => void,
	setFriendId: Dispatch<SetStateAction<string>>
) => (
	<TrailingActions>
		<SwipeAction
			onClick={() => {
				setFriendId(friendId);
				toggleDrawer();
			}}
		>
			<div
				className='h-full flex items-center justify-center bg-red-500 px-4'
				style={{ width: "30vw" }}
			>
				<span className='text-white'>Delete</span>
			</div>
		</SwipeAction>
	</TrailingActions>
);

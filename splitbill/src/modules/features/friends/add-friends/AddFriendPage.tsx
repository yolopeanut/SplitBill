// react
import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";

// common
import Loading from "../../../core/common/components/Loading";
import { CustomInputField } from "../../../core/common/components/CustomInputField";

// custom hooks
import useUserContext from "../../login/hooks/useUserContext";
import useSearchFriends from "./hooks/useSearchFriends";
import useGetAllFriends from "../hooks/useGetAllFriends";

// icons
import { FaPersonCircleQuestion } from "react-icons/fa6";
import { IoArrowBack } from "react-icons/io5";
import { FaPeoplePulling } from "react-icons/fa6";
import FriendCard from "./components/FriendCard";

const AddFriendPage = () => {
	const [searchQuery, setSearchQuery] = useState("");
	return (
		<>
			<div className='flex flex-col gap-4 px-4 pt-8 h-full'>
				<AddFriendPageHeader setSearchQuery={setSearchQuery} />
				<AddFriendPageBody searchQuery={searchQuery} />
			</div>
		</>
	);
};

const AddFriendPageHeader = ({
	setSearchQuery,
}: {
	setSearchQuery: Dispatch<SetStateAction<string>>;
}) => {
	const navigate = useNavigate();
	return (
		<div className='flex flex-col gap-4 h-28'>
			<div className='flex flex-row justify-between items-center'>
				<button
					className='btn border-none p-0'
					onClick={() => {
						navigate("/friends");
					}}
				>
					<IoArrowBack
						size={30}
						className='text-brand-orange'
					/>
				</button>
				<span className='text-font-white text-3xl font-semibold'>Add Friends</span>

				{/* Space to keep the button and the text aligned */}
				<div className='w-7'></div>
			</div>

			<CustomInputField setSearchQuery={setSearchQuery} />
		</div>
	);
};

const AddFriendPageBody = ({ searchQuery }: { searchQuery: string }) => {
	const NoSearchQueryBody = () => {
		return (
			<div className='flex flex-col items-center justify-center h-full gap-4 -mt-10'>
				<FaPeoplePulling
					size={80}
					className='text-brand-orange'
				/>
				<span className='text-font-white text-xl font-semibold text-center w-1/2'>
					Type in a username to adopt a friend
				</span>
			</div>
		);
	};

	const NoUserFoundBody = () => {
		return (
			<div className='flex flex-col items-center justify-center h-full gap-4 -mt-10'>
				<FaPersonCircleQuestion
					size={80}
					className='text-brand-orange'
				/>
				<span className='text-font-white text-xl font-semibold text-center w-1/2'>
					No user found
				</span>
			</div>
		);
	};

	const SearchQueryBody = () => {
		const { data, isLoading, isError } = useSearchFriends(searchQuery);
		const { currentUser } = useUserContext();
		const currFriends = useGetAllFriends();

		if (isLoading) {
			return <Loading />;
		}

		if (isError) {
			throw new Error("Error searching for friends");
		}

		const filteredUsers = data?.filter((user) => {
			return (
				user.unique_username !== currentUser?.unique_username &&
				!currFriends.data?.some((friend) => friend.id === user.id)
			);
		});

		if (!filteredUsers || filteredUsers.length === 0) {
			return <NoUserFoundBody />; // Return null if no users are found
		}

		return filteredUsers.map((user) => {
			return (
				<FriendCard
					key={user.id}
					id={user.id}
					name={user.name}
					uniqueUsername={user.unique_username}
					imgSrc={user.profile_img_url}
				/>
			);
		});
	};

	return (
		<div className='h-full flex flex-col gap-4'>
			{searchQuery ? <SearchQueryBody /> : <NoSearchQueryBody />}
		</div>
	);
};

// const ImagePlaceholder = ({
// 	imgSrc,
// 	name,
// 	className,
// }: {
// 	imgSrc: string | null;
// 	name: string;
// 	className?: string;
// }) => {
// 	const initials = getInitials(name);

// 	if (imgSrc) {
// 		return (
// 			<div className='avatar placeholder'>
// 				<img
// 					className='rounded-full w-14'
// 					src={imgSrc}
// 				/>
// 			</div>
// 		);
// 	} else {
// 		return (
// 			<div className='avatar placeholder'>
// 				<div className={` text-font-white w-14 rounded-full ${className}`}>
// 					<span className='text-lg'>{initials}</span>
// 				</div>
// 			</div>
// 		);
// 	}
// };

export default AddFriendPage;

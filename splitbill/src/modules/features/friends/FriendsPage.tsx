import { IoSearch, IoPersonAddSharp } from "react-icons/io5";
import { getInitials } from "../../core/common/commonFunctions";
import { BsStar } from "react-icons/bs";
import { BsStarFill } from "react-icons/bs";
import useFriendsContext from "./hooks/useFriendsContext";
import getPublicUrl from "../../core/database/getPublicUrl";

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

			<label className='input  bg-input-search-gray flex items-center gap-2'>
				<IoSearch
					className='text-font-text-gray'
					size={30}
				/>
				<input
					type='text'
					className='grow font-normal'
					placeholder='Search'
				/>
			</label>
		</div>
	);
};

const FriendsPageBody = () => {
	const { getFriends } = useFriendsContext();

	return (
		<>
			<div className='flex flex-col gap-4 overflow-y-scroll h-[calc(100vh-14rem)] pb-20'>
				{getFriends?.map((friend) => {
					return (
						<FriendCard
							key={friend.id}
							imgSrc={getPublicUrl(friend.profile_img_src)}
							name={friend.name}
							uniqueUsername={friend.unique_username}
							isFavourite={false}
						/>
					);
				})}
			</div>
		</>
	);
};

const FriendCard = ({
	imgSrc,
	name,
	uniqueUsername,
	isFavourite,
}: {
	imgSrc: string;
	name: string;
	uniqueUsername: string;
	isFavourite: boolean;
}) => {
	// ImagePlaceholder
	const ImagePlaceholder = () => {
		const initials = getInitials(name);

		if (imgSrc) {
			return <img src={imgSrc} />;
		}

		return (
			<div className='avatar placeholder'>
				<div className='bg-input-search-gray text-font-white w-16 rounded-full'>
					<span className='text-lg'>{initials}</span>
				</div>
			</div>
		);
	};

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
		<div className='flex flex-row gap-4'>
			<div className='avatar'>
				<ImagePlaceholder />
			</div>

			<div className='flex flex-col gap-1 w-full'>
				<span className='text-font-white text-lg font-semibold'>{name}</span>
				<span className='text-font-text-gray text-sm font-normal'>@{uniqueUsername}</span>
			</div>

			<div className='flex items-center'>
				<FavouriteIcon />
			</div>
		</div>
	);
};

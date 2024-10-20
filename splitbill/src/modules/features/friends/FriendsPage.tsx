import { IoSearch, IoPersonAddSharp } from "react-icons/io5";
import { getInitials } from "../../core/common/commonFunctions";
import { BsStar } from "react-icons/bs";
import { BsStarFill } from "react-icons/bs";
import useFriendsContext from "./hooks/useFriendsContext";

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
					console.log({ friend });
					return (
						<FriendCard
							key={friend.id}
							imgSrc={friend.profile_img_url}
							name={friend.name}
							uniqueUsername={friend.unique_username}
							isFavourite={friend.is_favourited}
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
	imgSrc: string | null;
	name: string;
	uniqueUsername: string;
	isFavourite: boolean;
}) => {
	// ImagePlaceholder
	const ImagePlaceholder = () => {
		const initials = getInitials(name);

		console.log({ imgSrc });
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
					<div className='bg-input-search-gray text-font-white w-14 rounded-full'>
						<span className='text-lg'>{initials}</span>
					</div>
				</div>
			);
		}
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
		<div className='flex flex-row justify-between gap-4'>
			<div className='flex flex-row gap-4'>
				<div className='avatar w-14'>
					<ImagePlaceholder />
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

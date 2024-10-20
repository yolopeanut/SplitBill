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
				<FriendRequestCard
					name='John Doe'
					uniqueUsername='johndoe'
				/>
				<hr className='border-b-2 border-input-search-gray' />
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

const FriendRequestCard = ({ name, uniqueUsername }: { name: string; uniqueUsername: string }) => {
	return (
		<div className='bg-input-search-gray rounded-lg flex flex-col items-start gap-4 h-36 p-4'>
			<div className='flex flex-row items-center gap-2 w-full'>
				<div className='avatar w-14 '>
					<ImagePlaceholder
						imgSrc={null}
						name='John Doe'
						className='bg-background-black'
					/>
				</div>
				<div className='flex flex-col gap-1 justify-center'>
					<span className='text-font-white text-lg font-semibold'>{name}</span>
					<span className='text-font-text-gray text-sm font-normal'>@{uniqueUsername}</span>
				</div>
			</div>
			<div className='flex flex-row items-center gap-2 w-full self-center justify-center'>
				<button className='btn btn-sm border-none bg-brand-orange p-0 w-44 h-10 text-background-black'>
					Accept
				</button>
				<button className='btn btn-sm border-brand-orange p-0 w-44 h-10 bg-background-black'>
					Decline
				</button>
			</div>
		</div>
	);
};

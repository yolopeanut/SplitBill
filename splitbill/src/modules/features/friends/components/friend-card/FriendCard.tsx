import useAuthContext from "../../../../core/auth/hooks/useAuthContext";
import ImagePlaceholder from "../../../../core/common/components/ImagePlaceholder";
import FavouriteIcon from "./components/FavouriteIcon";
import useFriendCard from "./hooks/useFriendCard";

interface IFriendCard {
	imgSrc: string | null;
	name: string;
	uniqueUsername: string;
	isFavourite: boolean;
	friend_id: string;
}

const FriendCard = ({ imgSrc, name, uniqueUsername, isFavourite, friend_id }: IFriendCard) => {
	const { handleFavourite } = useFriendCard();
	const { user } = useAuthContext();

	return (
		<div className='flex flex-row justify-between gap-4 bg-background-black h-16 outline-background-black border-none w-full'>
			<div className='flex flex-row gap-4'>
				<div className='avatar w-14 h-14'>
					<ImagePlaceholder
						imgSrc={imgSrc}
						name={name}
						className='bg-input-search-gray min-w-14 min-h-14 max-w-14 max-h-14'
					/>
				</div>

				<div className='flex flex-col gap-1 justify-top'>
					<span className='text-font-white text-lg font-semibold'>{name}</span>
					<span className='text-font-text-gray text-sm font-normal'>@{uniqueUsername}</span>
				</div>
			</div>

			<div
				className='flex items-center'
				onClick={() => handleFavourite(user!.id, friend_id, !isFavourite)}
			>
				<FavouriteIcon isFavourite={isFavourite} />
			</div>
		</div>
	);
};

export default FriendCard;

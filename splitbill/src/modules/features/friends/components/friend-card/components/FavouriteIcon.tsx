import { BsStarFill } from "react-icons/bs";

import { BsStar } from "react-icons/bs";

interface IFavouriteIcon {
	isFavourite: boolean;
}

const FavouriteIcon = ({ isFavourite }: IFavouriteIcon) => {
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

export default FavouriteIcon;

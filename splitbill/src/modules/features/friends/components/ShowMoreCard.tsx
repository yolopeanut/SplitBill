import { Dispatch, SetStateAction } from "react";

interface IShowMoreCard {
	setShowMore: Dispatch<SetStateAction<boolean>>;
	showMore: boolean;
}

const ShowMoreCard = ({ setShowMore, showMore }: IShowMoreCard) => {
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

export default ShowMoreCard;

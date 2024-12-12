import { getInitials } from "../commonFunctions";

interface IImagePlaceholder {
	imgSrc: string | null;
	name: string;
	className?: string;
}

const ImagePlaceholder = ({ imgSrc, name, className }: IImagePlaceholder) => {
	const initials = getInitials(name);

	if (imgSrc) {
		return (
			<div className='avatar placeholder'>
				<img
					className={`rounded-full ${className}`}
					src={imgSrc}
				/>
			</div>
		);
	} else {
		return (
			<div className='avatar placeholder'>
				<div
					className={` text-font-white rounded-full flex justify-center items-center border-2 border-brand-orange ${className}`}
				>
					<span className='text-lg'>{initials}</span>
				</div>
			</div>
		);
	}
};

export default ImagePlaceholder;

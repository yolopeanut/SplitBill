import { getInitials } from "../commonFunctions";

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
					className='rounded-full min-w-14 min-h-14 max-w-14 max-h-14'
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

export default ImagePlaceholder;

import BackgroundImages from "../../../../core/constants/BackgroundImages";

interface IGroupImg {
	className: string;
	img_url?: string;
}

const GroupImg = ({ className, img_url }: IGroupImg) => {
	const bg = BackgroundImages[Math.floor(Math.random() * 8)];
	if (img_url) {
		return (
			<img
				src={img_url}
				alt='group'
				className={className}
			/>
		);
	}
	return (
		<img
			src={bg}
			alt='group'
			className={className}
		/>
	);
};

export default GroupImg;

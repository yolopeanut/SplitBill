import { useEffect, useState } from "react";
import BackgroundImages from "../../../../core/constants/BackgroundImages";
import { useGroupsContext } from "../../hooks/useGroupsContext";

interface IGroupImg {
	className: string;
}

const GroupImg = ({ className }: IGroupImg) => {
	const { selectedGroup } = useGroupsContext();
	const [img_url, setImgUrl] = useState<string | null>(null);
	useEffect(() => {
		setImgUrl(selectedGroup?.img_url || null);
	}, [selectedGroup?.img_url]);

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

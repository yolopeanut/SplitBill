import BackgroundImages from "../../../../core/constants/BackgroundImages";
import { IAllGroupsTable } from "../../../../core/interfaces/all_GroupsTable";

interface IGroupImg {
	className: string;
	selectedGroup: IAllGroupsTable | undefined | null;
}

const GroupImg = ({ className, selectedGroup }: IGroupImg) => {
	const bg = BackgroundImages[Math.floor(Math.random() * 8)];
	if (selectedGroup?.img_url) {
		return (
			<img
				src={selectedGroup.img_url}
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

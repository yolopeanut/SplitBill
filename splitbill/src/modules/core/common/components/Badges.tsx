const Badges = ({
	content,
	badgeClassName,
	textClassName,
}: {
	content: string;
	badgeClassName: string;
	textClassName: string;
}) => {
	return (
		<div className={badgeClassName}>
			<span className={textClassName}>{content}</span>
		</div>
	);
};

export default Badges;

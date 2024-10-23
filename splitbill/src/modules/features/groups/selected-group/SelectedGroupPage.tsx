import { useParams } from "react-router-dom";

const SelectedGroupPage = () => {
	const { groupId } = useParams();

	if (!groupId) {
		return <div>No group ID</div>;
	}

	return (
		<>
			<SelectedGroupHeader />
			<SelectedGroupBody groupId={groupId} />
		</>
	);
};

const SelectedGroupHeader = () => {
	return <div>SelectedGroupHeader</div>;
};

const SelectedGroupBody = ({ groupId }: { groupId: string }) => {
	return <div>{groupId}</div>;
};

export default SelectedGroupPage;

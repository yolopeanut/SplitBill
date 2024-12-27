import GroupsPageHeader from "./components/GroupsPageHeader";
import GroupsPageBody from "./components/group-page-body/GroupsPageBody";

const GroupsPage = () => {
	return (
		<>
			<div className='flex flex-col items-start gap-4 gap-y-10 px-4 pt-8'>
				<GroupsPageHeader />
				<GroupsPageBody />
			</div>
		</>
	);
};

export default GroupsPage;

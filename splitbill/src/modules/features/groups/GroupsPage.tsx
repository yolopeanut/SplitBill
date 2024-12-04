import GroupsPageHeader from "./components/GroupsPageHeader";
import GroupsPageBody from "./components/group-page-body/GroupsPageBody";

const GroupsPage = () => {
	return (
		<>
			<div className='flex flex-col gap-4 items-start pt-8 px-4 gap-y-10'>
				<GroupsPageHeader />
				<GroupsPageBody />
			</div>
		</>
	);
};

export default GroupsPage;

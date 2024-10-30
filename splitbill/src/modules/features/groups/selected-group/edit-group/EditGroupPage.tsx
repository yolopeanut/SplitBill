import { useEffect } from "react";
import { useGroupsContext } from "../../hooks/useGroupsContext";
import EditGroupPageBody from "./components/EditGroupPageBody";
import EditGroupPageHeader from "./components/EditGroupPageHeader";
import { useNavigate, useParams } from "react-router-dom";

const EditGroupPage = () => {
	const { selectedGroup, groupUsers } = useGroupsContext();
	const navigate = useNavigate();
	const { groupId } = useParams();

	// Handling if the selected group or group users are not found
	useEffect(() => {
		if (!selectedGroup || !groupUsers) {
			navigate(`/groups/${groupId}`);
		}
	}, [selectedGroup, groupUsers, navigate, groupId]);

	return (
		<>
			<div className='flex flex-col w-full h-full p-2 overflow-y-auto'>
				<EditGroupPageHeader />
				<EditGroupPageBody />
			</div>
		</>
	);
};

export default EditGroupPage;

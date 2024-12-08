// React
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useGroupsContext } from "../../../../../hooks/useGroupsContext";
import EditTransactionBody from "./edit-transaction-page-body/EditTransactionPageBody";
import EditTransactionHeader from "./EditTransactionPageHeader";

const EditTransactionPage = () => {
	const navigate = useNavigate();
	const { selectedGroupId } = useGroupsContext();
	const { groupId } = useParams();

	// Handling if the groupId is not found,
	// because other components are dependent on selectedGroupId from context
	useEffect(() => {
		if (!selectedGroupId) {
			navigate(`/groups/${groupId}`);
		}
	}, [selectedGroupId, navigate, groupId]);

	return (
		<>
			<div className='flex flex-col gap-4 p-4 h-full'>
				<EditTransactionHeader />
				<EditTransactionBody />
			</div>
		</>
	);
};

export default EditTransactionPage;

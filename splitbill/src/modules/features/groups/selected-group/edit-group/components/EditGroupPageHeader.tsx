import { IoArrowBack } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";

const EditGroupPageHeader = () => {
	const navigate = useNavigate();
	const { groupId } = useParams();

	return (
		<>
			<div className='flex flex-row justify-between items-center relative px-4 py-2'>
				<button
					className='btn border-none p-0'
					onClick={() => {
						navigate(`/groups/${groupId}`);
					}}
				>
					<IoArrowBack
						size={20}
						className='text-brand-orange'
					/>
				</button>
				<span className='text-font-white text-xl font-semibold absolute left-1/2 -translate-x-1/2'>
					Edit Group
				</span>
				<div></div>
			</div>
		</>
	);
};

export default EditGroupPageHeader;

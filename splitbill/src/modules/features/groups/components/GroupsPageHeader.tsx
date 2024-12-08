import { HiSquaresPlus } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const GroupsPageHeader = () => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate("/groups/create");
	};

	return (
		<>
			<div className='flex flex-row justify-between items-center w-full'>
				<div className='text-font-white text-3xl font-bold'>Groups</div>
				<button
					className='btn outline-none border-none bg-transparent p-0'
					onClick={handleClick}
				>
					<HiSquaresPlus className='text-brand-orange text-4xl' />
				</button>
			</div>
		</>
	);
};

export default GroupsPageHeader;

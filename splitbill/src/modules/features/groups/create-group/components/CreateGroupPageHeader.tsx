import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const CreateGroupPageHeader = () => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate("/groups");
	};

	return (
		<>
			<div className='flex flex-row justify-between items-center w-full'>
				<button
					className='btn outline-none border-none bg-transparent p-0 text-brand-orange pl-2'
					onClick={handleClick}
				>
					<IoArrowBack size={20} />
				</button>
				<div className='text-font-white text-3xl font-bold pr-6'>Create Group</div>
				<div></div>
			</div>
		</>
	);
};

export default CreateGroupPageHeader;

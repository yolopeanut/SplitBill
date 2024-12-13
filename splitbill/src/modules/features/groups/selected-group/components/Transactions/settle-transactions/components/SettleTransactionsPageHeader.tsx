import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const SettleTransactionsPageHeader = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const groupName = location.pathname.split("/")[2];

	return (
		<>
			<div className='flex flex-row items-center justify-between w-full p-4'>
				<button
					className='btn border-none p-0'
					onClick={() => {
						navigate(`/groups/${groupName}`);
					}}
				>
					<IoArrowBack
						size={20}
						className='text-brand-orange'
					/>
				</button>
				<span className='text-font-white text-xl font-semibold absolute left-1/2 -translate-x-1/2'>
					Settle Up
				</span>
				<div></div>
			</div>
		</>
	);
};

export default SettleTransactionsPageHeader;

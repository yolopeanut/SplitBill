import { useNavigate } from "react-router-dom";
import { IoPersonSharp } from "react-icons/io5";
import { PiCurrencyCircleDollarFill } from "react-icons/pi";
import { getFirstLetter, truncateText } from "../../../../../core/common/commonFunctions";

interface GroupCardProps {
	groupId: string;
	image_src: string;
	groupName: string;
	numMembers: number;
	balance: number;
}

const GroupCard = ({ groupId, image_src, groupName, numMembers, balance }: GroupCardProps) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/groups/${groupId}`);
	};

	const BalanceText = () => {
		if (balance > 0) {
			return (
				<span className='text-font-green text-sm font-semibold break-all text-clip overflow-hidden'>
					+RM {balance}
				</span>
			);
		} else if (balance < 0) {
			return (
				<span className='text-font-red text-sm font-semibold break-all text-clip overflow-hidden'>
					-RM {balance.toString().replace("-", "")}
				</span>
			);
		} else {
			return (
				<span className='text-font-white text-sm font-semibold break-all text-clip overflow-hidden'>
					Settled!
				</span>
			);
		}
	};

	return (
		<>
			<div
				className='w-full flex flex-row gap-4 bg-card-gray p-3 rounded-2xl items-center'
				onClick={handleClick}
			>
				<div className='flex flex-row gap-4 w-full items-center'>
					{image_src ? (
						<img
							src={image_src}
							className='min-w-16 min-h-16 max-w-16 max-h-16 rounded-full object-cover'
						/>
					) : (
						<div className='text-font-white text-2xl font-base flex items-center justify-center min-w-16 min-h-16 max-w-16 max-h-16 rounded-full bg-font-gray-light'>
							{getFirstLetter(groupName)}
						</div>
					)}
					<div className='flex flex-col gap-1 w-full items-start justify-start overflow-hidden'>
						<span className='text-font-white text-lg font-semibold '>
							{truncateText(groupName, 25)}
						</span>
						<div>
							<div className='text-font-white text-sm flex flex-row gap-2 items-center'>
								<IoPersonSharp className='text-brand-orange' />
								<span className='text-font-text-gray'>{numMembers} members</span>
							</div>
							<div className='text-font-white text-sm flex flex-row gap-2 items-center'>
								<PiCurrencyCircleDollarFill className='text-brand-orange' />
								<BalanceText />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default GroupCard;

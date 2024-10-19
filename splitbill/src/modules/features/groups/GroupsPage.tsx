import { IoPersonSharp } from "react-icons/io5";
import { PiCurrencyCircleDollarFill } from "react-icons/pi";
import { getFirstLetter, truncateText } from "../../core/common/commonFunctions";
import { FaEdit } from "react-icons/fa";

const GroupsPage = () => {
	return (
		<>
			<div className='flex flex-col gap-4 items-start pt-14 px-4 gap-y-10'>
				<GroupsPageHeader />
				<GroupsPageBody />
			</div>
		</>
	);
};

export default GroupsPage;

const GroupsPageHeader = () => {
	return (
		<>
			<div className='text-font-white text-4xl font-bold'>Groups</div>
		</>
	);
};

const GroupsPageBody = () => {
	return (
		<>
			<div className='flex flex-col gap-12 items-start w-full'>
				<div className='flex flex-col gap-8 w-full items-start'>
					<div className='text-font-white text-lg font-semibold'>Quick Access</div>
					<div className='flex flex-col gap-6 w-full'>
						<GroupCard
							image_src={"https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
							groupName={"NuttingGroup"}
							numMembers={10}
							numExpenses={0}
							balance={0.0}
						/>
						<GroupCard
							image_src={"https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
							groupName={"NuttingGroup"}
							numMembers={10}
							numExpenses={0}
							balance={0.0}
						/>
					</div>
				</div>
				<div className='flex flex-col gap-8 w-full items-start'>
					<div className='text-font-white text-lg font-semibold'>All Groups</div>
					<div className='flex flex-col gap-6 w-full'>
						<GroupCard
							image_src={"https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
							groupName={"yeetus"}
							numMembers={10}
							numExpenses={3}
							balance={-20.0}
						/>
						<GroupCard
							image_src={null}
							groupName={"yo momma"}
							numMembers={10}
							numExpenses={3}
							balance={-15.25}
						/>
						<GroupCard
							image_src={null}
							groupName={"Nutting Group plat Nutting Group plat Nutting Group plat"}
							numMembers={10}
							numExpenses={3}
							balance={23.6}
						/>
						<GroupCard
							image_src={null}
							groupName={"teehee"}
							numMembers={10}
							numExpenses={0}
							balance={0}
						/>
						<GroupCard
							image_src={null}
							groupName={"langkawi babay"}
							numMembers={10}
							numExpenses={3}
							balance={1000000000.3}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

const GroupCard = ({
	image_src,
	groupName,
	numMembers,
	numExpenses,
	balance,
}: {
	image_src: string | null;
	groupName: string;
	numMembers: number;
	numExpenses: number;
	balance: number;
}) => {
	const handleClick = () => {};

	const BalanceText = () => {
		if (balance > 0) {
			return <span className='text-font-green text-sm font-semibold break-all text-clip overflow-hidden'>+RM {balance}</span>;
		} else if (balance < 0) {
			return (
				<span className='text-font-red text-sm font-semibold break-all text-clip overflow-hidden'>-RM {balance.toString().replace("-", "")}</span>
			);
		} else {
			return <span className='text-font-white text-sm font-semibold break-all text-clip overflow-hidden'>Settled!</span>;
		}
	};

	return (
		<>
			<div
				className='w-full flex flex-row gap-4 bg-card-gray p-3 rounded-2xl items-center'
				onClick={handleClick}
			>
				<div className='flex flex-row gap-4 w-[70%] items-center'>
					{image_src ? (
						<img
							src={image_src}
							className='w-16 h-16 rounded-full'
						/>
					) : (
						<div className='text-font-white text-2xl font-base flex items-center justify-center min-w-16 min-h-16 max-h-16 max-w-16 rounded-full bg-font-gray-light'>
							{getFirstLetter(groupName)}
						</div>
					)}
					<div className='flex flex-col gap-1 w-full items-start justify-start overflow-hidden'>
						<span className='text-font-white text-lg font-semibold '>{truncateText(groupName, 25)}</span>
						<div>
							<div className='text-font-white text-sm flex flex-row gap-2 items-center'>
								<IoPersonSharp className='text-brand-orange' />
								<span className='text-font-text-gray'>{numMembers} members</span>
							</div>
							<div className='text-font-white text-sm flex flex-row gap-2 items-center'>
								<PiCurrencyCircleDollarFill className='text-brand-orange' />
								<span className='text-font-text-gray'>{numExpenses} expenses</span>
							</div>
						</div>
					</div>
				</div>

				<div className='flex flex-col justify-between items-end self-stretch flex-grow w-[20%]'>
					<FaEdit className='text-font-text-gray text-md' />

					<BalanceText />
				</div>
			</div>
		</>
	);
};

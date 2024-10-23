import { IoPersonSharp } from "react-icons/io5";
import { PiCurrencyCircleDollarFill } from "react-icons/pi";
import { getFirstLetter, truncateText } from "../../core/common/commonFunctions";
import { useNavigate } from "react-router-dom";
import { useGetOwnGroups } from "./selected-group/hooks/useGetOwnGroups";
import Loading from "../../core/common/Loading";

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

const GroupsPageHeader = () => {
	return (
		<>
			<div className='text-font-white text-3xl font-bold'>Groups</div>
		</>
	);
};

const GroupsPageBody = () => {
	const { data: ownGroups, isLoading: isLoadingOwnGroups } = useGetOwnGroups();

	if (isLoadingOwnGroups) {
		return <Loading />;
	}

	return (
		<>
			<div className='flex flex-col gap-12 items-start w-full overflow-y-scroll h-[calc(100vh-11rem)]'>
				<div className='flex flex-col gap-8 w-full items-start'>
					<div className='text-font-white text-lg font-semibold'>All Groups</div>
					<div className='flex flex-col gap-6 w-full pb-20'>
						{ownGroups?.map((group) => (
							<GroupCard
								key={group.id}
								groupId={group.id}
								image_src={group.img_url}
								groupName={group.name}
								numMembers={group.num_members ?? 0}
								balance={group.balance ?? 0}
							/>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

const GroupCard = ({
	groupId,
	image_src,
	groupName,
	numMembers,
	balance,
}: {
	groupId: string;
	image_src: string | null;
	groupName: string;
	numMembers: number;
	balance: number;
}) => {
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
							className='w-16 h-16 rounded-full'
						/>
					) : (
						<div className='text-font-white text-2xl font-base flex items-center justify-center min-w-16 min-h-16 max-h-16 max-w-16 rounded-full bg-font-gray-light'>
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

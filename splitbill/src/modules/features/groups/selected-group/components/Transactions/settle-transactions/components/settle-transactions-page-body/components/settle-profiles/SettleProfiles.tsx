import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import ImagePlaceholder from "../../../../../../../../../../core/common/components/ImagePlaceholder";
import { IoArrowForward } from "react-icons/io5";
import { IAllUsersTable } from "../../../../../../../../../../core/interfaces/all_usersTable";
import { IUserBalance } from "../../../../../../../../../../core/interfaces/user_balances";
import { useState } from "react";
import SettleDrawer from "./components/SettleDrawer";

interface ISettleProfiles {
	currentUser: IAllUsersTable;
	owesUsers: IUserBalance["owes_users"] | null;
	selectedRepayingUser: IAllUsersTable | null;
	setSelectedRepayingUser: (user: IAllUsersTable | null) => void;
}

const SettleProfiles = ({
	currentUser,
	owesUsers,
	selectedRepayingUser,
	setSelectedRepayingUser,
}: ISettleProfiles) => {
	const [isOweDrawerOpen, setIsOweDrawerOpen] = useState(false);

	const handleOweDropdownClick = () => {
		setIsOweDrawerOpen(!isOweDrawerOpen);
	};
	return (
		<div className='flex flex-row justify-between items-center gap-4 w-[80%]'>
			<ImagePlaceholder
				imgSrc={currentUser?.profile_img_url || null}
				name={currentUser?.name || ""}
				className='min-w-12 min-h-12 max-w-12 max-h-12'
			/>
			<IoArrowForward className='text-brand-orange text-2xl' />
			<div
				className='flex flex-row border border-brand-orange rounded-lg p-2 bg-background-gray items-center'
				onClick={handleOweDropdownClick}
			>
				<ImagePlaceholder
					imgSrc={selectedRepayingUser?.profile_img_url || null}
					name={selectedRepayingUser?.name || ""}
					className='min-w-12 min-h-12 max-w-12 max-h-12'
				/>

				<button className='border-none bg-transparent w-12 flex justify-center items-center'>
					<MdOutlineKeyboardArrowDown className='text-brand-orange text-3xl' />
				</button>
			</div>
			<SettleDrawer
				isOpen={isOweDrawerOpen}
				toggleDrawer={handleOweDropdownClick}
				owesUsers={owesUsers}
				setSelectedRepayingUser={setSelectedRepayingUser}
			/>
		</div>
	);
};

export default SettleProfiles;

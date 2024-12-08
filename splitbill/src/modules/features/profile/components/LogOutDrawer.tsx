import { Dispatch, SetStateAction } from "react";

import CommonDrawer from "../../../core/common/components/CommonDrawer";
import useAuthContext from "../../../core/auth/hooks/useAuthContext";
import { FaPersonWalkingLuggage } from "react-icons/fa6";

interface LogoutDrawerProps {
	setIsLogoutDrawerOpen: Dispatch<SetStateAction<boolean>>;
	isLogoutDrawerOpen: boolean;
}

const LogoutDrawer = ({ setIsLogoutDrawerOpen, isLogoutDrawerOpen }: LogoutDrawerProps) => {
	const { signOut } = useAuthContext();

	const handleLogout = () => {
		signOut();
		setIsLogoutDrawerOpen(false);
	};

	return (
		<CommonDrawer
			isOpen={isLogoutDrawerOpen}
			toggleDrawer={() => setIsLogoutDrawerOpen(!isLogoutDrawerOpen)}
		>
			<div className='flex flex-col items-center justify-center gap-4 w-full h-full'>
				<FaPersonWalkingLuggage
					size={100}
					className='text-brand-orange'
				/>
				<div className='text-font-white text-lg font-medium'>Are you sure you want to logout?</div>
				<button
					className='btn bg-background-red-dark text-font-white w-[70%] outline-none border-none'
					onClick={handleLogout}
				>
					Logout
				</button>
			</div>
		</CommonDrawer>
	);
};

export default LogoutDrawer;

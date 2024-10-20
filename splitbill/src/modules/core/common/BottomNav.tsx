import { MdPeopleAlt } from "react-icons/md";
import { BiSolidWallet } from "react-icons/bi";

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { NAV_BAR_PATHS_DISABLED, NAV_BAR_PATHS } from "../../../app/constants";
import useUserContext from "../../features/login/hooks/useUserContext";
import { getInitials } from "./commonFunctions";

const BottomNav = () => {
	const [activeTab, setActiveTab] = useState<number>(-1);

	// If path is disabled, return null
	const location = useLocation();
	const navigate = useNavigate();
	const isDisabled = NAV_BAR_PATHS_DISABLED.includes(location.pathname);

	// Get the current user from the user context
	const { currentUser } = useUserContext();

	useEffect(() => {
		// Set the active tab based on the current path
		setActiveTab(NAV_BAR_PATHS.indexOf(location.pathname));
	}, [location.pathname]);

	if (isDisabled) return null;

	// On tab click, navigate to the corresponding path
	function onTabClicked(index: number) {
		setActiveTab(index);
		navigate(NAV_BAR_PATHS[index]);
	}

	// Get the tailwind class for the tab based on the active tab index
	function getTabClass(index: number) {
		return activeTab === index
			? "active text-brand-orange bg-background-black"
			: "text-brand-orange";
	}

	const ProfileImg = () => {
		if (currentUser?.profile_img_url) {
			return <img src={currentUser.profile_img_url} />;
		}
		return (
			<div className='w-7 h-7 bg-card-gray rounded-full flex items-center justify-center'>
				{getInitials(currentUser?.name ?? "")}
			</div>
		);
	};

	return (
		<>
			<div className='btm-nav bg-background-black'>
				<button
					className={getTabClass(0)}
					onClick={() => {
						onTabClicked(0);
					}}
				>
					<MdPeopleAlt size={24} />
				</button>
				<button
					className={getTabClass(1)}
					onClick={() => {
						onTabClicked(1);
					}}
				>
					<BiSolidWallet size={24} />
				</button>
				<button
					className={getTabClass(2)}
					onClick={() => {
						onTabClicked(2);
					}}
				>
					<div className='avatar'>
						<div className='ring ring-brand-orange w-7 rounded-full'>
							<ProfileImg />
						</div>
					</div>
				</button>
			</div>
		</>
	);
};

export default BottomNav;

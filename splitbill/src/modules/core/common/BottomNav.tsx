import { MdPeopleAlt } from "react-icons/md";
import { BiSolidWallet } from "react-icons/bi";

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { NAV_BAR_PATHS_DISABLED, NAV_BAR_PATHS } from "../../../app/constants";

const BottomNav = () => {
	const [activeTab, setActiveTab] = useState<number>(-1);

	// If path is disabled, return null
	const location = useLocation();
	const navigate = useNavigate();
	const isDisabled = NAV_BAR_PATHS_DISABLED.includes(location.pathname);

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
		return activeTab === index ? "active text-brand-orange bg-background-black" : "text-brand-orange";
	}

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
							<img src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp' />
						</div>
					</div>
				</button>
			</div>
		</>
	);
};

export default BottomNav;

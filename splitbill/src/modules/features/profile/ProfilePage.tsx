import { IoLogOutOutline } from "react-icons/io5";
import { GoPerson } from "react-icons/go";
import useUserContext from "../login/hooks/useUserContext";
import { getInitials } from "../../core/common/commonFunctions";
import { useState } from "react";
import LogoutDrawer from "./components/LogOutDrawer";

const ProfilePage = () => {
	const { currentUser } = useUserContext();

	if (!currentUser) {
		return null;
	}

	return (
		<div className='flex flex-col gap-6 w-full h-full pt-6 px-10 items-center'>
			<ProfilePageHeader
				name={currentUser.name}
				userName={currentUser.unique_username}
				profile_img_url={currentUser.profile_img_url}
			/>

			<hr className='solid w-[90%]' />

			<ProfilePageBody />
		</div>
	);
};

export default ProfilePage;

const ProfilePageHeader = ({
	name,
	userName,
	profile_img_url,
}: {
	name: string;
	userName: string;
	profile_img_url: string | null;
}) => {
	// Returns the profile image or the initials if the profile image is not available
	const ProfileImg = () => {
		if (profile_img_url) {
			return <img src={profile_img_url} />;
		}
		return (
			<div className='w-36 h-36 bg-card-gray rounded-full flex items-center justify-center'>
				{getInitials(name)}
			</div>
		);
	};

	return (
		<div className='w-full h-64 bg-card-gray rounded-xl flex flex-col items-center justify-start gap-4'>
			<div className='avatar pt-6'>
				<div className='w-36 rounded-full'>
					<ProfileImg />
				</div>
			</div>

			<div className='flex flex-col items-center justify-center '>
				<p className='text-font-white text-xl font-bold'>{name}</p>
				<p className='text-font-text-gray text-sm font-light'>@{userName}</p>
			</div>
		</div>
	);
};

const ProfilePageBody = () => {
	const btnClass =
		"btn border-none bg-card-gray h-16 rounded-xl flex flex-row items-center gap-6 p-4 justify-start";
	const iconClass = "text-brand-orange";
	const textClassGeneric = "text-font-white text-lg font-medium";

	const [isLogoutDrawerOpen, setIsLogoutDrawerOpen] = useState(false);

	return (
		<div className='w-full flex flex-col gap-4'>
			<button className={btnClass}>
				<GoPerson
					size={30}
					className={iconClass}
				/>
				<span className={textClassGeneric}>Edit Profile</span>
			</button>

			<button
				className={btnClass}
				onClick={() => setIsLogoutDrawerOpen(true)}
			>
				<IoLogOutOutline
					size={30}
					className='text-font-red-dark'
				/>
				<span className='text-font-red-dark text-lg font-medium'>Logout</span>
			</button>

			<LogoutDrawer
				setIsLogoutDrawerOpen={setIsLogoutDrawerOpen}
				isLogoutDrawerOpen={isLogoutDrawerOpen}
			/>
		</div>
	);
};

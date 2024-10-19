import { IoLogOutOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { GoPerson } from "react-icons/go";

const ProfilePage = () => {
	return (
		<div className='flex flex-col gap-6 w-full h-full pt-6 px-10 items-center'>
			<ProfilePageHeader
				name='john doe'
				userName='PeePeePooPoo'
			/>

			<hr className='solid w-[90%]' />

			<ProfilePageBody />
		</div>
	);
};

export default ProfilePage;

const ProfilePageHeader = ({ name, userName }: { name: string; userName: string }) => {
	return (
		<div className='w-full h-64 bg-card-gray rounded-xl flex flex-col items-center justify-start gap-4'>
			<div className='avatar pt-6'>
				<div className='w-36 rounded-full'>
					<img src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp' />
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
	return (
		<div className='w-full flex flex-col gap-4'>
			<div className='w-full h-16 bg-card-gray rounded-xl flex flex-row items-center gap-6 p-4'>
				<GoPerson
					size={30}
					className='text-brand-orange'
				/>
				<span className='text-font-white text-lg font-medium'>Profile</span>
			</div>
			<div className='w-full h-16 bg-card-gray rounded-xl flex flex-row items-center gap-6 p-4'>
				<IoSettingsOutline
					size={30}
					className='text-brand-orange'
				/>
				<span className='text-font-white text-lg font-medium'>Settings</span>
			</div>
			<div className='w-full h-16 bg-card-gray rounded-xl flex flex-row items-center gap-6 p-4'>
				<IoLogOutOutline
					size={30}
					className='text-font-red-dark'
				/>
				<span className='text-font-red-dark text-lg font-medium'>Logout</span>
			</div>
		</div>
	);
};

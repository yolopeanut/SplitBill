import ProfilePageHeader from "./components/profile-page-header/ProfilePageHeader";
import ProfilePageBody from "./components/profile-page-body/ProfilePageBody";
import { useGetUser } from "./hooks/useGetUser";

const ProfilePage = () => {
	const { data: user } = useGetUser();

	if (!user) {
		return null;
	}

	console.log(user);

	return (
		<div className='flex flex-col gap-6 w-full h-full pt-6 px-10 items-center'>
			<ProfilePageHeader
				name={user?.name}
				userName={user?.unique_username}
				profile_img_url={user?.profile_img_url}
			/>

			<hr className='solid w-[90%]' />

			<ProfilePageBody />
		</div>
	);
};

export default ProfilePage;

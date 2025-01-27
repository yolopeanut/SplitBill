import { IoLogOutOutline } from "react-icons/io5";
import LogoutDrawer from "../LogOutDrawer";
// import { GoPerson } from "react-icons/go";
import { useState } from "react";

const ProfilePageBody = () => {
    const btnClass =
        "btn border-none bg-card-gray h-16 rounded-xl flex flex-row items-center gap-6 p-4 justify-start";
    // const iconClass = "text-brand-orange";
    // const textClassGeneric = "text-font-white text-lg font-medium";

    const [isLogoutDrawerOpen, setIsLogoutDrawerOpen] = useState(false);

    return (
        <div className='w-full flex flex-col gap-4'>
            {/* <button className={btnClass}>
				<GoPerson
					size={30}
					className={iconClass}
				/>
				<span className={textClassGeneric}>Edit Profile</span>
			</button> */}

            <button
                className={btnClass}
                onClick={() => setIsLogoutDrawerOpen(true)}
            >
                <IoLogOutOutline size={30} className='text-font-red-dark' />
                <span className='text-font-red-dark text-lg font-medium'>
                    Logout
                </span>
            </button>

            <LogoutDrawer
                setIsLogoutDrawerOpen={setIsLogoutDrawerOpen}
                isLogoutDrawerOpen={isLogoutDrawerOpen}
            />
        </div>
    );
};

export default ProfilePageBody;

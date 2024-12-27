import { MdPeopleAlt } from "react-icons/md";
import { BiSolidWallet } from "react-icons/bi";

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
    NAV_BAR_PATHS,
    NAV_BAR_PATHS_DISABLED,
} from "../../constants/NavBarSettings";
import { useGetUser } from "../hooks/useGetUser";
import CommonProfileImage from "./CommonProfileImage";

const BottomNav = () => {
    const [activeTab, setActiveTab] = useState<number>(-1);
    const { data: user } = useGetUser();
    // If path is disabled, return null
    const location = useLocation();
    const navigate = useNavigate();
    const isDisabled = NAV_BAR_PATHS_DISABLED.includes(location.pathname);

    useEffect(() => {
        // Set the active tab based on the current path
        const currentPath = location.pathname;

        // Check if the current path starts with any of the base paths
        const activeTabIndex = NAV_BAR_PATHS.findIndex((path) =>
            currentPath.startsWith(path)
        );

        setActiveTab(activeTabIndex);
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
                        <div className='ring ring-brand-orange min-w-7 min-h-7 max-w-7 max-h-7 rounded-full flex justify-center items-center'>
                            <CommonProfileImage
                                imgSrc={user?.profile_img_url ?? null}
                                name={user?.name ?? ""}
                                size={7}
                                fontSize='sm'
                            />
                        </div>
                    </div>
                </button>
            </div>
        </>
    );
};

export default BottomNav;

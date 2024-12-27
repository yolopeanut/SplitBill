import { FaHouseFlag } from "react-icons/fa6";
import CommonDrawer from "../../../../../core/common/components/CommonDrawer";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useJoinGroup from "./hooks/useJoinGroup";

interface JoinGroupDrawerProps {
    isOpen: boolean;
    toggleDrawer: () => void;
}

export const JoinGroupDrawer = ({
    isOpen,
    toggleDrawer,
}: JoinGroupDrawerProps) => {
    const { groupId } = useParams();
    const navigate = useNavigate();
    const { joinGroup } = useJoinGroup(groupId ?? "");

    const handleJoinGroup = async () => {
        toggleDrawer();
        await joinGroup();
    };

    const handleCancel = () => {
        toggleDrawer();
        navigate(`/groups`);
    };
    return (
        <CommonDrawer
            isOpen={isOpen}
            toggleDrawer={toggleDrawer}
            size={350}
            canCloseOnOutsideClickOrSwipe={false}
        >
            <div className='flex flex-col items-center justify-center gap-8 w-full h-full pb-16'>
                <div className='flex flex-col text-xl text-font-white font-semibold items-center justify-center gap-2'>
                    <FaHouseFlag size={80} className='text-brand-orange pl-2' />
                    <span className='text-base font-semibold text-center'>
                        Do you want to join this group?
                    </span>
                </div>
                <div className='flex flex-row items-center justify-center gap-2 w-full'>
                    <button
                        className='btn bg-background-gray text-font-white w-32 border-none outline-none font-bold'
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    <button
                        className='btn bg-brand-orange text-font-black w-32 border-none outline-none font-bold'
                        onClick={handleJoinGroup}
                    >
                        Join
                    </button>
                </div>
            </div>
        </CommonDrawer>
    );
};

export default JoinGroupDrawer;

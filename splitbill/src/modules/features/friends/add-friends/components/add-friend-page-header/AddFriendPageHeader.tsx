import { IoArrowBack } from "react-icons/io5";
import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { CustomInputField } from "../../../../../core/common/components/CustomInputField";

interface AddFriendPageHeaderProps {
    setSearchQuery: Dispatch<SetStateAction<string>>;
}

const AddFriendPageHeader = ({ setSearchQuery }: AddFriendPageHeaderProps) => {
    const navigate = useNavigate();
    return (
        <div className='flex flex-col gap-4 h-28'>
            <div className='flex flex-row justify-between items-center'>
                <button
                    className='btn border-none p-0'
                    onClick={() => {
                        navigate("/friends");
                    }}
                >
                    <IoArrowBack size={30} className='text-brand-orange' />
                </button>
                <span className='text-font-white text-3xl font-semibold'>
                    Add Friends
                </span>

                {/* Space to keep the button and the text aligned */}
                <div className='w-7'></div>
            </div>

            <CustomInputField setSearchQuery={setSearchQuery} />
        </div>
    );
};

export default AddFriendPageHeader;

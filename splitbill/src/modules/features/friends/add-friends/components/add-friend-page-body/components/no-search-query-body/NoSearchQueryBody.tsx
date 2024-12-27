//interface NoSearchQueryBodyProps {
//}

import { FaPeoplePulling } from "react-icons/fa6";

const NoSearchQueryBody = () => {
    return (
        <div className='flex flex-col items-center justify-center h-full gap-4 -mt-10'>
            <FaPeoplePulling size={80} className='text-brand-orange' />
            <span className='text-font-white text-xl font-semibold text-center w-1/2'>
                Type in a username to adopt a friend
            </span>
        </div>
    );
};

export default NoSearchQueryBody;

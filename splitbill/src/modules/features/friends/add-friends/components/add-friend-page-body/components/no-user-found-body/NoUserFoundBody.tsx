//interface NoUserFoundBodyProps {
//}

import { FaPersonCircleQuestion } from "react-icons/fa6";
const NoUserFoundBody = () => {
    return (
        <div className='flex flex-col items-center justify-center h-full gap-4 -mt-10'>
            <FaPersonCircleQuestion size={80} className='text-brand-orange' />
            <span className='text-font-white text-xl font-semibold text-center w-1/2'>
                No user found
            </span>
        </div>
    );
};

export default NoUserFoundBody;

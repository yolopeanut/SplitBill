import { getInitials } from "../commonFunctions";

interface ICommonProfileImage {
    imgSrc: string | null;
    name: string;
    size: number;
}

const CommonProfileImage = ({ imgSrc, name, size }: ICommonProfileImage) => {
    const initials = getInitials(name);

    if (imgSrc) {
        return (
            <img
                className={`object-center rounded-full min-w-${size} min-h-${size} max-w-${size} max-h-${size}`}
                src={imgSrc}
                alt={name}
            />
        );
    } else {
        return (
            <div
                className={` text-font-white rounded-full flex justify-center items-center border-2 border-brand-orange min-w-${size} min-h-${size} max-w-${size} max-h-${size}`}
            >
                <span className='text-lg'>{initials}</span>
            </div>
        );
    }
};

export default CommonProfileImage;

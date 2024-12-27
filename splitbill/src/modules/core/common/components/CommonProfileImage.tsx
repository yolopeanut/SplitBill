import { getInitials } from "../commonFunctions";

interface ICommonProfileImage {
    imgSrc: string | null;
    name: string;
    size: number;
    fontSize?: string;
}

const CommonProfileImage = ({
    imgSrc,
    name,
    size,
    fontSize = "sm",
}: ICommonProfileImage) => {
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
            <span className={`text-${fontSize} text-font-white`}>
                {initials}
            </span>
        );
    }
};

export default CommonProfileImage;

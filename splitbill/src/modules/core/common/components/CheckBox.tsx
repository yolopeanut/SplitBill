import { useState } from "react";
import { IoIosCheckmark } from "react-icons/io";

// Custom checkbox component
const CheckBox = ({
	divClassName,
	iconClassName,
	onClick,
}: {
	divClassName: string;
	iconClassName: string;
	onClick: () => void;
}) => {
	const [isChecked, setIsChecked] = useState(false);
	return (
		<div
			className={`${divClassName} ${isChecked ? "bg-brand-orange" : ""}`}
			onClick={() => {
				setIsChecked(!isChecked);
				onClick();
			}}
		>
			{isChecked && <IoIosCheckmark className={iconClassName} />}
		</div>
	);
};

export default CheckBox;

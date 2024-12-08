import { useState } from "react";
import { IoIosCheckmark } from "react-icons/io";

interface CheckBoxProps {
	divClassName: string;
	iconClassName: string;
	onClick: () => void;
	isCheckedInitially?: boolean;
}

// Custom checkbox component
const CheckBox = ({ divClassName, iconClassName, onClick, isCheckedInitially }: CheckBoxProps) => {
	const [isChecked, setIsChecked] = useState(isCheckedInitially);
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

import { ReactNode, useState } from "react";
import { SlOptions } from "react-icons/sl";

export interface DropdownItem {
	icon: ReactNode | null;
	label: string;
	onClick: () => void;
	className?: string;
}

interface DropdownProps {
	items: DropdownItem[];
	triggerIcon?: ReactNode;
	dropdownWidth?: string;
	dropdownPosition?: "dropdown-bottom" | "dropdown-top" | "dropdown-left" | "dropdown-right";
	dropdownAlign?: "dropdown-end" | "dropdown-start";
}

const CommonDropdownComponent = ({
	items,
	triggerIcon = (
		<SlOptions
			size={24}
			className='text-font-white'
		/>
	),
	dropdownWidth = "w-32",
	dropdownPosition = "dropdown-bottom",
	dropdownAlign = "dropdown-end",
}: DropdownProps) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	return (
		<div className={`dropdown ${dropdownPosition} ${dropdownAlign}`}>
			<div
				onClick={() => setIsDropdownOpen(!isDropdownOpen)}
				tabIndex={0}
				role='button'
				className='btn m-1 outline-none border-none h-fit w-fit size-0'
			>
				{triggerIcon}
			</div>
			{isDropdownOpen && (
				<div
					tabIndex={0}
					className={`dropdown-content menu bg-card-gray-dark rounded-box z-[50] ${dropdownWidth} p-2 shadow-lg`}
				>
					{items.map((item, index) => (
						<div
							key={index}
							className={`text-font-white hover:text-brand-orange w-full h-10 flex items-center justify-start pl-2 gap-2 ${item.className}`}
							onClick={item.onClick}
						>
							{item.icon ? item.icon : null}
							{item.label}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default CommonDropdownComponent;

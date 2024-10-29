import { useState } from "react";
import { SlOptions } from "react-icons/sl";
import { RiEdit2Fill } from "react-icons/ri";
import { ImExit } from "react-icons/im";

const DropdownComponent = ({
	editGroup,
	leaveGroup,
}: {
	editGroup: () => void;
	leaveGroup: () => void;
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className='dropdown dropdown-bottom dropdown-end'>
			<div
				tabIndex={0}
				role='button'
				className='btn m-1 outline-none border-none h-fit w-fit size-0'
				onClick={toggleDropdown}
			>
				<SlOptions
					size={20}
					className='text-brand-orange'
				/>
			</div>
			{/* dropdown content */}
			{isOpen && (
				<div
					tabIndex={0}
					className='dropdown-content menu bg-card-gray-dark rounded-box z-[1] w-32 p-2 shadow-lg'
				>
					<div
						className='text-font-white hover:text-brand-orange w-full h-10 flex items-center justify-start pl-2 gap-2'
						onClick={() => {
							editGroup();
							setIsOpen(false);
						}}
					>
						<RiEdit2Fill
							size={20}
							className='text-brand-orange'
						/>
						Edit
					</div>
					<div
						className='text-font-white hover:text-brand-orange w-full h-10 flex items-center justify-start pl-2 gap-2'
						onClick={() => {
							leaveGroup();
							setIsOpen(false);
						}}
					>
						<ImExit
							size={20}
							className='text-font-red-dark'
						/>
						Leave
					</div>
				</div>
			)}
		</div>
	);
};

export default DropdownComponent;

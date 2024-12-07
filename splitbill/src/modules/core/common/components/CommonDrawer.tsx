import React, { useEffect } from "react";
import Drawer from "react-modern-drawer";
import Swipeable from "./Swipable";

interface CommonDrawerProps {
	children: React.ReactNode;
	isOpen: boolean;
	toggleDrawer: () => void;
	size?: number;
}

const CommonDrawer = ({ children, isOpen, toggleDrawer, size = 400 }: CommonDrawerProps) => {
	useEffect(() => {
		// This runs when the component mounts or when isOpen changes
		if (isOpen) {
			document.body.classList.add("overflow-y-hidden");
		} else {
			document.body.classList.remove("overflow-y-hidden");
		}

		// This cleanup function runs when:
		// 1. The component unmounts
		// 2. Before the effect runs again
		return () => {
			document.body.classList.remove("overflow-y-hidden");
		};
	}, [isOpen]);
	return (
		<Swipeable onSwipeDown={() => toggleDrawer()}>
			<Drawer
				open={isOpen}
				onClose={toggleDrawer}
				direction='bottom'
				size={size}
				className='rounded-t-2xl'
				style={{ backgroundColor: "#1F1F1F" }}
			>
				<div className='flex flex-col gap-4 bg-background-black p-4 h-full rounded-t-2xl'>
					<hr className='bg-brand-orange w-14 self-center rounded-full h-[0.2rem] outline-none border-none' />
					{children}
				</div>
			</Drawer>
		</Swipeable>
	);
};

export default CommonDrawer;

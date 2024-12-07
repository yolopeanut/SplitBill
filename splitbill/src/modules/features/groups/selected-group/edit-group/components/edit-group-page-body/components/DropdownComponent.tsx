import { GiBootKick } from "react-icons/gi";
interface DropdownComponentProps {
	position: { x: number; y: number };
	onKick: () => void;
}

const DropdownComponent = ({ position, onKick }: DropdownComponentProps) => {
	return (
		<div
			className='fixed z-50'
			style={{
				left: `${position.x}px`,
				top: `${position.y}px`,
			}}
		>
			<div className='dropdown-content menu bg-card-gray-dark rounded-box w-32 p-2 shadow-lg'>
				<div
					className='text-font-white hover:text-brand-orange w-full h-10 flex items-center justify-start pl-2 gap-2'
					onClick={() => {
						onKick();
					}}
				>
					<GiBootKick
						size={20}
						className='text-font-red-dark'
					/>
					Kick
				</div>
			</div>
		</div>
	);
};

export default DropdownComponent;

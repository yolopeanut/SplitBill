import Cropper, { Area, Point } from "react-easy-crop";

interface ImageCropperProps {
	isModalOpen: boolean;
	setIsModalOpen: (isModalOpen: boolean) => void;
	groupImageUrl: string;
	crop: Area;
	setCrop: (crop: Area) => void;
	zoom: number;
	setZoom: (zoom: number) => void;
	onCropComplete: (croppedArea: Area, croppedAreaPixels: Area) => void;
	handleCropComplete: () => void;
}

const ImageCropperDialog = ({
	isModalOpen,
	setIsModalOpen,
	groupImageUrl,
	crop,
	setCrop,
	zoom,
	setZoom,
	onCropComplete,
	handleCropComplete,
}: ImageCropperProps) => {
	return (
		<dialog
			id='my_modal_4'
			className='modal'
			open={isModalOpen}
			onClose={() => setIsModalOpen(false)}
		>
			<div className='modal-box w-11/12 max-w-5xl h-[80%] bg-background-gray'>
				<div className='modal-action flex flex-col gap-2 w-full h-full'>
					<div className='relative h-full w-full'>
						<Cropper
							image={groupImageUrl ?? ""}
							crop={crop}
							zoom={zoom}
							aspect={4 / 3}
							onCropChange={(location: Point) =>
								setCrop({
									x: location.x,
									y: location.y,
									width: 100,
									height: 100,
								})
							}
							onCropComplete={onCropComplete}
							onZoomChange={setZoom}
							objectFit='cover'
							style={{
								containerStyle: {
									width: "100%",
									height: "100%",
									backgroundColor: "#262626",
								},
								mediaStyle: {
									width: "100%",
									height: "100%",
								},
							}}
						/>
					</div>

					{/* if there is a button, it will close the modal */}
					<button
						className='btn'
						type='button'
						onClick={handleCropComplete}
					>
						Done
					</button>
				</div>
			</div>
		</dialog>
	);
};

export default ImageCropperDialog;

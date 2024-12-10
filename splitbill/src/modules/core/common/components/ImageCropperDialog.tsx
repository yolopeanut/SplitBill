import { useState } from "react";
import Cropper, { Area, Point } from "react-easy-crop";
import { getCroppedImg } from "../commonFunctions";
import { UseFormRegister } from "react-hook-form";

interface ImageCropperProps {
	imageUrl: string;
	isModalOpen: boolean;
	setIsModalOpen: (isModalOpen: boolean) => void;
	setCroppedImageUrl: (croppedImageUrl: string) => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	register: UseFormRegister<any> | undefined;
	registerName: string | undefined;
	customHandleCropComplete: (image: File) => void;
}

const ImageCropperDialog = ({
	imageUrl,
	isModalOpen,
	setIsModalOpen,
	setCroppedImageUrl,
	register,
	registerName,
	customHandleCropComplete,
}: ImageCropperProps) => {
	const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
	const aspectRatio = 4 / 3;

	return (
		<dialog
			id='my_modal_4'
			className='modal '
			open={isModalOpen}
			onClose={() => setIsModalOpen(false)}
		>
			<div className='modal-box w-11/12 max-w-5xl h-[80vh] relative bg-background-gray'>
				<div className='relative h-[80%] w-full'>
					<Cropper
						image={imageUrl}
						crop={crop}
						zoom={zoom}
						aspect={aspectRatio}
						onCropChange={setCrop}
						onZoomChange={setZoom}
						onCropComplete={(_, croppedAreaPixels) => {
							setCroppedAreaPixels(croppedAreaPixels);
						}}
						objectFit='contain'
						minZoom={0.5}
						maxZoom={3}
						style={{
							containerStyle: {
								width: "100%",
								height: "100%",
							},
							cropAreaStyle: {
								border: "2px solid #fff",
							},
						}}
					/>
				</div>

				<div className='flex justify-end gap-2 mt-4'>
					<button
						className='btn btn-ghost'
						onClick={() => setIsModalOpen(false)}
					>
						Cancel
					</button>
					<button
						className='btn btn-primary border-brand-orange'
						type='button'
						onClick={async () => {
							if (croppedAreaPixels) {
								const croppedImage = await getCroppedImg(imageUrl, croppedAreaPixels);
								setCroppedImageUrl(croppedImage.url);
								setIsModalOpen(false);
								if (register && registerName) {
									register(registerName, { value: croppedImage });
								}
								if (croppedImage.file) {
									customHandleCropComplete(croppedImage.file);
								}
							}
						}}
					>
						Done
					</button>
				</div>
			</div>
		</dialog>
	);
};

export default ImageCropperDialog;

import { useState } from "react";
import { Area } from "react-easy-crop";
import { getCroppedImg } from "../commonFunctions";
import { UseFormRegister } from "react-hook-form";

interface UseImageCropperProps {
	groupImageUrl: string | null | undefined;
	setGroupImageUrl: (url: string) => void;
	setGroupImage: (file: File) => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	register: UseFormRegister<any>;
}

const useImageCropper = ({
	groupImageUrl,
	setGroupImageUrl,
	setGroupImage,
	register,
}: UseImageCropperProps) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [crop, setCrop] = useState<Area>({ x: 0, y: 0, width: 0, height: 0 });
	const [zoom, setZoom] = useState(1);

	const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

	const onCropComplete = (croppedAreaPixels: Area) => {
		setCroppedAreaPixels(croppedAreaPixels);
	};

	const handleCropComplete = async () => {
		try {
			if (groupImageUrl && croppedAreaPixels) {
				const croppedImage = await getCroppedImg(groupImageUrl, croppedAreaPixels);
				if (croppedImage) {
					// Convert blob to File
					const croppedFile = new File([croppedImage], "cropped-image.jpeg", {
						type: "image/jpeg",
					});

					setGroupImageUrl(URL.createObjectURL(croppedImage));
					setGroupImage(croppedFile);
					register("image_src", { value: croppedFile });
				}
			}
			setIsModalOpen(false);
		} catch (error) {
			console.error("Error cropping image:", error);
		}
	};
	return {
		isModalOpen,
		setIsModalOpen,
		crop,
		setCrop,
		zoom,
		setZoom,
		onCropComplete,
		handleCropComplete,
	};
};

export default useImageCropper;

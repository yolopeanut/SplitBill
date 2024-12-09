import { useEffect, useRef, useState } from "react";
import useEditImage from "../../../../hooks/useEditImage";
import GroupImg from "../../../../../components/GroupImg";
import { queryClient } from "../../../../../../../../../config/ReactQuery";
import { BiSolidEditAlt } from "react-icons/bi";
import ImageCropperDialog from "../../../../../../../../core/common/components/ImageCropperDialog";
import useImageCropper from "../../../../../../../../core/common/hooks/useImageCropper";
import { useGroupsContext } from "../../../../../../hooks/useGroupsContext";

const EditGroupImage = () => {
	const { editImage } = useEditImage();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const { selectedGroup } = useGroupsContext();

	const [groupImage, setGroupImage] = useState<File | null>(null);
	const [groupImageUrl, setGroupImageUrl] = useState<string | null>(null);

	const {
		isModalOpen,
		setIsModalOpen,
		crop,
		setCrop,
		zoom,
		setZoom,
		onCropComplete,
		handleCropComplete: originalHandleCropComplete,
	} = useImageCropper({
		groupImageUrl,
		setGroupImageUrl,
		setGroupImage,
		register: undefined,
	});

	const handleEditImage = async (image: File) => {
		try {
			await editImage(image);
			queryClient.invalidateQueries({ queryKey: ["groups", "fetchSelectedGroup"] });
		} catch (error) {
			console.error("Error editing image:", error);
		}
	};

	const handleCropComplete = async () => {
		await originalHandleCropComplete();
		// Wait for groupImage to be set before handling edit
		if (groupImage) {
			await handleEditImage(groupImage);
			setIsModalOpen(false);
		}
	};

	useEffect(() => {
		setGroupImageUrl(selectedGroup?.img_url || null);
	}, [selectedGroup?.img_url]);

	return (
		<>
			<div className='h-[30%] relative'>
				<GroupImg
					className='w-full h-full object-cover rounded-2xl'
					img_url={groupImageUrl ?? undefined}
				/>
				<button
					className='btn btn-sm absolute bottom-2 right-2 bg-brand-orange p-1 rounded-md text-font-black'
					onClick={() => fileInputRef.current?.click()}
				>
					<BiSolidEditAlt size={20} />
				</button>

				<input
					ref={fileInputRef}
					type='file'
					className='hidden'
					accept='image/png, image/gif, image/jpeg'
					onChange={(e) => {
						if (e.target.files && e.target.files.length > 0) {
							const file = e.target.files[0];
							setGroupImageUrl(URL.createObjectURL(file));
							setIsModalOpen(true);
						}
					}}
				/>
			</div>

			<ImageCropperDialog
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				groupImageUrl={groupImageUrl ?? ""}
				crop={crop}
				setCrop={setCrop}
				zoom={zoom}
				setZoom={setZoom}
				onCropComplete={onCropComplete}
				handleCropComplete={handleCropComplete}
			/>
		</>
	);
};
export default EditGroupImage;

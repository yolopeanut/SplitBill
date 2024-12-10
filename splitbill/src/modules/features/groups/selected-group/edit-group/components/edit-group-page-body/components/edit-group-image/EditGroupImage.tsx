import { useEffect, useRef, useState } from "react";
import useEditImage from "../../../../hooks/useEditImage";
import GroupImg from "../../../../../components/GroupImg";
import { queryClient } from "../../../../../../../../../config/ReactQuery";
import { BiSolidEditAlt } from "react-icons/bi";
import ImageCropperDialog from "../../../../../../../../core/common/components/ImageCropperDialog";
import { useGroupsContext } from "../../../../../../hooks/useGroupsContext";

const EditGroupImage = () => {
	const { editImage } = useEditImage();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const { selectedGroup } = useGroupsContext();

	const [groupImageUrl, setGroupImageUrl] = useState<string | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);

	const handleEditImage = async (image: File) => {
		try {
			await editImage(image);
			queryClient.invalidateQueries({ queryKey: ["groups", "fetchSelectedGroup"] });
		} catch (error) {
			console.error("Error editing image:", error);
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
					img_url={croppedImageUrl ?? groupImageUrl ?? undefined}
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
				imageUrl={groupImageUrl ?? ""}
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				setCroppedImageUrl={setCroppedImageUrl}
				register={undefined}
				registerName={undefined}
				customHandleCropComplete={handleEditImage}
			/>
		</>
	);
};
export default EditGroupImage;

import { UseFormRegister } from "react-hook-form";
import { ICreateGroupForm } from "../../../../../core/interfaces/createGroupForm";
import { useState } from "react";
import { handleImageUpload } from "../../../../../core/common/commonFunctions";
import { MdOutlineFileUpload } from "react-icons/md";
import ImageCropperDialog from "../../../../../core/common/components/ImageCropperDialog";

type ImageSrcInputProps = {
	register: UseFormRegister<ICreateGroupForm>;
};

const options = { maxSizeMB: 0.7, maxWidthOrHeight: 1000, useWebWorker: true };

const GroupImageInput = ({ register }: ImageSrcInputProps) => {
	const [groupImage, setGroupImage] = useState<File | null>(null);
	const [groupImageUrl, setGroupImageUrl] = useState<string | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);

	return (
		<>
			<div className='flex flex-col gap-2 w-full h-full justify-center items-center bg-background-gray rounded-2xl border border-outline-white'>
				<label className='w-full flex flex-col items-center justify-center h-52'>
					{groupImage ? (
						<img
							src={croppedImageUrl ?? groupImageUrl ?? ""}
							alt='Group Image'
							className='w-full h-full object-cover rounded-2xl'
						/>
					) : (
						<div className='flex flex-col items-center gap-2'>
							<MdOutlineFileUpload
								size={45}
								className='text-brand-orange'
							/>
							<span className='text-font-white text-base font-semibold'>Upload Group Image</span>
						</div>
					)}
					<input
						type='file'
						placeholder=''
						className='hidden'
						accept='image/png, image/gif, image/jpeg'
						onChange={(e) => {
							if (e.target.files && e.target.files.length > 0) {
								handleImageUpload({ event: e, options }).then((file) => {
									if (file) {
										setGroupImageUrl(URL.createObjectURL(file));
										setGroupImage(file);

										// Open modal after image is processed
										setIsModalOpen(true);
									}
								});
							}
						}}
					/>
				</label>
			</div>
			<ImageCropperDialog
				imageUrl={groupImageUrl ?? ""}
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				setCroppedImageUrl={setCroppedImageUrl}
				register={register}
				customHandleCropComplete={() => {}}
			/>
		</>
	);
};

export default GroupImageInput;

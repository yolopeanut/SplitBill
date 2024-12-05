import { UseFormRegister } from "react-hook-form";
import { ICreateGroupForm } from "../../../../../core/interfaces/createGroupForm";
import { useState } from "react";
import { handleImageUpload } from "../../../../../core/common/commonFunctions";

type ImageSrcInputProps = {
	register: UseFormRegister<ICreateGroupForm>;
};

const options = { maxSizeMB: 0.7, maxWidthOrHeight: 1000, useWebWorker: true };

const GroupImageInput = ({ register }: ImageSrcInputProps) => {
	const [groupImage, setGroupImage] = useState<File | null>(null);
	const [groupImageUrl, setGroupImageUrl] = useState<string | null>(null);
	return (
		<>
			<div className='flex flex-col gap-2 w-20 h-20 justify-center items-center bg-font-white rounded-lg '>
				<label className='w-64 flex flex-col items-center px-4 py-6 '>
					{groupImage ? (
						<img
							src={groupImageUrl ? groupImageUrl : ""}
							alt='Group Image'
							className='w-20 h-20 object-cover rounded-lg'
						/>
					) : (
						<span className='text-font-black text-4xl font-semibold'>+</span>
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
										register("image_src", { value: file });
									}
								});
							}
						}}
					/>
				</label>
			</div>
		</>
	);
};

export default GroupImageInput;

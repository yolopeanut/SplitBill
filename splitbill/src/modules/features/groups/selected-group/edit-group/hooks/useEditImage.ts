import { supabase } from "../../../../../../config/Supabase";
import getPublicUrl from "../../../../../core/database_functions/getPublicUrl";
import post_update_group_img from "../../../../../core/database_functions/post_update_group_img";
import post_image_to_storage from "../../../../../core/database_functions/postImageToStorage";
import { useGroupsContext } from "../../../hooks/useGroupsContext";

const useEditImage = () => {
	const { selectedGroup, setSelectedGroup } = useGroupsContext();

	// Update the image in the database
	const updateImageDB = async (image_src: string) => {
		await post_update_group_img(selectedGroup!.id, image_src);
	};

	// Delete the old image from the storage
	const deleteImageStorage = async () => {
		console.log("deleteImageStorage", selectedGroup?.img_src);
		const { error } = await supabase.storage.from("images").remove([`${selectedGroup?.img_src}`]);
		if (error) {
			throw error;
		}
	};

	const editImage = async (image: File) => {
		// Upload the image to the storage
		const image_src = await post_image_to_storage(image);
		const img_url = getPublicUrl(image_src);

		// Update the image in the database
		await updateImageDB(image_src);

		// Update context immediately
		setSelectedGroup({
			...selectedGroup!,
			img_src: image_src,
			img_url: img_url,
		});

		// Delete the old image from the storage
		await deleteImageStorage();
	};
	return { editImage };
};

export default useEditImage;

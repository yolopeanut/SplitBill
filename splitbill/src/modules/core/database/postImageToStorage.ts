import { supabase } from "../../../config/Supabase";

export default async function post_image_to_storage_and_ref_table(file: File, uploader_id: string): Promise<string> {
	const fileName = `${Date.now()}-${file.name}`;

	// Upload the image to the storage
	const { data: dataStorage, error: errorStorage } = await supabase.storage.from("images").upload(fileName, file);

	// If there is an error, throw it
	if (errorStorage) {
		throw new Error(errorStorage.message);
	}

	// Add the image reference to the database
	const { error: refError } = await supabase.schema("splitbill").rpc("add_img_ref", {
		p_image_path: dataStorage.path,
		p_uploader: uploader_id,
	});

	// If there is an error, throw it
	if (refError) {
		throw new Error(refError.message);
	}

	return dataStorage.path;
}

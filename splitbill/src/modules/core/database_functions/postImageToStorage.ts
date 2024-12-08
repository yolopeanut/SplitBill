import { supabase } from "../../../config/Supabase";

export default async function post_image_to_storage(file: File): Promise<string> {
	const fileName = `${Date.now()}-${file.name}`;

	// Upload the image to the storage
	const { data: dataStorage, error: errorStorage } = await supabase.storage
		.from("images")
		.upload(fileName, file);

	// If there is an error, throw it
	if (errorStorage) {
		throw new Error(errorStorage.message);
	}

	return dataStorage.path;
}

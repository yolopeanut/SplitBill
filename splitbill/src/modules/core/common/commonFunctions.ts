import imageCompression from "browser-image-compression";

export function getFirstLetter(name: string) {
	return name.charAt(0).toUpperCase();
}

// Get initials from name for first two letters
export function getInitials(name: string) {
	return name
		.split(" ")
		.map((n) => n.charAt(0).toUpperCase())
		.join("")
		.slice(0, 2);
}

export function truncateText(text: string, maxLength: number) {
	if (text.length > maxLength) {
		return text.slice(0, maxLength) + "...";
	}
	return text;
}

export function getPlural(num: number, word: string) {
	if (num === 1) {
		return `${num} ${word}`;
	}
	return `${num} ${word}s`;
}

export async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
	const imageFile = event.target.files?.[0];

	if (!imageFile) {
		return;
	}

	// console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
	// console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

	const options = {
		maxSizeMB: 1,
		maxWidthOrHeight: 100,
		useWebWorker: true,
	};
	try {
		const compressedFile = await imageCompression(imageFile, options);
		// console.log("compressedFile instanceof Blob", compressedFile instanceof Blob); // true
		// console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

		return compressedFile;
	} catch (error) {
		console.log(error);
	}
}

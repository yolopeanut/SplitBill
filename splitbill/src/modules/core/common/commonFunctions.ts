import imageCompression from "browser-image-compression";
import ExpenseCategory from "../enums/ExpenseCategoryEnum";
import { expenseCategories } from "../constants/ExpenseCategories";
import { IUserBalance } from "../interfaces/user_balances";
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

// Function that compresses the image file
export async function handleImageUpload({
	event,
	options,
}: {
	event: React.ChangeEvent<HTMLInputElement>;
	options: { maxSizeMB: number; maxWidthOrHeight: number; useWebWorker: boolean };
}) {
	const imageFile = event.target.files?.[0];

	if (!imageFile) {
		return;
	}

	// console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
	// console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

	try {
		const compressedFile = await imageCompression(imageFile, options);
		// console.log("compressedFile instanceof Blob", compressedFile instanceof Blob); // true
		// console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

		return compressedFile;
	} catch (error) {
		console.log(error);
	}
}

export function formatCurrency(amount: number, currency: string) {
	return `${currency} ${amount.toFixed(2)}`;
}

export const numberWithLeadingZeros = (num: number, totalLength: number): string => {
	return num.toString().padStart(totalLength, "0");
};

export const getCategoryTailwindColor = (category: ExpenseCategory) => {
	return expenseCategories.find((categories) => categories.label === category)?.color;
};

export const getNumericLeadingValue = (value: string[]) => {
	if (value.length === 0) return "0.00";
	if (value.length <= 2) return `0.${value.join("").padStart(2, "0")}`;
	if (value.length > 2) {
		const wholePart = value.slice(0, -2).join("") || "0"; // Get the whole part
		const decimalPart = value.slice(-2).join(""); // Get the last two digits as decimal
		return `${wholePart}.${decimalPart}`; // Combine them
	}
};

export function getTotalOwed(owes_users: IUserBalance["owes_users"]) {
	return Object.values(owes_users).reduce((acc, curr) => {
		return acc + curr;
	}, 0);
}

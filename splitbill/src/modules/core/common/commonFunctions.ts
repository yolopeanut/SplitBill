import imageCompression from "browser-image-compression";
import ExpenseCategory from "../enums/ExpenseCategoryEnum";
import { expenseCategories } from "../constants/ExpenseCategories";
import { IUserBalance } from "../interfaces/user_balances";
import { Area } from "react-easy-crop";
import {
	IAllTransactionsTable,
	ITransactionSplitsTable,
} from "../interfaces/all_transactionsTable";
import { AnalyticsTimeframeEnum } from "../enums/AnalyticsTimeframeEnum";
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

const createImage = (url: string): Promise<HTMLImageElement> =>
	new Promise((resolve, reject) => {
		const image = new Image();
		image.addEventListener("load", () => resolve(image));
		image.addEventListener("error", (error) => reject(error));
		image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
		image.src = url;
	});

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 * @param {File} image - Image File url
 * @param {Object} pixelCrop - pixelCrop Object provided by react-easy-crop
 * @param {number} rotation - optional rotation parameter
 */
export async function getCroppedImg(
	imageSrc: string,
	pixelCrop: Area
): Promise<{ file: File | null; url: string }> {
	const image = await createImage(imageSrc);
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");

	if (!ctx) {
		return { file: null, url: "" };
	}

	// Set the canvas size to the cropped dimensions
	canvas.width = pixelCrop.width;
	canvas.height = pixelCrop.height;

	// Draw the cropped portion of the image
	ctx.drawImage(
		image,
		pixelCrop.x,
		pixelCrop.y,
		pixelCrop.width,
		pixelCrop.height,
		0,
		0,
		pixelCrop.width,
		pixelCrop.height
	);

	// Convert to blob and return as URL
	return new Promise((resolve) => {
		canvas.toBlob((file) => {
			if (!file) {
				resolve({ file: null, url: "" });
				return;
			}
			resolve({
				file: new File([file], "cropped.jpg", { type: "image/jpeg" }),
				url: URL.createObjectURL(file),
			});
		}, "image/jpeg");
	});
}

export const calculateSplitAmount = (
	transaction: IAllTransactionsTable,
	split: ITransactionSplitsTable
) => {
	if (split.equal_split_amount !== null) {
		return split.equal_split_amount;
	}
	if (split.unequal_split_amount !== null) {
		return split.unequal_split_amount;
	}
	if (split.percentage_split_amount !== null) {
		return (split.percentage_split_amount / 100) * transaction.total_amount;
	}
	return 0;
};

export const filterTransactionsByTimeframe = (
	transactions: IAllTransactionsTable[],
	selectedTimeFrame: AnalyticsTimeframeEnum
) => {
	const now = new Date();

	switch (selectedTimeFrame) {
		case AnalyticsTimeframeEnum.CURRENT_MONTH: {
			const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
			return transactions.filter((transaction) => new Date(transaction.created_at) >= startOfMonth);
		}
		case AnalyticsTimeframeEnum.LAST_MONTH: {
			const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
			const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
			return transactions.filter((transaction) => {
				const transactionDate = new Date(transaction.created_at);
				return transactionDate >= startOfLastMonth && transactionDate < startOfCurrentMonth;
			});
		}
		case AnalyticsTimeframeEnum.THIS_YEAR: {
			const startOfYear = new Date(now.getFullYear(), 0, 1);
			return transactions.filter((transaction) => new Date(transaction.created_at) >= startOfYear);
		}
		case AnalyticsTimeframeEnum.ALL_TIME: {
			return transactions;
		}
		default:
			return transactions;
	}
};

// Convert Tailwind classes to hex colors
export const tailwindToHex: { [key: string]: string } = {
	"bg-green-500": "#22C55E",
	"bg-red-700": "#B91C1C",
	"bg-blue-800": "#1E40AF",
	"bg-yellow-600": "#CA8A04",
	"bg-blue-600": "#2563EB",
	"bg-pink-600": "#DB2777",
	"bg-green-600": "#16A34A",
	"bg-orange-700": "#C2410C",
	"bg-purple-700": "#7E22CE",
	"bg-pink-300": "#F9A8D4",
	"bg-indigo-600": "#4F46E5",
	"bg-teal-600": "#0D9488",
	"bg-orange-300": "#FDBA74",
	"bg-lime-500": "#84CC16",
	"bg-purple-500": "#A855F7",
	"bg-amber-700": "#B45309",
	"bg-emerald-600": "#059669",
	"bg-blue-300": "#93C5FD",
	"bg-yellow-500": "#EAB308",
	"bg-gray-600": "#4B5563",
	"bg-red-900": "#7F1D1D",
	"bg-red-800": "#991B1B",
};

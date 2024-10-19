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

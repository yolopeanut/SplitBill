import { useCallback, useEffect, useState } from "react";

interface Position {
	x: number;
	y: number;
}

interface UseLongPressDropdownReturn {
	selectedId: string | null;
	dropdownPosition: Position;
	handlePressStart: (id: string, event: React.TouchEvent | React.MouseEvent) => void;
	handlePressEnd: () => void;
	closeDropdown: () => void;
	touchProps: {
		onTouchStart: (e: React.TouchEvent) => void;
		onTouchEnd: () => void;
		onMouseDown: (e: React.MouseEvent) => void;
		onMouseUp: () => void;
		onMouseLeave: () => void;
	};
}

export const useLongPressDropdown = (pressDelay = 400): UseLongPressDropdownReturn => {
	const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const [dropdownPosition, setDropdownPosition] = useState<Position>({ x: 0, y: 0 });

	useEffect(() => {
		// Make touch events non-passive
		const options: AddEventListenerOptions = { passive: false };
		const noop = () => {};

		document.addEventListener("touchstart", noop, options);
		document.addEventListener("touchmove", noop, options);

		return () => {
			document.removeEventListener("touchstart", noop, options);
			document.removeEventListener("touchmove", noop, options);
		};
	}, []);

	const handlePressStart = useCallback(
		(id: string, event: React.TouchEvent | React.MouseEvent) => {
			const x = "touches" in event ? event.touches[0].clientX : (event as React.MouseEvent).clientX;
			const y = "touches" in event ? event.touches[0].clientY : (event as React.MouseEvent).clientY;

			const timer = setTimeout(() => {
				setDropdownPosition({
					x: Math.min(x, window.innerWidth - 128),
					y: y + window.scrollY,
				});
				setSelectedId(id);
			}, pressDelay);
			setPressTimer(timer);
		},
		[pressDelay]
	);

	const handlePressEnd = useCallback(() => {
		if (pressTimer) {
			clearTimeout(pressTimer);
			setPressTimer(null);
		}
	}, [pressTimer]);

	const closeDropdown = useCallback(() => {
		setSelectedId(null);
	}, []);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				selectedId &&
				!(event.target as HTMLElement).closest(".dropdown-content") &&
				!(event.target as HTMLElement).closest(".user-card-container")
			) {
				closeDropdown();
			}
		};

		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	}, [selectedId, closeDropdown]);

	const touchProps = {
		onTouchStart: (e: React.TouchEvent) => handlePressStart(e.currentTarget.id, e),
		onTouchEnd: handlePressEnd,
		onMouseDown: (e: React.MouseEvent) => handlePressStart(e.currentTarget.id, e),
		onMouseUp: handlePressEnd,
		onMouseLeave: handlePressEnd,
	};

	return {
		selectedId,
		dropdownPosition,
		handlePressStart,
		handlePressEnd,
		closeDropdown,
		touchProps,
	};
};

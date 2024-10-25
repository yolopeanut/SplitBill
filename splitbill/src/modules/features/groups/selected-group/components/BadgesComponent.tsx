const Badges = ({
	selectedBadge,
	setSelectedBadge,
}: {
	selectedBadge: string;
	setSelectedBadge: (badge: string) => void;
}) => {
	// Styling classes for badges
	const badgeClassName =
		"btn btn-sm bg-button-gray rounded-full w-32  flex justify-center items-center border-brand-orange text-font-white";
	const selectedBadgeClassName =
		"btn btn-sm bg-brand-orange rounded-full w-32 h-8 flex justify-center items-center text-font-black";

	return (
		<div className='flex flex-row justify-start items-center gap-2 overflow-x-auto min-h-10 no-scrollbar'>
			{/* Transactions badge */}
			<button
				className={selectedBadge === "Transactions" ? selectedBadgeClassName : badgeClassName}
				onClick={() => setSelectedBadge("Transactions")}
			>
				Transactions
			</button>

			{/* Balances badge */}
			<button
				className={selectedBadge === "Balances" ? selectedBadgeClassName : badgeClassName}
				onClick={() => setSelectedBadge("Balances")}
			>
				Balances
			</button>

			{/* Analytics badge */}
			<button
				className={selectedBadge === "Analytics" ? selectedBadgeClassName : badgeClassName}
				onClick={() => setSelectedBadge("Analytics")}
			>
				Analytics
			</button>
		</div>
	);
};
export default Badges;

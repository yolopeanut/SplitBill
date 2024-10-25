import useLongPress from "../hooks/useLongPress";

const LongPressButton = () => {
	const buttonLongPress = useLongPress(() => {
		console.log("Long pressed");
	}, 500);
	return (
		<button
			className='btn'
			{...buttonLongPress}
		>
			Add Transaction
		</button>
	);
};

export default LongPressButton;

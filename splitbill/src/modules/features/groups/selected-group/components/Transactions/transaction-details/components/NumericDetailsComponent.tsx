import { ReactNode } from "react";

interface NumericDetailsProps {
	titleSpan: ReactNode;
	amount: number;
	divClassName?: string;
	subDivClassName?: string;
	spanClassName?: string;
}

const NumericDetails = ({
	titleSpan,
	amount,
	divClassName,
	subDivClassName,
	spanClassName,
}: NumericDetailsProps) => {
	return (
		<div className={`${divClassName}`}>
			<span className={`${spanClassName}`}>{titleSpan}</span>
			<div className={`${subDivClassName}`}>{`RM ${amount.toFixed(2)}`}</div>
		</div>
	);
};

export default NumericDetails;

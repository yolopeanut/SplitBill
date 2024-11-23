import { useParams } from "react-router-dom";
import TransactionDetailPageBody from "./components/TransactionDetailPageBody";
import TransactionDetailPageHeader from "./components/TransactionDetailPageHeader";
import { useGetTransactionByID } from "./hooks/useGetTransactionByID";
import Loading from "../../../../../../core/common/components/Loading";

const TransactionDetailPage = () => {
	const { transactionId } = useParams();
	const { data, isLoading } = useGetTransactionByID(transactionId!);
	if (isLoading || !data) {
		return <Loading />;
	}

	if (data.transaction_id !== transactionId) {
		return <Loading />;
	}
	console.log({ data });

	return (
		<>
			<div
				className='w-full h-full gap-8 flex flex-col items-center'
				key={transactionId}
			>
				<TransactionDetailPageHeader data={data} />
				<TransactionDetailPageBody data={data} />
			</div>
		</>
	);
};

export default TransactionDetailPage;

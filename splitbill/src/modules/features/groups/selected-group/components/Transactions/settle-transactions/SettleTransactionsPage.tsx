import SettleTransactionsPageBody from "./components/settle-transactions-page-body/SettleTransactionsPageBody";
import SettleTransactionsPageHeader from "./components/SettleTransactionsPageHeader";

const SettleTransactionsPage = () => {
	return (
		<div className='flex flex-col flex-1 items-center gap-4 w-full h-[calc(100vh-4rem)] pb-4 '>
			<SettleTransactionsPageHeader />
			<SettleTransactionsPageBody />
		</div>
	);
};

export default SettleTransactionsPage;

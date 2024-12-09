import { supabase } from "../../../config/Supabase";

const deleteTransactionDB = async (transaction_id: string) => {
	const { error } = await supabase.schema("splitbill").rpc("delete_transaction", {
		p_trans_id: transaction_id,
	});

	if (error) {
		throw error;
	}
};

export default deleteTransactionDB;

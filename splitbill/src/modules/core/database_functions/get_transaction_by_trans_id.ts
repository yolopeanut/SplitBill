import { supabase } from "../../../config/Supabase";

const getTransactionByTransId = async (p_transaction_id: string) => {
	const { data, error } = await supabase
		.schema("splitbill")
		.rpc("get_transaction_by_trans_id", { p_transaction_id });

	if (error) {
		throw error;
	}

	return data;
};

export default getTransactionByTransId;

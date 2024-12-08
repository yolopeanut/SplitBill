import { supabase } from "../../../config/Supabase";
import { IAllTransactionsTable } from "../interfaces/all_transactionsTable";

const getGroupById = async (group_id: string) => {
	const { data, error } = await supabase
		.schema("splitbill")
		.rpc("get_all_group_transaction_by_group_id", {
			p_group_id: group_id,
		});

	if (error) {
		throw error;
	}

	return data as IAllTransactionsTable[];
};

export default getGroupById;

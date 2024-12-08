import { supabase } from "../../../config/Supabase";

const postUpdateTransactionSplitsDB = async (
	split_id: string,
	trans_id: string,
	user_id: string,
	split_type: string,
	equal_split_amount: number | null,
	unequal_split_amount: number | null,
	percentage_split_amount: number | null
) => {
	// console.log({
	// 	p_split_id: split_id,
	// 	p_trans_id: trans_id,
	// 	p_user_id: user_id,
	// 	p_split_type: split_type,
	// 	p_equal_split_amount: equal_split_amount,
	// 	p_unequal_split_amount: unequal_split_amount,
	// 	p_percentage_split_amount: percentage_split_amount,
	// });
	const { data, error } = await supabase.schema("splitbill").rpc("post_update_transaction_splits", {
		p_split_id: split_id,
		p_trans_id: trans_id,
		p_user_id: user_id,
		p_split_type: split_type,
		p_equal_split_amount: equal_split_amount,
		p_unequal_split_amount: unequal_split_amount,
		p_percentage_split_amount: percentage_split_amount,
	});

	if (error) {
		throw error;
	}

	return data;
};

export default postUpdateTransactionSplitsDB;

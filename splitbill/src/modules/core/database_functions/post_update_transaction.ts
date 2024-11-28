import { supabase } from "../../../config/Supabase";

const postUpdateTransactionDB = async (
	transaction_id: string,
	group_id: string,
	user_id: string,
	paid_by: string,
	expense_title: string,
	category: string,
	amount: number,
	remarks: string | null,
	tax: number | 0
) => {
	const { data, error } = await supabase.schema("splitbill").rpc("post_update_transaction", {
		p_transaction_id: transaction_id,
		p_group_id: group_id,
		p_trans_creator_user_id: user_id,
		p_paid_by: paid_by,
		p_expense_title: expense_title,
		p_category: category,
		p_amount: amount,
		p_remarks: remarks,
		p_tax: tax,
	});

	if (error) {
		throw error;
	}

	console.log({ data });

	return data;
};

export default postUpdateTransactionDB;

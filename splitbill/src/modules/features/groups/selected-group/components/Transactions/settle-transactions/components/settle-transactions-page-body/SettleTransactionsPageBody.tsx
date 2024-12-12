import { useEffect, useState } from "react";
import NumericInput from "../../../../../../../../core/common/components/NumericInput";
import useUserContext from "../../../../../../../login/hooks/useUserContext";
import SettleProfiles from "./components/settle-profiles/SettleProfiles";
import useSettleTransactionBody from "./hooks/useSettleTransactionBody";
import { useGroupsContext } from "../../../../../../hooks/useGroupsContext";
import { useNavigate, useParams } from "react-router-dom";

const SettleTransactionsPageBody = () => {
	const { currentUser } = useUserContext();
	const { selectedGroup } = useGroupsContext();
	const navigate = useNavigate();
	const { groupId } = useParams();

	const { selectedRepayingUser, setSelectedRepayingUser, owesUsers } = useSettleTransactionBody();

	const [amount, setAmount] = useState(0);

	const [error, setError] = useState("");

	const handleSettleUp = () => {
		if (amount <= 0) {
			setError("Enter a valid amount");
			return;
		}

		console.log("Settle up");
	};

	useEffect(() => {
		if (!selectedGroup) {
			navigate(`/groups/${groupId}`);
		}
	}, [navigate, selectedGroup, groupId]);

	return (
		<>
			<div className='flex flex-col justify-between items-center gap-4 w-full h-full'>
				<div className='flex flex-col gap-4 w-full items-center'>
					<div className='flex flex-row w-full items-center justify-center pl-10'>
						<SettleProfiles
							currentUser={currentUser!}
							owesUsers={owesUsers!}
							selectedRepayingUser={selectedRepayingUser}
							setSelectedRepayingUser={setSelectedRepayingUser}
						/>
					</div>
					{selectedRepayingUser && (
						<>
							<div className='flex flex-col gap-2 items-center w-full'>
								<span className='text-font-white font-semibold text-base'>
									You are repaying <span className='underline'>{selectedRepayingUser?.name}</span>
								</span>
								<span className='text-font-text-gray text-sm font-bold'>
									@{selectedRepayingUser?.unique_username}
								</span>
							</div>

							<div className='flex flex-row gap-2 items-start w-full justify-center'>
								<div className='text-font-white text-base bg-background-gray rounded-lg p-2 w-16 h-14 flex items-center justify-center font-thin'>
									{selectedGroup?.currency}
								</div>
								<div className='flex flex-row w-32'>
									<NumericInput
										value={amount}
										onChange={setAmount}
										error={error}
									/>
								</div>
							</div>
						</>
					)}
				</div>

				{selectedRepayingUser ? (
					<button
						className='btn btn-primary bg-brand-orange text-font-black outline-none w-[70%]'
						onClick={handleSettleUp}
					>
						Settle Up
					</button>
				) : (
					<button className='btn btn-primary bg-brand-orange text-font-black outline-none w-[70%]'>
						Select a user to settle up
					</button>
				)}
			</div>
		</>
	);
};

export default SettleTransactionsPageBody;

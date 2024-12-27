import { formatCurrency } from "../../../../../../../core/common/commonFunctions";
import { IAllUsersTable } from "../../../../../../../core/interfaces/all_usersTable";

interface ITotalOwedSpanProps {
    totalOwed: number;
    user: IAllUsersTable;
    currency: string;
}

const TotalOwedSpan = ({ totalOwed, user, currency }: ITotalOwedSpanProps) => {
    return (
        <>
            {totalOwed < 0 ? (
                <span>
                    {user.name} owes{" "}
                    <span className='text-font-red-owes inline font-bold'>
                        {formatCurrency(Math.abs(totalOwed), currency || "RM")}
                    </span>{" "}
                    in total
                </span>
            ) : (
                <span>
                    {user.name} is owed{" "}
                    <span className='text-font-green-is-owed font-bold'>
                        {formatCurrency(Math.abs(totalOwed), currency || "RM")}
                    </span>{" "}
                    in total
                </span>
            )}
        </>
    );
};
export default TotalOwedSpan;

import useAuthContext from "../../../modules/core/auth/hooks/useAuthContext";
import { Navigate } from "react-router-dom";
import Loading from "../../../modules/core/common/Loading";

export const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
	const { session, isLoading } = useAuthContext();

	if (isLoading) return <Loading />;

	return <>{session ? <>{children}</> : <Navigate to='/' />}</>;
};

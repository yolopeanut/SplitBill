import useAuthContext from "../../core/auth/hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
function LoginPage() {
	const { session, isLoading, googleLogin } = useAuthContext();
	const navigate = useNavigate();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (session) {
		navigate("/groups");
	}

	const handleLogin = async () => {
		await googleLogin();
	};

	return (
		<>
			<button
				className='btn'
				onClick={handleLogin}
			>
				Login
			</button>
		</>
	);
}

export default LoginPage;

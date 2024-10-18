import useAuthContext from "../../core/auth/hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { GiCoinflip } from "react-icons/gi";
import { FcGoogle } from "react-icons/fc";
import Loading from "../../core/common/Loading";

function LoginPage() {
	const { session, isLoading, googleLogin } = useAuthContext();
	const navigate = useNavigate();

	//Check if process is loading
	if (isLoading) {
		return <Loading />;
	}

	//Check if user is logged in
	if (session) {
		navigate("/create-profile");
	}

	//Handle login with google
	const handleLogin = async () => {
		await googleLogin();
	};

	return (
		<>
			<LoginPageBody handleLogin={handleLogin} />
		</>
	);
}

export default LoginPage;

const LoginPageBody = ({ handleLogin }: { handleLogin: () => void }) => {
	return (
		<>
			<div className='flex flex-col items-center justify-start h-screen gap-28 pt-32 bg-background-black w-screen'>
				{CoinFlipIcon}

				<div className='flex flex-col items-center justify-center gap-10'>
					<TitleText />
					<GoogleLoginButton handleLogin={handleLogin} />
				</div>
			</div>
		</>
	);
};

const CoinFlipIcon = <GiCoinflip className='text-brand-orange text-8xl' />;

const TitleText = () => <div className='text-3xl font-bold text-font-white'>Let's Get Started!</div>;

const GoogleLoginButton = ({ handleLogin }: { handleLogin: () => void }) => {
	return (
		<div className='h-14'>
			<button
				className='btn bg-button-gray text-font-white flex items-center gap-4 rounded-full w-80 h-full outline outline-1 outline-outline-gray'
				onClick={handleLogin}
			>
				<FcGoogle className='text-3xl' />
				<div className='text-base mx-auto'>Log in with Google</div>
				<div className='w-6' />
			</button>
		</div>
	);
};

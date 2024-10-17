import { NavigateFunction, useNavigate } from "react-router-dom";

const CreateProfileText = (
	<div className='flex flex-col gap-2 items-start w-full'>
		<span className='text-3xl font-bold text-font-white self-start'>Create Profile</span>
	</div>
);
const UserNameText = (
	<div className='label'>
		<span className='label-text text-font-white text-base font-semibold'>Username</span>
	</div>
);

const MakeItUniqueText = <span className='text-sm text-font-white'>Remember to make it unique! 😉</span>;

const CreateProfilePage = () => {
	const navigate = useNavigate();
	return (
		<>
			<div className='flex flex-col w-full h-screen justify-between items-center pb-10'>
				{/* div to space items */}
				<div></div>
				<div className='flex flex-col w-[80%] justify-center items-center gap-10'>
					{CreateProfileText}
					<div className='flex flex-col gap-4 w-full justify-start items-start'>
						{UserNameText}
						<UserNameInput />
						{MakeItUniqueText}
					</div>
				</div>

				<LetsGoButton navigate={navigate} />
			</div>
		</>
	);
};

export default CreateProfilePage;
const LetsGoButton = ({ navigate }: { navigate: NavigateFunction }) => {
	return (
		<div className='h-14 w-full'>
			<button
				className='btn bg-brand-orange text-font-black font-black text-base rounded-full w-full max-w-xs h-full'
				onClick={() => {
					navigate("/groups");
				}}
			>
				Let's go
			</button>
		</div>
	);
};
const UserNameInput = () => {
	return (
		<input
			type='text'
			placeholder=''
			className='input w-full max-w-xs bg-input-box-gray text-font-white rounded-xl'
		/>
	);
};

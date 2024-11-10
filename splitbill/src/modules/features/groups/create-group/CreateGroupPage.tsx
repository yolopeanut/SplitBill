import CreateGroupPageBody from "./components/CreateGroupPageBody";
import CreateGroupPageHeader from "./components/CreateGroupPageHeader";

const CreateGroupPage = () => {
	return (
		<>
			<div className='flex flex-col items-center w-full h-full p-2'>
				<CreateGroupPageHeader />
				<CreateGroupPageBody />
			</div>
		</>
	);
};

export default CreateGroupPage;

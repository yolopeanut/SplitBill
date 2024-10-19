import { IoSearch } from "react-icons/io5";

const FriendsPage = () => {
	return (
		<>
			<div className='flex flex-col gap-4 p-9 pt-14 '>
				<FriendsPageHeader />
				<FriendsPageBody />
			</div>
		</>
	);
};

export default FriendsPage;

const FriendsPageHeader = () => {
	return (
		<div className='flex flex-col justify-between gap-4'>
			<span className='text-font-white text-4xl font-semibold'>Friends</span>
			<label className='input  bg-input-search-gray flex items-center gap-2'>
				<IoSearch
					className='text-font-text-gray'
					size={30}
				/>
				<input
					type='text'
					className='grow font-normal'
					placeholder='Search'
				/>
			</label>
		</div>
	);
};

const FriendsPageBody = () => {
	return <div>FriendsPageBody</div>;
};

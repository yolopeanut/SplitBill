import { IoPersonAddSharp } from "react-icons/io5";

export const FriendsPageHeader = () => {
	return (
		<div className='flex flex-col gap-4 h-28'>
			<div className='flex flex-row justify-between items-center'>
				<span className='text-font-white text-3xl font-semibold'>Friends</span>
				<button className='btn border-none p-0'>
					<IoPersonAddSharp
						size={30}
						className='text-brand-orange'
					/>
				</button>
			</div>

			<div className='relative'>
				<input
					type='text'
					id='floating_outlined'
					className='block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-input-search-gray appearance-auto dark:text-white dark:border-input-search-gray dark:focus:border-input-search-gray focus:outline-none focus:ring-0 focus:border-input-search-gray peer'
					placeholder=' '
				/>
				<label
					htmlFor='floating_outlined'
					className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-24 scale-75 top-0 z-10 origin-[0] bg-gray-900 px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[0.4rem] peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 '
				>
					Search Friends
				</label>
			</div>
		</div>
	);
};

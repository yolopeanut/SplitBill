import { DebounceInput } from "react-debounce-input";
import { Dispatch, SetStateAction } from "react";
export const CustomInputField = ({
	setSearchQuery,
}: {
	setSearchQuery: Dispatch<SetStateAction<string>>;
}) => {
	return (
		<div className='relative'>
			<DebounceInput
				element='input'
				debounceTimeout={500}
				className='block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-input-search-gray appearance-auto dark:text-white dark:border-input-search-gray dark:focus:border-input-search-gray focus:outline-none focus:ring-0 focus:border-input-search-gray peer'
				placeholder=' '
				onChange={(e) => {
					setSearchQuery(e.target.value);
				}}
			/>
			<label
				htmlFor='floating_outlined'
				className='absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-[0.4rem] z-10 origin-[0] px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[0.4rem] peer-focus:scale-75 peer-focus:-translate-y-4 start-1 '
			>
				Search Friends
			</label>
		</div>
	);
};

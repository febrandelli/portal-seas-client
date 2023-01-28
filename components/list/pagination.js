import { useEffect, useState } from 'react';

export function Pagination(props) {
	const [pagesArray, setPagesArray] = useState([]);

	useEffect(() => {
		const pages = Array.from({ length: props.pages }, (_, i) => i + 1);
		const selected =
			props.selected !== pages.length ? props.selected : props.selected - 1;
		if (selected > Math.max(...pagesArray)) {
			setPagesArray(pages.slice(selected - 1, selected + 4));
		}
		if (selected < Math.min(...pagesArray)) {
			setPagesArray(pages.slice(selected - 5, selected));
		}
		if (selected === 1) {
			setPagesArray(pages.slice(0, pages.length >= 7 ? 5 : pages.length));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.pages, props.selected]);

	return (
		<div className='px-3 py-3 flex flex-col xs:flex-row items-center xs:justify-between'>
			<div className='flex items-center'>
				<button
					type='button'
					className='w-full p-4 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100'
					onClick={() => props.handleClick(props.selected - 1)}
				>
					<svg
						width='9'
						fill='currentColor'
						height='8'
						className=''
						viewBox='0 0 1792 1792'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path d='M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z' />
					</svg>
				</button>
				{pagesArray.map((e) => (
					<button
						key={e}
						type='button'
						style={
							e === props.selected ? { color: '#6366F1' } : { color: 'black' }
						}
						onClick={() => props.handleClick(e)}
						className='w-full px-4 py-2 border-t border-b text-base bg-white hover:bg-gray-100'
					>
						{e}
					</button>
				))}
				<button
					type='button'
					className='w-full p-4 border text-base rounded-r-xl text-gray-600 bg-white hover:bg-gray-100'
					onClick={() => props.handleClick(props.selected + 1)}
				>
					<svg
						width='9'
						fill='currentColor'
						height='8'
						className=''
						viewBox='0 0 1792 1792'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path d='M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z' />
					</svg>
				</button>
			</div>
		</div>
	);
}

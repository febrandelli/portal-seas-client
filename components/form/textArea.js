export function TextArea(props) {
	return (
		<div className={`col-span-6 ${props.size}`}>
			<label className='block text-sm font-medium text-gray-700'>
				{props.label}
			</label>
			<textarea
				name={props.name}
				type={props.type}
				onChange={props.handleChange}
				required={props.required}
				value={props.value === undefined ? '' : props.value}
				disabled={props.disabled}
				className='block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
			/>
		</div>
	);
}

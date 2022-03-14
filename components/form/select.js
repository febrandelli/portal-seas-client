import Select, { components } from 'react-select';

export function SelectComponent(props) {
	const returnOptionsMulti = (data) => {
		const options = [];
		if (data === 'yesAndNo') {
			return [
				{
					value: 'Sim',
					label: 'Sim',
				},
				{
					value: 'Não',
					label: 'Não',
				},
			];
		}
		if (data && data.status === 200) {
			data.data.map((entry) =>
				options.push({
					value: entry.id,
					label: entry.nomeclatura ? entry.nomeclatura : entry.nome,
				})
			);
			return options;
		}
		return [];
	};

	const NoOptionsMessage = (propsSelect) => {
		return (
			<components.NoOptionsMessage {...propsSelect}>
				<span className='custom-css-class'>
					Não foi possível carregar as opções
				</span>
			</components.NoOptionsMessage>
		);
	};

	const customStyles = {
		control: (base) => ({
			...base,
			'*': {
				boxShadow: 'none !important',
			},
		}),
	};

	const handleValues = () => {
		const values = [];
		if (props.value && !props.isDisabled) {
			if (typeof props.value !== 'string' && typeof props.value !== 'number') {
				props.value.map((entry) => {
					values.push(
						returnOptionsMulti(props.options).find(
							(option) => option.value === entry
						)
					);
				});
			}
			if (!values.length > 0) {
				values.push(
					returnOptionsMulti(props.options).find(
						(option) => option.value === props.value
					)
				);
			}
		}
		return values;
	};

	return (
		<div className={`col-span-6 ${props.size}`}>
			<label className='block text-sm font-medium text-gray-700'>
				{props.label}
			</label>
			<Select
				onChange={props.handleChange}
				options={returnOptionsMulti(props.options)}
				value={handleValues()}
				placeholder={<div className='text-black'>Selecione</div>}
				isSearchable={!!props.isSearchable}
				components={{ NoOptionsMessage }}
				isMulti={!!props.isMulti}
				isDisabled={props.isDisabled}
				styles={customStyles}
				maxMenuHeight={80}
				className='block mt-1 w-full sm:border-red-300 sm:text-sm'
			/>
			<input
				autoComplete='off'
				style={{
					opacity: 0,
					height: '1px',
					position: 'absolute',
				}}
				required={props.required}
				defaultValue={props.value ? props.value : ''}
			/>
		</div>
	);
}

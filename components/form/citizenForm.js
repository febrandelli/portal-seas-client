import { useEffect, useState } from 'react';
import {
	useIncomeSourcesQuery,
	useListBenefitsQuery,
	useListCitiesQuery,
	useListEspecialCasesQuery,
	useListReasonsQuery,
	useListSexQuery,
	useListStatesQuery,
} from '../../providers';
import { useQuery } from 'react-query';
import { verifyValue } from '../../utils';
import { Input } from './input';
import { SelectComponent } from './select';

export function CitizenForm({
	submitFunction,
	buttonText,
	allRequired,
	shouldClearValues,
	editValues,
	clearFunction,
}) {
	const [values, setValues] = useState({});
	const { data: sexData } = useListSexQuery();
	const { data: colorsData } = useQuery('listColors');
	const { data: reasonsData } = useListReasonsQuery();
	const { data: benefitsData } = useListBenefitsQuery();
	const { data: especialCasesData } = useListEspecialCasesQuery();
	const { data: statesData } = useListStatesQuery();
	const { data: citiesData, refetch: fetchCities } = useListCitiesQuery(
		values['state']
	);
	const { data: incomingSourcesData } = useIncomeSourcesQuery();

	useEffect(() => {
		if (!verifyValue(values.state)) {
			fetchCities();
		}
	}, [fetchCities, values.state]);

	const clearValues = () => {
		setValues({});
		clearFunction();
	};

	useEffect(() => {
		if (shouldClearValues) {
			clearValues();
		}
		if (editValues) {
			setValues(editValues);
		}
	}, [shouldClearValues, editValues]);

	const handleChangeInput = (e) => {
		const auxValues = { ...values };
		auxValues[e.target.name] = e.target.value;
		setValues(auxValues);
	};

	const handleChangeSelect = (e, name) => {
		const auxValues = { ...values };
		if (e.length > 0) {
			auxValues[name] = [];
			e.map((val) => {
				auxValues[name].push(val.value);
			});
			auxValues[name] = Array.from(new Set(auxValues[name]));
		} else {
			auxValues[name] = e.value ? e.value : null;
		}
		setValues(auxValues);
	};

	const shouldShowMultiValues = (value, name) => {
		const auxValues = { ...values };
		if (verifyValue(value) && auxValues[name] !== null) {
			auxValues[name] = null;
			setValues(auxValues);
		}
		return auxValues[name];
	};

	return (
		<>
			<div className='md:col-span-3'>
				<form onSubmit={(e) => submitFunction(e, values)}>
					<div className='overflow-hidden mt-4 shadow sm:rounded-md md:mt-0 md:mr-8'>
						<div className='px-4 py-5 bg-white sm:p-6 h-full'>
							<div className='grid grid-cols-6 gap-6'>
								<Input
									name='name'
									label='Nome'
									type='text'
									value={values.name}
									handleChange={handleChangeInput}
									required={allRequired}
									size='col-span-3 md:col-span-3'
								/>
								<Input
									name='lastName'
									label='Sobrenome'
									type='text'
									value={values.lastName}
									required={allRequired}
									handleChange={handleChangeInput}
									size='md:col-span-3'
								/>
								<SelectComponent
									label='Sexo'
									size='sm:col-span-2'
									handleChange={(e) => handleChangeSelect(e, 'sex')}
									options={sexData}
									value={values.sex}
									required={allRequired}
								/>
								<SelectComponent
									label='Cor'
									size='sm:col-span-2'
									handleChange={(e) => handleChangeSelect(e, 'color')}
									options={colorsData}
									value={values.color}
									required={allRequired}
								/>
								<div className='col-span-6 sm:col-span-2'>
									<label className='block text-sm font-medium text-gray-700'>
										Data de nascimento
									</label>
									<input
										name='birthday'
										type='date'
										onChange={handleChangeInput}
										required={allRequired}
										value={values.birthday === undefined ? '' : values.birthday}
										className='block mt-1 w-full rounded-md border-gray-300 shadow-sm cursor-pointer focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
									/>
								</div>
								<SelectComponent
									label='Estado'
									size='lg:col-span-3'
									handleChange={(e) => handleChangeSelect(e, 'state')}
									options={statesData}
									value={values.state}
									isSearchable
									required={allRequired}
								/>
								<SelectComponent
									label='Cidade'
									size='lg:col-span-3'
									isSearchable
									handleChange={(e) => handleChangeSelect(e, 'city')}
									options={citiesData}
									isDisabled={verifyValue(values.state)}
									value={shouldShowMultiValues(values.state, 'city')}
									required={!verifyValue(values.state)}
								/>
								<SelectComponent
									label='Fonte de Renda'
									size='lg:col-span-3'
									handleChange={(e) => handleChangeSelect(e, 'incomingSource')}
									options={incomingSourcesData}
									required={allRequired}
									value={values.incomingSource}
								/>
								<Input
									label='O que precisa para sair das ruas?'
									name='getOutReasons'
									type='text'
									value={values.getOutReasons}
									required={allRequired}
									handleChange={handleChangeInput}
									size='lg:col-span-3'
								/>
								<SelectComponent
									label='Quer sair das ruas?'
									size='sm:col-span-2'
									handleChange={(e) => handleChangeSelect(e, 'getOut')}
									options={'yesAndNo'}
									required={allRequired}
									value={values.getOut}
								/>
								<SelectComponent
									label='Motivos para estar na rua:'
									size='lg:col-span-4'
									handleChange={(e) => handleChangeSelect(e, 'reasons')}
									options={reasonsData}
									isMulti
									required={allRequired}
									value={values.reasons}
								/>
								<SelectComponent
									label='Caso especial?'
									size='sm:col-span-2'
									handleChange={(e) => handleChangeSelect(e, 'isEspecialCase')}
									options={'yesAndNo'}
									required={allRequired}
									value={values.isEspecialCase}
								/>
								<SelectComponent
									label='Se sim, quais casos?'
									size='lg:col-span-4'
									handleChange={(e) => handleChangeSelect(e, 'especialCases')}
									options={especialCasesData}
									isDisabled={verifyValue(values.isEspecialCase)}
									isMulti
									required={
										allRequired === true
											? !verifyValue(values.isEspecialCase)
											: false
									}
									value={shouldShowMultiValues(
										values.isEspecialCase,
										'especialCases'
									)}
								/>
								<SelectComponent
									label='Recebe benefício?'
									size='sm:col-span-2'
									handleChange={(e) => handleChangeSelect(e, 'hasBenefits')}
									options={'yesAndNo'}
									required={allRequired}
									value={values.hasBenefits}
								/>
								<SelectComponent
									label='Se sim, quais benefícios?'
									size='lg:col-span-4'
									handleChange={(e) => handleChangeSelect(e, 'benefits')}
									options={benefitsData}
									isDisabled={verifyValue(values.hasBenefits)}
									isMulti
									required={
										allRequired === true
											? !verifyValue(values.hasBenefits)
											: false
									}
									value={shouldShowMultiValues(values.hasBenefits, 'benefits')}
								/>
							</div>
						</div>
						<div className='px-4 py-3 text-right bg-gray-50 sm:px-6'>
							<button
								type='button'
								onClick={() => clearValues()}
								className='inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-md border border-transparent shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3'
							>
								Limpar
							</button>
							<button
								type='submit'
								className='inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-md border border-transparent shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
							>
								{buttonText ? buttonText : 'Cadastrar'}
							</button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
}

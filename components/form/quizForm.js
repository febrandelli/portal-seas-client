import { useEffect, useState } from 'react';
import {
	useIncomeSourcesQuery,
	useListBenefitsQuery,
	useListCitiesQuery,
	useListColorsQuery,
	useListEspecialCasesQuery,
	useListReasonsQuery,
	useListSexQuery,
	useListStatesQuery,
} from '../../providers';
import { useListDocumentType } from '../../providers/citizenProviders/listDocumentType';
import { useListReasonApproachsQuery } from '../../providers/quizProviders/listReasonApproachsQuery';
import { useListServicesQuery } from '../../providers/quizProviders/listServicesQuery';
import { useListTimeInJundiaiQuery } from '../../providers/quizProviders/listTimeInJundiaiQuery';
import { useListTimeLivingOnTheStreetQuery } from '../../providers/quizProviders/listTimeLivingOnTheStreet';
import { verifyValue } from '../../utils';
import { Input } from './input';
import { TextArea} from './textArea'
import { SelectComponent } from './select';
import { useListCitzensNameQuery } from '../../providers/quizProviders/listCitzensNameQuery';
import { useListModalitiesQuery } from '../../providers/quizProviders/listModalitiesQuery';
import { useListSatisfactionQuery } from '../../providers/quizProviders/listSatisfactionQuery';

export function QuizForm ({
    submitFunction,
    buttonText,
	allRequired,
	shouldClearValues,
	editValues,
	clearFunction,
}) {
	const [values, setValues] = useState({});
	const { data: reasonApproachData } = useListReasonApproachsQuery();
	const { data: timeInJundiaiData } = useListTimeInJundiaiQuery();
	const { data: timeLivingOnTheStreetData } = useListTimeLivingOnTheStreetQuery();
	const { data: servicesData } = useListServicesQuery();
	const { data: modalityData } = useListModalitiesQuery();
	const { data: satisfactionData } = useListSatisfactionQuery();
	const { data: citzensData } = useListCitzensNameQuery();
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
					<div className='mt-4 overflow-hidden shadow sm:rounded-md md:mt-0 md:mr-8'>
						<div className='h-full px-4 py-5 bg-white sm:p-6'>
							<div className='grid grid-cols-6 gap-6'>
								<SelectComponent
									label='Cidadão'
									size='lg:col-span-6'
									isSearchable
									handleChange={(e) => handleChangeSelect(e, 'idCitzen')}
									options={citzensData}
									value={values.idCitzen}
									required={!verifyValue(values.idCitzen)}
								/>
								<Input
									name='place'
									label='Local da Abordagem:'
									type='text'
									value={values.place}
									handleChange={handleChangeInput}
									required={allRequired}
									size='col-span-3 md:col-span-3'
								/>
								<SelectComponent
									label='Motivo abordagem'
									size='sm:col-span-3'
									handleChange={(e) => handleChangeSelect(e, 'reasonApproach')}
									options={reasonApproachData}
									value={values.reasonApproach}
									required={allRequired}
								/>
								<SelectComponent
									label='Estado de Origem'
									size='lg:col-span-3'
									handleChange={(e) => handleChangeSelect(e, 'state')}
									options={statesData}
									value={values.state}
									isSearchable
									required={allRequired}
								/>
								<SelectComponent
									label='Cidade de Origem'
									size='lg:col-span-3'
									isSearchable
									handleChange={(e) => handleChangeSelect(e, 'city')}
									options={citiesData}
									isDisabled={verifyValue(values.state)}
									value={shouldShowMultiValues(values.state, 'city')}
									required={!verifyValue(values.state)}
								/>
								<TextArea
									name='circulationAroundTheCity'
									label='Qual foi a sua circulação por esta cidade:'
									type='text'
									value={values.circulationAroundTheCity}
									required={allRequired}
									handleChange={handleChangeInput}
									size='md:col-span-6'
								/>
								<SelectComponent
									label='Há quanto tempo está em Jundiaí?'
									size='lg:col-span-3'
									handleChange={(e) => handleChangeSelect(e, 'timeInJundiai')}
									options={timeInJundiaiData}
									required={allRequired}
									value={values.timeInJundiai}
								/>
								<SelectComponent
									label='Há quanto tempo vive em situação de rua?'
									size='lg:col-span-3'
									handleChange={(e) => handleChangeSelect(e, 'timeLivingOnTheStreet')}
									options={timeLivingOnTheStreetData}
									required={allRequired}
									value={values.timeLivingOnTheStreet}
								/>
								<TextArea
									name='howSeeYourselfInAndOutStreet'
									label='Descreva como você se vê na rua ? e fora dela ?'
									type='text'
									value={values.howSeeYourselfInAndOutStreet}
									required={allRequired}
									handleChange={handleChangeInput}
									size='md:col-span-6'
								/>
								<TextArea
									name='lifeProject'
									label='Qual seu projeto de vida nas ruas?'
									type='text'
									value={values.lifeProject}
									required={allRequired}
									handleChange={handleChangeInput}
									size='md:col-span-6'
								/>
								<SelectComponent
									label='O que busca no municipio/em nossos serviços?'
									size='lg:col-span-3'
									handleChange={(e) => handleChangeSelect(e, 'services')}
									options={servicesData}
									isMulti
									required={allRequired}
									value={values.services}
								/>
								<SelectComponent
									label='Modalidade'
									size='sm:col-span-3'
									handleChange={(e) => handleChangeSelect(e, 'modality')}
									options={modalityData}
									value={values.modality}
									required={allRequired}
								/>
								<Input
									name='compositeTeam'
									label='Equipe composta por:'
									type='text'
									value={values.compositeTeam}
									handleChange={handleChangeInput}
									required={allRequired}
									size='lg:col-span-6'
								/>
								<Input
									name='peopleApproached'
									label='Pessoas abordadas:'
									type='text'
									value={values.peopleApproached}
									handleChange={handleChangeInput}
									required={allRequired}
									size='lg:col-span-3'
								/>
								<Input
									name='peopleViewed'
									label='Pessoas visualizadas:'
									type='text'
									value={values.peopleViewed}
									handleChange={handleChangeInput}
									required={allRequired}
									size='lg:col-span-3'
								/>
								<TextArea
									name='lifeProject'
									label='Descrição / Relato da abordagem:'
									type='text'
									value={values.lifeProject}
									required={allRequired}
									handleChange={handleChangeInput}
									size='md:col-span-6'
								/>
								<SelectComponent
									label='Nesta ação voce acionou algum outro serviço?'
									size='lg:col-span-3'
									handleChange={(e) => handleChangeSelect(e, 'isanotherService')}
									options={'yesAndNo'}
									required={allRequired}
									value={values.isanotherService}
								/>
								<Input
									name='anotherServices'
									label='Se sim, qual serviço?'
									type='text'
									size='lg:col-span-3'
									handleChange={handleChangeInput}
									disabled={verifyValue(values.isanotherService)}
									value={values.anotherService}
								/>
								<TextArea
									name='orientation'
									label='Orientações:'
									type='text'
									value={values.orientation}
									required={allRequired}
									handleChange={handleChangeInput}
									size='md:col-span-6'
								/>
								<Input
									name='sendTo'
									label='Encaminhado para:'
									type='text'
									value={values.sendTo}
									handleChange={handleChangeInput}
									required={allRequired}
									size='lg:col-span-3'
								/>
								<SelectComponent
									label='Pesquisa de satisfação:'
									size='sm:col-span-3'
									handleChange={(e) => handleChangeSelect(e, 'satisfaction')}
									options={satisfactionData}
									value={values.satisfaction}
									required={allRequired}
								/>
								<TextArea
									name='note'
									label='Observações:'
									type='text'
									value={values.note}
									required={allRequired}
									handleChange={handleChangeInput}
									size='md:col-span-6'
								/>
							</div>
						</div>
						<div className='px-4 py-3 text-right bg-gray-50 sm:px-6'>
							<button
								type='button'
								onClick={() => clearValues()}
								className='inline-flex justify-center px-4 py-2 mr-3 text-sm font-medium text-white bg-gray-700 border border-transparent rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
							>
								Limpar
							</button>
							<button
								type='submit'
								className='inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-gray-700 border border-transparent rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
							>
								{buttonText ? buttonText : 'Cadastrar'}
							</button>
						</div>
					</div>
				</form>
			</div>
		</>);
}
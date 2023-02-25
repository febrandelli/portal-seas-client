import { useListQuizQuery } from '../../../providers/quizProviders/listQuizQuery';
import Head from 'next/head';
import { Alert, Description, Loading, NavBar } from '../../../components';
import { getAge, normalizeString, usePrevious } from '../../../utils';
import { useEffect, useState } from 'react';
import { Pagination } from '../../../components/list/pagination';
import { ListItem } from '../../../components/list/listItem';
import Link from 'next/link';

export default function QuizList() {
	const [quizList, setQuizList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [values] = useState({});
	const prevValues = usePrevious(values);
	const [editValues] = useState({});
	const [alert, setAlert] = useState({ show: false });
	const [pages, setPages] = useState(1);
	const [selectedPage, setSelectedPage] = useState(1);
	const [inputValue, setInputValue] = useState('');
	const { data, isSuccess, refetch } = useListQuizQuery(selectedPage, values);
	// const {refetch: updateQuiz} = useUpdateQuizQuery();

	useEffect(() => {
		if (isSuccess && data.success) {
			setQuizList(data.data.content);
			return setPages(data.data.totalPages);
		}
		setQuizList([]);
		return setPages(1);
	}, [isSuccess, data]);

	useEffect(() => {
		const fetchNewPage = async () => {
			setLoading(true);
			await refetch();
			setLoading(false);
		};
		fetchNewPage();
	}, [refetch, selectedPage]);

	const isEditing = () => {
		return Object.keys(editValues).length > 0;
	};

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			const newFetch = await refetch();
			if (!newFetch.data.success) {
				setAlert({
					show: true,
					label:
						newFetch.data.status === 404
							? 'Nenhum Questionario encontrado.'
							: 'Não foi possível buscar pelos questionarios.',
					type: 'Erro',
				});
			}
			setLoading(false);
		};
		if (prevValues && values !== prevValues) {
			fetchData();
		}
	}, [isEditing, prevValues, refetch, values]);

	const filteredQuizList = (searchValue) => {
		if (data.success) {
			return data.data.content.filter((item) => {
				if (
					normalizeString(item.cidadao.nome).includes(
						normalizeString(searchValue)
					) ||
					normalizeString(item.local).includes(normalizeString(searchValue)) ||
					normalizeString(item.motivoAbordagem).includes(
						normalizeString(searchValue)
					) ||
					normalizeString(
						item.numeroChamado === null || item.numeroChamado === 'null'
							? 'Não Informado'
							: item.numeroChamado
					).includes(normalizeString(searchValue)) ||
					normalizeString(item.responsaveisPreenchimento[0]).includes(
						normalizeString(searchValue)
					) ||
					getAge(item.cidadao.dataNascimento).includes(searchValue)
				) {
					return item;
				}
			});
		}
		return {};
	};

	const handleInput = (e) => {
		setInputValue(e.target.value);
		if (e.target.value !== '') {
			setQuizList(filteredQuizList(e.target.value));
		} else {
			setQuizList(data.data.content);
		}
	};

	const handlePage = (page) => {
		if (page < 1) {
			return setSelectedPage(pages);
		}
		if (page > pages) {
			return setSelectedPage(1);
		}
		setSelectedPage(page);
	};

	return (
		<>
			<NavBar />
			<Loading show={loading} />
			<Alert
				show={alert.show}
				func={() => setAlert({ show: !alert.show })}
				label={alert.label}
				type={alert.type}
			/>
			<Head>
				<title>Gestão de Questionarios</title>
			</Head>
			<div className='justify-center items-center mt-5'>
				<div className='md:grid md:grid-cols-3'>
					<div className='md:col-span-3 mx-3 mb-3'>
						<div className='sm:w-max w-auto lg:w-full h-auto bg-white rounded-lg shadow my-2 justify-center items-center flex'>
							<div>
								<Description
									title='Gestão de Questionarios'
									desc='Procure questionarios e edite registros.'
								/>
							</div>
							<input
								type='text'
								value={inputValue}
								onChange={handleInput}
								className='rounded-lg w-full border-transparent flex-1 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:border-transparent'
								placeholder='Pesquisar'
							/>
						</div>
						<div className='sm:w-full h-max overflow-y-auto justify-center bg-white rounded-lg shadow mt-5'>
							<ul className='divider divide-y h-max'>
								{quizList.map((quiz) => {
									return (
										<li key={quiz.id}>
											<div className='select-none cursor-pointer flex flex-1 p-4'>
												<ListItem
													title={quiz.cidadao.nome}
													subtitle={
														'Idade: ' + getAge(quiz.cidadao.dataNascimento)
													}
												/>
												<ListItem
													title={quiz.local}
													subtitle={
														quiz.motivoAbordagem +
														' - ' +
														(quiz.numeroChamado === null ||
														quiz.numeroChamado === 'null'
															? 'Não Informado'
															: quiz.numeroChamado)
													}
												/>
												<ListItem
													className='sm:hidden'
													title={'Responsavel Preenchimento'}
													subtitle={quiz.responsaveisPreenchimento[0]}
												/>
												<Link
													className='text-right flex justify-end'
													href={'/dashboard/quiz-detail/' + quiz.id}
												>
													<svg
														width='20'
														fill='currentColor'
														height='20'
														className='hover:text-gray-800 text-gray-500'
														viewBox='0 0 1792 1792'
														xmlns='http://www.w3.org/2000/svg'
													>
														<path d='M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z' />
													</svg>
												</Link>
											</div>
										</li>
									);
								})}
							</ul>
						</div>
						<Pagination
							pages={pages}
							handleClick={handlePage}
							selected={selectedPage}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

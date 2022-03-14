import { Alert, Description, Loading, NavBar } from '../../components';
import { UserForm } from '../../components/form';
import Head from 'next/head';
import { Pagination } from '../../components/list/pagination';
import { ListItem } from '../../components/list/listItem';
import { useState, useEffect } from 'react';
import { useListUsersQuery } from '../../providers';
import { normalizeString } from '../../utils';

export default function Users() {
	const [alert, setAlert] = useState({ show: false });
	const [loading] = useState(false);
	// const [values, setValues] = useState({});
	const [isSignUp, setIsSignUp] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [usersData, setUsersData] = useState([]);
	const { data, isSuccess } = useListUsersQuery();

	useEffect(() => {
		if (isSuccess && data.success) {
			setUsersData(data.data);
		}
	}, [data, isSuccess]);

	// const clearValues = () => {
	// 	setValues({});
	// };

	// const handleSubmit = (e, formValues) => {
	// 	e.preventDefault();
	// 	setValues(formValues);
	// };

	const filteredUsersList = (searchValue) => {
		if (data.success) {
			return data.data.filter((user) => {
				if (
					normalizeString(user.email).includes(normalizeString(searchValue)) ||
					normalizeString(user.nomeCompleto).includes(
						normalizeString(searchValue)
					)
				) {
					return user;
				}
			});
		}
		return {};
	};

	const handleInput = (e) => {
		setInputValue(e.target.value);
		setUsersData(filteredUsersList(e.target.value));
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
				<title>Gestão de Usuários</title>
			</Head>

			<div className='justify-center items-center mt-5'>
				<div className='md:grid md:grid-cols-3'>
					<div>
						<Description
							title='Gestão de Usuários'
							desc='Crie, edite, delete e busque usuários'
						/>
						<div className='sm:ml-7 mt-4'>
							<UserForm
								// submitFunction={handleSubmit}
								// clearFunction={clearValues}
								isSignUp={isSignUp}
								allRequired={isSignUp}
								setIsSignUp={() => setIsSignUp(!isSignUp)}
							/>
						</div>
					</div>
					<div className='md:col-span-2 mx-3'>
						<div className='sm:w-max w-auto lg:w-full h-auto bg-white rounded-lg shadow my-2 justify-center items-center flex'>
							<input
								type='text'
								value={inputValue}
								onChange={handleInput}
								className='rounded-lg w-full border-transparent flex-1 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:border-transparent'
								placeholder='Pesquisar'
							/>
						</div>
						<div className='sm:w-full h-max overflow-y-auto justify-center bg-white rounded-lg shadow'>
							<ul className='divider divide-y h-max'>
								{usersData.map((user) => {
									return (
										<li key={1}>
											<div className='select-none cursor-pointer flex flex-1 p-4'>
												<ListItem
													title={user.nomeCompleto}
													subtitle={user.email}
												/>
												<button
													className='text-right flex justify-end'
													// onClick={() => setEditValues(convertValues(citizen))}
												>
													<svg
														xmlns='http://www.w3.org/2000/svg'
														x='0px'
														y='0px'
														width='20'
														fill='currentColor'
														height='20'
														className='hover:text-red-800 text-gray-500'
														viewBox='0 0 50 50'
													>
														<path d='M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z'></path>
													</svg>{' '}
												</button>
											</div>
										</li>
									);
								})}
							</ul>
						</div>
						<Pagination
							pages={12}
							// handleClick={handlePage}
							selected={1}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

import { useState } from 'react';
import { Input } from './input';

export function UserForm({
	submitFunction,
	allRequired,
	clearFunction,
	isSignUp,
	setIsSignUp,
}) {
	const [values, setValues] = useState({});

	const handleChangeInput = (e) => {
		const auxValues = { ...values };
		auxValues[e.target.name] = e.target.value;
		setValues(auxValues);
	};

	const clearValues = () => {
		setValues({});
		clearFunction();
	};
	return (
		<>
			<div className='md:col-span-3'>
				<div className='mb-4 overflow-hidden shadow sm:rounded-md md:mt-0 md:mr-8'>
					<div className='h-full p-3 bg-white'>
						<label className='group text-s font-medium text-gray-700'>
							Cadastrar novo usuário?
							<input
								type='checkbox'
								className='peer hidden left-0'
								onClick={() => setIsSignUp()}
							/>
							<span className='w-12 h-8 flex items-center flex-shrink-0 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-gray-700 after:w-6 after:h-6 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-4 group-hover:after:translate-x-1'></span>
						</label>{' '}
					</div>
				</div>
				<form onSubmit={(e) => submitFunction(e, values)}>
					<div className='mt-4 overflow-hidden shadow sm:rounded-md md:mt-0 md:mr-8'>
						<div className='h-full px-4 py-5 bg-white sm:p-6'>
							<div className='grid grid-cols-6 gap-6'>
								<Input
									name='name'
									label='Nome Completo'
									type='text'
									value={values.name}
									handleChange={handleChangeInput}
									required={allRequired}
									size='col-span-3 md:col-span-6'
								/>
								<Input
									name='email'
									label='Email'
									type='email'
									value={values.email}
									handleChange={handleChangeInput}
									required={allRequired}
									size='col-span-3 md:col-span-6'
								/>
								{isSignUp && (
									<>
										<Input
											name='password'
											label='Senha'
											type='password'
											value={values.password}
											handleChange={handleChangeInput}
											required={allRequired}
											size='col-span-3 md:col-span-6'
										/>
										<Input
											name='passwordVerify'
											label='Digite a senha novamente'
											type='password'
											value={values.passwordVerify}
											handleChange={handleChangeInput}
											required={allRequired}
											size='col-span-3 md:col-span-6'
										/>
										{values.password &&
											values.passwordVerify &&
											values.password !== values.passwordVerify && (
												<p className='col-span-2 md:col-span-2 text-xs font-medium text-red-500'>
													Senhas não conferem
												</p>
											)}
									</>
								)}
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
								{isSignUp ? 'Cadastrar' : 'Buscar'}
							</button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
}

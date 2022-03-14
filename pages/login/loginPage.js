//Libs
import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

//Aux
import { SetToken } from '../../utils';

//Components
import { Alert, Loading } from '../../components';

//Providers
import { useLogin } from '../../providers';

export default function LoginPage() {
	const [state, setState] = useState({ password: '', email: '' });
	const [alert, setAlert] = useState(false);
	const [loading, setLoading] = useState(false);
	const { refetch } = useLogin(state.email, state.password);
	const router = useRouter();

	const handleChange = (event) => {
		const { name, value } = event.target;
		setState({
			...state,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		await e.preventDefault();
		setLoading(true);
		const newFetch = await refetch();
		if (newFetch.isSuccess && newFetch.data.success) {
			SetToken(newFetch.data.data.token);
			await router.push('/dashboard');
		} else {
			setAlert(true);
		}
		setLoading(false);
	};

	return (
		<>
			<Loading show={loading} />
			<Alert
				show={alert}
				func={() => setAlert(!alert)}
				label='Email e/ou senha inválido(s).'
				type={'Erro'}
			/>
			<Head>
				<title>Login Portal-Seas</title>
			</Head>
			<div className='h-screen bg-gray-50'>
				<div className='flex justify-center items-center p-8'>
					<Image
						className='object-contain object-center mr-10'
						src='/assets/assistencia_social.png'
						alt='SEAS'
						width='300px'
						height='220px'
					/>
				</div>
				<div className='flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8'>
					<div className='space-y-8 w-full max-w-md'>
						<div>
							<h2 className='mt-6 text-4xl font-extrabold text-center text-gray-900'>
								Login
							</h2>
						</div>
						<form className='mt-8 space-y-6' onSubmit={handleSubmit}>
							<div className='-space-y-px rounded-md shadow-sm'>
								<div>
									<label className='sr-only'>Email</label>
									<input
										name='email'
										type='text'
										id='email'
										required
										value={state.email}
										onChange={handleChange}
										className='block relative py-2 px-3 w-full placeholder-gray-500 text-gray-900 rounded-none rounded-t-md border border-gray-300 appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-md'
										placeholder='Email'
									/>
								</div>
								<div>
									<label className='sr-only'>Senha</label>
									<input
										id='password'
										name='password'
										type='password'
										value={state.password}
										onChange={handleChange}
										required
										className='block relative py-2 px-3 w-full placeholder-gray-500 text-gray-900 rounded-none rounded-b-md border border-gray-300 appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-md'
										placeholder='Senha'
									/>
								</div>
							</div>

							<div className='flex justify-between items-center'>
								<div className='text-sm'>
									<Link href='/login/forgotPassword'>
										<a className='font-medium text-blue-600 hover:text-blue-500'>
											Esqueceu sua senha?
										</a>
									</Link>
								</div>
							</div>

							<div>
								<button className='flex relative justify-center py-2 px-4 w-full font-medium text-white bg-blue-600 rounded-md border border-transparent group text-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
									Entrar
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

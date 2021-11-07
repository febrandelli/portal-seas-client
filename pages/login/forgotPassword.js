import Link from 'next/link';
import { useState } from 'react';
import { Alert } from '../../components';

export default function ForgotPassword() {
	const [email, setEmail] = useState();
	const [alert, setAlert] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		setAlert(true);
	};

	const handleShow = () => {
		setAlert(!alert);
	};

	return (
		<>
			<Alert
				show={alert}
				func={handleShow}
				label='Uma nova senha foi enviada ao seu email.'
				color='blue'
			/>
			<div className='flex justify-center items-center h-screen bg-gray-50'>
				<div className='flex justify-center items-center'>
					<div className='flex w-screen'>
						<div className='hidden mx-12 w-full h-auto bg-no-repeat rounded-lg 2xl:bg-seas-lg bg-seas-sm lg:block' />
						<div className='p-12 w-full bg-gray-50'>
							<h3 className='pt-4 mb-2 text-2xl'>Esqueceu sua senha?</h3>
							<p className='text-sm text-gray-700'>
								Insira seu email que enviaremos uma nova senha.
							</p>
							<form
								onSubmit={handleSubmit}
								className='pt-6 pb-8 mb-4 rounded bg-grey-50'
							>
								<div className='mb-4'>
									<label className='block mb-2 text-sm font-bold text-gray-700'>
										Email
									</label>
									<input
										className='py-2 px-3 w-full text-sm leading-tight text-gray-700 rounded border shadow appearance-none focus:outline-none focus:shadow-outline'
										id='email'
										type='email'
										required
										placeholder='Digite seu email'
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
								<div className='mb-6 text-center'>
									<button
										className='py-2 px-4 w-full font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline'
										type='submit'
									>
										Resetar a senha
									</button>
								</div>
								<hr className='mb-6 border-t' />
								<div className='text-center'>
									<Link href='/'>
										<a className='inline-block text-sm text-blue-500 align-baseline hover:text-blue-800'>
											Lembrou sua senha? Clique para logar
										</a>
									</Link>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

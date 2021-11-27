import { Alert, Description, Loading, NavBar } from '../../components';
import { UserForm } from '../../components/form';
import Head from 'next/head';
import { useState } from 'react';

export default function Users() {
	const [alert, setAlert] = useState({ show: false });
	const [loading] = useState(false);
	const [values, setValues] = useState({});
	const [isSignUp, setIsSignUp] = useState(false);

	const clearValues = () => {
		setValues({});
		values;
	};

	const handleSubmit = (e, formValues) => {
		e.preventDefault();
		setValues(formValues);
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

			<div className='md:grid md:grid-cols-3'>
				<div>
					<Description
						title='Gestão de Usuários'
						desc='Crie, edite, delete e busque usuários'
					/>
					<div className='sm:ml-7 mt-4'>
						<UserForm
							submitFunction={handleSubmit}
							clearFunction={clearValues}
							isSignUp={isSignUp}
							allRequired={isSignUp}
							setIsSignUp={() => setIsSignUp(!isSignUp)}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

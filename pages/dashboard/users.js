import { Alert, Description, Loading, NavBar } from '../../components';
import Head from 'next/head';
import { useState } from 'react';

export default function Users() {
	const [alert, setAlert] = useState({ show: false });
	const [loading] = useState(false);
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
				</div>
			</div>
		</>
	);
}

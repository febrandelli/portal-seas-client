import { useEffect, useState } from 'react';

import { Alert, Description, Loading, NavBar } from '../../components';
import Head from 'next/head';
import { QuizForm } from '../../components/form/quizForm';
import { useCreateQuizQuery } from '../../providers/quizProviders/createQuizQuery';

function Quiz() {
	const [values, setValues] = useState({});
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState({ show: false });
	const [clear, setClear] = useState(false);

	const { refetch: createRefetch } = useCreateQuizQuery(values);

	useEffect(() => {
		const fetchData = async () => {
			const newFetch = await createRefetch();
			if (
				(newFetch.data.status === 200 || newFetch.data.status === 201) &&
				newFetch.isSuccess
			) {
				setAlert({
					show: true,
					type: 'Sucesso',
					label: 'Cadastro realizado com sucesso.',
				});
				setClear(true);
			} else {
				setAlert({
					show: true,
					label: 'Não foi possível realizar o cadastro.',
					type: 'Erro',
				});
			}
			setLoading(false);
			setClear(false);
		};

		if (values.idCitzen) {
			fetchData();
		}
	}, [createRefetch, values]);

	const handleSubmit = async (e, formValues) => {
		await e.preventDefault();
		setLoading(true);
		setValues(formValues);
	};

	const clearValues = () => {
		setValues({});
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
				<title>Questionario</title>
			</Head>
			<div className='justify-center items-center mt-10'>
				<div className='md:grid md:grid-cols-4 md:gap-6'>
					<Description title='Formulario de Abordagem' desc='Equipe SEAS.' />
					<QuizForm
						submitFunction={handleSubmit}
						allRequired={false}
						shouldClearValues={clear}
						clearFunction={clearValues}
					/>
				</div>
			</div>
		</>
	);
}

export default Quiz;

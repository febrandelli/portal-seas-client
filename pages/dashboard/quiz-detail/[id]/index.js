import { Alert, Description, Loading, NavBar } from '../../../../components';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { QuizConvertValues } from '../../../../utils';
import { QuizForm } from '../../../../components/form/quizForm';
import { useRouter } from 'next/router';
import { useGetQuizQuery } from '../../../../providers/quizProviders/getQuizQuery';

export default function Index() {
	const router = useRouter();
	const { id } = router.query;

	const [alert, setAlert] = useState({ show: false });
	const [loading] = useState(false);
	const [values, setValues] = useState({});
	const [quiz, setQuiz] = useState({});
	const { data, isSuccess, refetch: createRefetch } = useGetQuizQuery(values);
	const isEditing = () => {
		let isEditing = true
		if (!id) {
			isEditing = false;
		}
		return isEditing;
	}

	useEffect(() => {
		if (!id) {
			return;
		}
		setValues({ id: id });
		const fetchData = async () => {
			const newFetch = await createRefetch();
			if (newFetch.isSuccess && newFetch.data.success) {
				setQuiz(QuizConvertValues(data.data));
			}
		};

		fetchData();
	}, [data, isSuccess, id]);

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
				<div className='md:grid md:grid-cols-1'>
					<div>
						<Description title='Edição Questionario' />
						<div className='sm:ml-7 mt-4'>
							<QuizForm
								editValues={quiz}
								// submitFunction={}
								// clearFunction={clearValues}
								buttonText={isEditing() ? 'Atualizar' : 'Salvar'}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

import Head from "next/head";
import { useState } from "react";
import { Alert, Description, Loading, NavBar } from "../../components";
import { QuizForm } from "../../components/form/quizForm";

function Quiz() {

    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ show: false });
    const [clear, setClear] = useState(false);

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
            <Description
                title='Formulario de Abordagem'
                desc='Equipe SEAS.'
            />
            <QuizForm
                submitFunction={handleSubmit}
                allRequired={true}
                shouldClearValues={clear}
                clearFunction={clearValues}
            />
        </div>
    </div>
        </>
    )
}

export default Quiz;
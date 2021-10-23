import { useEffect, useRef } from 'react';

export const verifyValue = (value) => {
	return [
		null,
		undefined,
		'Selecione',
		'Não',
		'NÃO FOI POSSÍVEL CARREGAR AS OPÇÕES',
		'',
	].includes(value);
};

const getIdsOnly = (array) => {
	const newArray = [];
	array.forEach((e) => newArray.push(e.id));
	return newArray;
};

const handleDates = (date) => {
	if (!verifyValue(date) && Array.isArray(date)) {
		return new Date(date[0], date[1] - 1, date[2]).toISOString().split('T')[0];
	}
	return date;
};

const handleGetOut = (getOut) => {
	if (getOut !== undefined) {
		return getOut === 'Sim';
	}
	return getOut;
};

export const convertValues = (values, send) => {
	if (send) {
		return {
			id: values.id,
			beneficios: values.benefits,
			casosEspeciais: values.especialCases,
			cidadeNascimento: values.city,
			cor: values.color,
			dataNascimento: handleDates(values.birthday),
			fonteDeRenda: values.incomingSource,
			motivos: values.reasons,
			nome: values.name,
			precisaParaSairRua: values.getOutReasons,
			querSairDasRuas: handleGetOut(values.getOut),
			sexo: values.sex,
		};
	}
	return {
		id: values.id,
		benefits: getIdsOnly(values.beneficios),
		especialCases: getIdsOnly(values.casosEspeciais),
		city: values.cidadeNascimento.id,
		name: values.nome,
		sex: values.sexo.id,
		color: values.cor.id,
		birthday: handleDates(values.dataNascimento),
		state: values.cidadeNascimento.estado.id,
		incomingSource: values.fonteDeRenda.id,
		getOutReasons: values.precisaParaSairRua,
		getOut: values.querSairDasRuas ? 'Sim' : 'Não',
		reasons: getIdsOnly(values.motivos),
		isEspecialCase: values.casosEspeciais.length > 0 ? 'Sim' : 'Não',
		hasBenefits: values.beneficios.length > 0 ? 'Sim' : 'Não',
	};
};

export function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}

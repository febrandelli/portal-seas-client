import { verifyValue } from './fluentValidator';

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
			nomePai: values.nameFather,
			nomeMae: values.nameMother,
			tipoDocumento: values.documentType,
			numeroDocumento: values.numberDocument,
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
		name: values.nome.split(' ')[0],
		lastName: values.nome.split(' ').slice(1).toString().replaceAll(',', ' '),
		nameFather: values.nomePai,
		nameMother: values.nomeMae,
		documentType: values.tipoDocuemnto,
		numberDocument: values.numeroDocuemnto,
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

export const getAge = (year) => {
	const today = new Date();
	const birthDate = new Date(...year);
	const yearsDifference = today.getFullYear() - birthDate.getFullYear();
	if (
		(today.getMonth() < birthDate.getMonth() ||
			(today.getMonth() === birthDate.getMonth() &&
				today.getDate() < birthDate.getDate())) &&
		yearsDifference >= 1
	) {
		return (yearsDifference - 1).toString();
	}
	return yearsDifference.toString();
};

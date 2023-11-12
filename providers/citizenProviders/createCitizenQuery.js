import { Requests } from '../../utils';
import { useQuery } from 'react-query';

export function useCreateCitizenQuery(values) {
	function returnArray(list) {
		const array = [];
		list.map((value) => {
			array.push({
				id: value,
			});
		});
		return array;
	}
	const createCitizen = async () => {
		return Requests({
			url: 'cidadao',
			type: 'post',
			body: {
				beneficios: values.benefits ? returnArray(values.benefits) : [],
				casosEspeciais: values.especialCases
					? returnArray(values.especialCases)
					: [],
				cidadeNascimento: {
					id: parseInt(values.city),
				},
				cor: {
					id: parseInt(values.color),
				},
				dataNascimento: values.birthday,
				fonteDeRenda: {
					id: values.incomingSource,
				},
				motivos: values.reasons ? returnArray(values.reasons) : [],
				nome: values.name + ' ' + values.lastName,
				nomePai: values.nameFather,
				nomeMae: values.nameMother,
				tipoDocumento: values.documentType,
				numeroDocumento: values.numberDocument,
				precisaParaSairRua: values.getOutReasons,
				querSairDasRuas: values.getOut === 'true',
				sexo: {
					id: parseInt(values.sex),
				},
			},
		});
	};

	return useQuery('createCitizen', createCitizen, {
		enabled: false,
	});
}

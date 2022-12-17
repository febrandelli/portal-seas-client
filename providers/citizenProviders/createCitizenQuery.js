import { Requests } from '../../utils';
import { useQuery } from 'react-query';

export function useCreateCitizenQuery(values) {
	const createCitizen = async () => {
		return Requests({
			url: 'cidadao',
			type: 'post',
			body: {
				beneficios: values.benefits ? values.benefits : [],
				casosEspeciais: values.especialCases ? values.especialCases : [],
				cidadeNascimento: parseInt(values.city),
				cor: parseInt(values.color),
				dataNascimento: values.birthday,
				fonteDeRenda: values.incomingSource,
				motivos: values.reasons,
				nome: values.name + ' ' + values.lastName,
				nomePai: values.nameFather,
				nomeMae: values.nameMother,
				tipoDocumento: values.documentType,
				numeroDocumento: values.numberDocument,
				precisaParaSairRua: values.getOutReasons,
				querSairDasRuas: values.getOut === 'true',
				sexo: parseInt(values.sex),
			},
		});
	};
	return useQuery('createCitizen', createCitizen, {
		enabled: false,
	});
}

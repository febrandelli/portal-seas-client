import { Requests } from '../../utils';
import { useQuery } from 'react-query';

export function useCreateQuizQuery(values) {
	function returnArray(list) {
		const array = [];
		list.map((value) => {
			array.push({
				id: value,
			});
		});
		return array;
	}
	const createQuiz = async () => {
		return Requests({
			url: 'questionario',
			type: 'post',
			body: {
				cidadao: {
					id: values.idCitzen,
				},
				cidadeOrigem: {
					id: values.city,
				},
				local: values.place,
				motivoAbordagem: values.reasonApproach,
				numeroChamado: values.reasonApproachNumber,
				circulacaoPelaCidade: values.circulationAroundTheCity,
				tempoJundiai: values.timeInJundiai,
				tempoSituacaoRua: values.timeLivingOnTheStreet,
				comoSeVeNaRuaEFora: values.howSeeYourselfInAndOutStreet,
				projetoDeVida: values.lifeProject,
				servicoBuscaJundiai: values.services
					? returnArray(values.services)
					: [],
				combinados: 'Precisa implementar',
				equipeComposta: values.compositeTeam,
				qtPessoasAbordadas: values.peopleApproached,
				qtPessoasVisualizadas: values.peopleViewed,
				relatoAbordagem: values.describe,
				servicoAcionado: values.anotherService,
				orientacao: values.orientation,
				encaminhamento: values.sendTo,
				satisfaction: values.satisfaction,
				observacao: values.note,
				responsaveisPreenchimento: ['Felipe Brandelli'],
			},
		});
	};
	return useQuery('createQuiz', createQuiz, {
		enabled: false,
	});
}

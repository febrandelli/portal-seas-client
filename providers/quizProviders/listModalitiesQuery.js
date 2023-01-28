import { Requests } from '../../utils';
import { useQuery } from 'react-query';

export function useListModalitiesQuery() {
	const listModality = async () => {
		return Requests({
			url: 'search/modality',
			type: 'get',
		});
	};
	return useQuery('listModality', listModality, {
		refetchOnWindowFocus: false,
	});
}

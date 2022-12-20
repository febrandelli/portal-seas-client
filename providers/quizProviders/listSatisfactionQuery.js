import { Requests } from '../../utils';
import { useQuery } from 'react-query';

export function useListSatisfactionQuery() {
	const listSatisfaction = async () => {
		return Requests({
			url: 'search/satisfaction',
			type: 'get',
		});
	};
	return useQuery('listSatisfaction', listSatisfaction, {
		refetchOnWindowFocus: false,
	});
}

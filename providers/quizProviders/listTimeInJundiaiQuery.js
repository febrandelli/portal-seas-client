import { Requests } from '../../utils';
import { useQuery } from 'react-query';

export function useListTimeInJundiaiQuery() {
	const listTimeInJundiai = async () => {
		return Requests({
			url: 'search/timeInJundiai',
			type: 'get',
		});
	};
	return useQuery('listTimeInJundiai', listTimeInJundiai, {
		refetchOnWindowFocus: false,
	});
}

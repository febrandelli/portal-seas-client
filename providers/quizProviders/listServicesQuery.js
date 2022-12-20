import { Requests } from '../../utils';
import { useQuery } from 'react-query';

export function useListServicesQuery() {
	const listServices = async () => {
		return Requests({
			url: 'search/services',
			type: 'get',
		});
	};
	return useQuery('listServices', listServices, {
		refetchOnWindowFocus: false,
	});
}

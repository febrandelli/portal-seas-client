import { Requests } from '../../utils';
import { useQuery } from 'react-query';

export function useListReasonApproachsQuery() {
	const listReasonApproachs = async () => {
		return Requests({
			url: 'search/reasonApproaches',
			type: 'get',
		});
	};
	return useQuery('listReasonApproachs', listReasonApproachs, {
		refetchOnWindowFocus: false,
	});
}

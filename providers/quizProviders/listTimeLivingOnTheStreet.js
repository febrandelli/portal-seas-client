import { Requests } from '../../utils';
import { useQuery } from 'react-query';

export function useListTimeLivingOnTheStreetQuery() {
	const listLivingOnTheStreetJundiai = async () => {
		return Requests({
			url: 'search/timeLivingOnTheStreet',
			type: 'get',
		});
	};
	return useQuery('listLivingOnTheStreetJundiai', listLivingOnTheStreetJundiai, {
		refetchOnWindowFocus: false,
	});
}

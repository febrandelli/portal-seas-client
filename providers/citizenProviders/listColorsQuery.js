import { Requests } from '../../utils';
import { useQuery } from 'react-query';

export function useListColorsQuery() {
	const listColors = async () => {
		return Requests({
			url: 'cor',
			type: 'get',
		});
	};
	return useQuery('listColors', listColors, {
		refetchOnWindowFocus: false,
	});
}

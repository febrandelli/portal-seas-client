import { Requests } from '../../utils';
import { useQuery } from 'react-query';

export function useListSexQuery() {
	const listSex = async () => {
		return Requests({
			url: 'sexo',
			type: 'get',
		});
	};
	return useQuery('listSex', listSex, {
		refetchOnWindowFocus: false,
	});
}

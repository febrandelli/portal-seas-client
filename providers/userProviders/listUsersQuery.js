import { useQuery } from 'react-query';
import { Requests } from '../../utils';

export function useListUsersQuery() {
	const listUsers = async () => {
		return Requests({
			url: 'usuario',
			type: 'get',
		});
	};
	return useQuery('listUsers', listUsers, {
		refetchOnWindowFocus: false,
	});
}

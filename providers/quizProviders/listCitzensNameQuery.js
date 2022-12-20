import { Requests } from '../../utils';
import { useQuery } from 'react-query';

export function useListCitzensNameQuery() {
	const listCitzensName = async () => {
		return Requests({
			url: 'search/cidadaos',
			type: 'get',
		});
	};
	return useQuery('listCitzensName', listCitzensName, {
		refetchOnWindowFocus: false,
	});
}

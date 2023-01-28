import { convertValues, Requests } from '../../utils';
import { useQuery } from 'react-query';

export function useListCitizensQuery(page, values) {
	if (page === 1) {
		page = 0;
	} else {
		page = page - 1;
	}
	values = convertValues(values, true);
	delete values.id;
	const listCitizens = async () => {
		return Requests({
			url: 'cidadao',
			type: 'get',
			params: {
				...values,
				page: page,
			},
		});
	};
	return useQuery(['listCitizens', page], listCitizens, {
		refetchOnWindowFocus: false,
	});
}

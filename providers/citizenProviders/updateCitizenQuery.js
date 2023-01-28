import { convertValues, Requests } from '../../utils';
import { useQuery } from 'react-query';

export function useUpdateCitizenQuery(values) {
	values = convertValues(values, true);
	const updateCitizen = async () => {
		return Requests({
			url: 'cidadao/' + values.id,
			type: 'put',
			body: values,
		});
	};
	return useQuery('updateCitizen', updateCitizen, {
		enabled: false,
	});
}

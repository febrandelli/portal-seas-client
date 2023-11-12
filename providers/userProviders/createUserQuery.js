import { Requests } from '../../utils';
import { useQuery } from 'react-query';

export function useCreateUserQuery(values) {
	const createUser = async () => {
		return Requests({
			url: 'usuario',
			type: 'post',
			body: values

		});
	};
	return useQuery('createUser', createUser, {
		enabled: false,
	});
}

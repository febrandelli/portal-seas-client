import { Requests } from '../../utils';
import { useQuery } from 'react-query';

export function useGetQuizQuery(values) {
	const quiz = async () => {
		return Requests({
			url: `questionario/${values.id}`,
			type: 'get',
		});
	};

	return useQuery(['quiz'], quiz, {
		refetchOnWindowFocus: false,
	});
}

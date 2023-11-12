import { QuizConvertValues, Requests } from '../../utils';
import { useQuery } from 'react-query';

export function useListQuizQuery(page, values) {
	if (page === 1) {
		page = 0;
	} else {
		page = page - 1;
	}
	values = QuizConvertValues(values, true);
	const listQuiz = async () => {
		return Requests({
			url: 'questionario',
			type: 'get',
			params: {
				...values,
				page: page,
			},
		});
	};
	return useQuery(['listQuiz', page], listQuiz, {
		refetchOnWindowFocus: false,
	});
}

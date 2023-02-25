import { QuizConvertValues, Requests } from '../../utils';
import { useQuery } from 'react-query';

export function useUpdateQuizQuery(values) {
	values = QuizConvertValues(values, true);
	const updateQuiz = async () => {
		return Requests({
			url: 'questionario/' + values.id,
			type: 'put',
			body: values,
		});
	};
	return useQuery('updateQuiz', updateQuiz, {
		enabled: false,
	});
}

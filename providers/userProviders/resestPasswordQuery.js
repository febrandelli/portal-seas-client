import { useQuery } from 'react-query';
import { Requests } from '../../utils';

export function useResetPassword(email) {
	const resetPassword = async () => {
		return Requests({
			url: 'usuario/resetpassword',
			body: { email: email },
			type: 'post',
		});
	};
	return useQuery('resetPassword', resetPassword, {
		enabled: false,
	});
}

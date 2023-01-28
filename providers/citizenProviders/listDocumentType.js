import { Requests } from '../../utils';
import { useQuery } from 'react-query';

export function useListDocumentType() {
	const listDocumentType = async () => {
		return Requests({
			url: 'documentType',
			type: 'get',
		});
	};
	return useQuery('listDocumentType', listDocumentType, {
		refetchOnWindowFocus: false,
	});
}

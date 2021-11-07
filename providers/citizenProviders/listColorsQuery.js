import { Requests } from '../../utils';
import { useQuery } from 'react-query';

const listColors = async () => {
	return Requests({
		url: 'cor',
		type: 'get',
	});
};

export async function getStaticProps() {
	const request = await listColors.data;
	return { props: { request }, revalidate: 60 };
}

export function UseListColorsQuery(props) {
	return useQuery('listColors', listColors, {
		refetchOnWindowFocus: false,
		initialData: props.request,
	});
}

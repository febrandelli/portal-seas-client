import { Requests } from '../../utils';
import { useQuery } from 'react-query';

const listColors = async () => {
	return Requests({
		url: 'cor',
		type: 'get',
	});
};

export async function getStaticProps() {
	console.log("StaticProps");
	const colors = listColors()
	return { props: { colors } }
}

export function useListColorsQuery(props) {
	return useQuery('listColors', listColors, {
		refetchOnWindowFocus: false,
		initialData: props.colors,
	});
}

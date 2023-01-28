export const verifyValue = (value) => {
	return [
		null,
		undefined,
		'Selecione',
		'Não',
		'NÃO FOI POSSÍVEL CARREGAR AS OPÇÕES',
		'',
	].includes(value);
};

export const normalizeString = (str) => {
	return str
		.toString()
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/ /g, '');
};

import { GetCookie } from './auth';

export function initFetchConfig() {
	const token = GetCookie(process.env.NEXT_PUBLIC_TOKEN).tokenValue;
	let init = {
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
		},
	};
	if (token) {
		init = {
			...init,
			headers: {
				Authorization: token,
				...init.headers,
			},
		};
	}
	return init;
}

export async function Requests(options) {
	try {
		const url = new URL(process.env.NEXT_PUBLIC_API_URL + options.url);
		let init = initFetchConfig();
		init = {
			...init,
			method: options.type,
		};
		if (options.body) {
			init = {
				...init,
				body: JSON.stringify(options.body),
			};
		}
		if (options.params) {
			const searchParams = Object.fromEntries(
				Object.entries(options.params).filter(
					// eslint-disable-next-line no-unused-vars
					([_, v]) => v !== null && v !== undefined
				)
			);
			const params = new URLSearchParams(searchParams);
			const arrayInParams = Object.keys(searchParams).filter((i) =>
				Array.isArray(searchParams[i])
			);
			if (arrayInParams) {
				arrayInParams.forEach((el) => {
					params.delete(el);
					searchParams[el].forEach((element) => params.append(el, element));
				});
			}
			url.search = params.toString();
		}
		const res = await fetch(url.toString(), init);
		const resText = await res.text();
		return {
			data: resText ? JSON.parse(resText) : {},
			success: res.ok,
			status: res.status,
		};
	} catch (err) {
		if (err.response) {
			return err.response;
		}
		return err;
	}
}

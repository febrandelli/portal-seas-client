import Router from 'next/router';

export function SetToken(tokenValue) {
	document.cookie = `${process.env.NEXT_PUBLIC_TOKEN}=Bearer ${tokenValue};path=/;max-age=43200;Secure`;
}

export function LogOut() {
	document.cookie = `${process.env.NEXT_PUBLIC_TOKEN}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;max-age=0`;
	Router.push('/login/loginPage');
}

export function GetCookie(name) {
	if (typeof window !== 'undefined') {
		const allCookies = document.cookie;
		if (allCookies) {
			const existsToken = document.cookie
				.split('; ')
				.find((row) => row.startsWith(name));
			if (existsToken) {
				const tokenValue = document.cookie
					.split('; ')
					.find((row) => row.startsWith(name))
					.split('=')[1];
				return { allCookies, existsToken, tokenValue };
			}
		}
	}
	return {};
}

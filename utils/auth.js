//Libs
import { useEffect, useState } from 'react';
import Router from 'next/router';

//Providers
import { useListSexQuery } from '../providers';

//Components
import { Loading, NavBar } from '../components';
import LoginPage from '../pages/login/loginPage';

export function SetToken(tokenValue) {
	document.cookie = `${process.env.NEXT_PUBLIC_TOKEN}=Bearer ${tokenValue};Secure`;
}

export function LogOut() {
	document.cookie = `${process.env.NEXT_PUBLIC_TOKEN}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
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

export function withAuth(Component) {
	// eslint-disable-next-line react/display-name
	return (pageProps) => {
		const [isLoggedIn, setLoginStatus] = useState(false);
		const { refetch } = useListSexQuery();
		const [loading, setLoading] = useState(true);

		async function verify() {
			if (typeof window !== 'undefined') {
				const newFetch = await refetch();
				await setLoading(newFetch.isLoading);
				if (
					GetCookie(process.env.NEXT_PUBLIC_TOKEN).tokenValue &&
					newFetch.isSuccess &&
					newFetch.data.success
				) {
					await setLoginStatus(true);
				} else {
					await Router.push('/');
				}
			}
		}

		useEffect(() => {
			verify();
		}, []);

		if (isLoggedIn) {
			return (
				<>
					<NavBar />
					<Component {...pageProps} />
				</>
			);
		}

		if (loading) {
			return <Loading show={true} />;
		}

		return <LoginPage />;
	};
}

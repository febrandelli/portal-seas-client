import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

import { LogOut } from '../utils';

const navigation = [
	{ name: 'Cadastro de Cidadão', href: '/dashboard', index: true },
	{ name: 'Cidadãos', href: '/dashboard/registries' },
	{ name: 'Usuários', href: '/dashboard/users' },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export function NavBar() {
	const router = useRouter();
	const checkRoute = (item) => {
		if (item === '/dashboard') {
			return router.asPath.endsWith(item) || router.asPath.endsWith('/');
		}
		return router.asPath.endsWith(item);
	};

	const backToIndex = async () => {
		await router.push('/dashboard');
	};

	return (
		<Disclosure as='nav' className='bg-gray-800'>
			{({ open }) => (
				<>
					<div className='px-2 mx-auto max-w sm:px-6 lg:px-8'>
						<div className='flex relative justify-between items-center h-16'>
							<div className='flex absolute inset-y-0 left-0 items-center sm:hidden'>
								<Disclosure.Button className='inline-flex justify-center items-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
									{open ? (
										<XIcon className='block w-6 h-6' aria-hidden='true' />
									) : (
										<MenuIcon className='block w-6 h-6' aria-hidden='true' />
									)}
								</Disclosure.Button>
							</div>
							<div className='flex flex-1 justify-center items-center sm:items-stretch sm:justify-start'>
								<div
									className='flex flex-shrink-0 justify-center items-center cursor-pointer'
									onClick={backToIndex}
								>
									<Image
										src='/assets/navbar-test.png'
										width='50px'
										height='48px'
										alt='Workflow'
									/>
								</div>
								<div className='hidden sm:block sm:ml-6'>
									<div className='flex space-x-4'>
										{navigation.map((item) => (
											<Link href={item.href} key={item.href}>
												<a
													key={item.name}
													className={classNames(
														checkRoute(item.href)
															? 'bg-gray-900 text-white'
															: 'text-gray-300 hover:bg-gray-700 hover:text-white',
														'px-2 py-3 rounded-md text-sm font-medium'
													)}
													aria-current={item.current ? 'page' : undefined}
												>
													{item.name}
												</a>
											</Link>
										))}
									</div>
								</div>
							</div>
							<div className='flex absolute inset-y-0 right-0 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
								<Menu as='div' className='relative ml-3'>
									{({ showMenu }) => (
										<>
											<div>
												<Menu.Button className='flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
													<Image
														className='w-8 h-8 rounded-full'
														src='https://avatars.dicebear.com/api/initials/felipe_brandelli.svg'
														alt='imagem do usuário'
														width='30px'
														height='30px'
													/>
												</Menu.Button>
											</div>
											<Transition
												show={showMenu}
												as={Fragment}
												enter='transition ease-out duration-100'
												enterFrom='transform opacity-0 scale-95'
												enterTo='transform opacity-100 scale-100'
												leave='transition ease-in duration-75'
												leaveFrom='transform opacity-100 scale-100'
												leaveTo='transform opacity-0 scale-95'
											>
												<Menu.Items
													static
													className='absolute right-0 py-1 mt-2 w-48 bg-white rounded-md ring-1 ring-black ring-opacity-5 shadow-lg origin-top-right focus:outline-none'
												>
													<Menu.Item>
														{({ active }) => (
															<a
																href='#'
																className={classNames(
																	active ? 'bg-gray-100' : '',
																	'block px-4 py-2 text-sm text-gray-700'
																)}
															>
																Seu perfil
															</a>
														)}
													</Menu.Item>
													<Menu.Item>
														{({ active }) => (
															<a
																onClick={LogOut}
																className={classNames(
																	active ? 'bg-gray-100' : '',
																	'block px-4 py-2 text-sm text-gray-700 cursor-pointer'
																)}
															>
																Sair
															</a>
														)}
													</Menu.Item>
												</Menu.Items>
											</Transition>
										</>
									)}
								</Menu>
							</div>
						</div>
					</div>

					<Disclosure.Panel className='sm:hidden'>
						<div className='px-2 pt-2 pb-3 space-y-1'>
							{navigation.map((item) => (
								<a
									key={item.name}
									href={item.href}
									className={classNames(
										item.current
											? 'bg-gray-900 text-white'
											: 'text-gray-300 hover:bg-gray-700 hover:text-white',
										'block px-3 py-2 rounded-md text-base font-medium'
									)}
									aria-current={item.current ? 'page' : undefined}
								>
									{item.name}
								</a>
							))}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}

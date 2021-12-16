import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Sticky from 'react-stickynode';
import Scrollspy from 'react-scrollspy';
import { Popover, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { useStores } from '../stores';
import { observer } from 'mobx-react-lite';
import clsx from 'clsx';
import useAnalytics from '../hooks/useAnalytics';

const navigation = [
    { name: 'Download', href: '#download' },
    { name: 'Features', href: '#features' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Help', href: '#help' },
    { name: 'Team', href: '#team' },
];

export const Nav = observer(
    (): JSX.Element => {
        const router = useRouter();

        const { logEvent } = useAnalytics();

        logEvent('Page View', {
            Page: router.pathname,
        });

        const { appStore } = useStores();

        const onHome = router.pathname === '/';

        return (
            <Sticky
                enabled={true}
                className="2xl:mb-5"
                innerActiveClass={clsx(
                    'border-b border-gray-800 z-50',
                    'bg-gray-900 backdrop-filter backdrop-blur bg-opacity-50 firefox:bg-opacity-90',
                    {
                        'pb-[13.25rem] md:pb-[5.5rem]': appStore.tabBarStuck,
                    }
                )}
            >
                <Popover as="header" className="relative">
                    {({ open }) => (
                        <>
                            <div className="py-3">
                                <nav
                                    className="relative max-w-7xl 2xl:max-w-8xl mx-auto flex items-center justify-between px-4 sm:px-6"
                                    aria-label="Global"
                                >
                                    <div className="flex items-center justify-between flex-1">
                                        <div className="flex items-center justify-between w-full md:w-auto flex-1">
                                            <Link href="/">
                                                <a className="flex items-center">
                                                    <Image
                                                        src="/firebot-logo-stroke.png"
                                                        alt="Picture of the author"
                                                        className="ring-2 ring-blue-300"
                                                        width={45}
                                                        height={45}
                                                    />
                                                    <div className="text-yellow-300 text-3xl font-extralight ml-3">
                                                        Firebot
                                                    </div>
                                                </a>
                                            </Link>
                                            {onHome && (
                                                <div className="-mr-2 flex items-center md:hidden">
                                                    <Popover.Button className="bg-gray-900 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-white">
                                                        <span className="sr-only">
                                                            Open main menu
                                                        </span>
                                                        <MenuIcon
                                                            className="h-6 w-6"
                                                            aria-hidden="true"
                                                        />
                                                    </Popover.Button>
                                                </div>
                                            )}
                                        </div>
                                        {onHome && (
                                            <Scrollspy
                                                className="hidden space-x-8 md:flex text-gray-400"
                                                items={[
                                                    'download-section',
                                                    'features-section',
                                                    'testimonial-section',
                                                    'faq-section',
                                                    'help-section',
                                                    'team-section',
                                                ]}
                                                currentClassName="text-gray-100"
                                                offset={-100}
                                                componentTag="div"
                                            >
                                                {navigation.map((item) => (
                                                    <a
                                                        key={item.name}
                                                        href={item.href}
                                                        onClick={() =>
                                                            logEvent(
                                                                'Nav Item Click',
                                                                {
                                                                    Item:
                                                                        item.name,
                                                                }
                                                            )
                                                        }
                                                        className="text-base 2xl:text-lg font-medium hover:text-gray-200"
                                                    >
                                                        {item.name}
                                                    </a>
                                                ))}
                                            </Scrollspy>
                                        )}
                                        <div className="hidden md:flex justify-end flex-1">
                                            <a
                                                className="text-gray-400 hover:text-white mr-2"
                                                href="https://discord.gg/tTmMbrG"
                                                onClick={() =>
                                                    logEvent(
                                                        'Discord Button Click'
                                                    )
                                                }
                                            >
                                                <span className="sr-only">
                                                    Community Discord
                                                </span>
                                                <svg
                                                    viewBox="0 0 245 240"
                                                    fill="currentColor"
                                                    className="w-6 h-6 transform -translate-y-0.5"
                                                >
                                                    <path d="M104.4 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1.1-6.1-4.5-11.1-10.2-11.1zM140.9 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1s-4.5-11.1-10.2-11.1z" />
                                                    <path d="M189.5 20h-134C44.2 20 35 29.2 35 40.6v135.2c0 11.4 9.2 20.6 20.5 20.6h113.4l-5.3-18.5 12.8 11.9 12.1 11.2 21.5 19V40.6c0-11.4-9.2-20.6-20.5-20.6zm-38.6 130.6s-3.6-4.3-6.6-8.1c13.1-3.7 18.1-11.9 18.1-11.9-4.1 2.7-8 4.6-11.5 5.9-5 2.1-9.8 3.5-14.5 4.3-9.6 1.8-18.4 1.3-25.9-.1-5.7-1.1-10.6-2.7-14.7-4.3-2.3-.9-4.8-2-7.3-3.4-.3-.2-.6-.3-.9-.5-.2-.1-.3-.2-.4-.3-1.8-1-2.8-1.7-2.8-1.7s4.8 8 17.5 11.8c-3 3.8-6.7 8.3-6.7 8.3-22.1-.7-30.5-15.2-30.5-15.2 0-32.2 14.4-58.3 14.4-58.3 14.4-10.8 28.1-10.5 28.1-10.5l1 1.2c-18 5.2-26.3 13.1-26.3 13.1s2.2-1.2 5.9-2.9c10.7-4.7 19.2-6 22.7-6.3.6-.1 1.1-.2 1.7-.2 6.1-.8 13-1 20.2-.2 9.5 1.1 19.7 3.9 30.1 9.6 0 0-7.9-7.5-24.9-12.7l1.4-1.6s13.7-.3 28.1 10.5c0 0 14.4 26.1 14.4 58.3 0 0-8.5 14.5-30.6 15.2z" />
                                                </svg>
                                            </a>
                                            <a
                                                className="text-gray-400 hover:text-white"
                                                href="https://github.com/crowbartools/firebot"
                                                onClick={() =>
                                                    logEvent(
                                                        'GitHub Button Click'
                                                    )
                                                }
                                            >
                                                <span className="sr-only">
                                                    GitHub repository
                                                </span>
                                                <svg
                                                    viewBox="0 0 16 16"
                                                    fill="currentColor"
                                                    className="w-5 h-5"
                                                >
                                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </nav>
                            </div>

                            <Transition
                                show={open}
                                as={Fragment}
                                enter="duration-150 ease-out"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="duration-100 ease-in"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Popover.Panel
                                    focus
                                    static
                                    className="absolute top-0 inset-x-0 p-2 transition transform origin-top md:hidden"
                                >
                                    <div className="rounded-lg shadow-md bg-gray-800 ring-1 ring-black ring-opacity-5 overflow-hidden">
                                        <div className="px-5 pt-4 flex items-center justify-between">
                                            <div>
                                                <img
                                                    className="h-8 w-auto"
                                                    src="/firebot-logo-stroke.png"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="-mr-2">
                                                <Popover.Button className="bg-gray-800 rounded-md p-2 inline-flex items-center justify-center text-gray-100 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-600">
                                                    <span className="sr-only">
                                                        Close menu
                                                    </span>
                                                    <XIcon
                                                        className="h-6 w-6"
                                                        aria-hidden="true"
                                                    />
                                                </Popover.Button>
                                            </div>
                                        </div>
                                        <div className="pt-5 pb-6">
                                            <div className="px-2 space-y-1">
                                                {navigation.map((item) => (
                                                    <a
                                                        key={item.name}
                                                        href={item.href}
                                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-100 hover:bg-gray-700"
                                                    >
                                                        {item.name}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </>
                    )}
                </Popover>
            </Sticky>
        );
    }
);

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Sticky from 'react-stickynode';
import Scrollspy from 'react-scrollspy';
import { Popover, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { useStores } from '../stores';
import { observer } from 'mobx-react-lite';
import clsx from 'clsx';
import useAnalytics from '../hooks/useAnalytics';
import { useDebounce } from 'react-use';
import { useLiveChannelCount } from '../hooks/useLiveChannels';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faDiscord,
    faGithub,
    faBluesky,
    IconDefinition,
} from '@fortawesome/free-brands-svg-icons';

const navigation = [
    { name: 'Download', href: '#download' },
    { name: 'Features', href: '#features' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Help', href: '#help' },
    { name: 'Team', href: '#team' },
];

const socials: Array<{
    name: string;
    href: string;
    icon: IconDefinition;
}> = [
    {
        name: 'GitHub',
        href: 'https://github.com/crowbartools/firebot',
        icon: faGithub,
    },
    {
        name: 'Discord',
        href: 'https://discord.gg/tTmMbrG',
        icon: faDiscord,
    },
    {
        name: 'Bluesky',
        href: 'https://bsky.app/profile/firebot.app',
        icon: faBluesky,
    },
];

export const Nav = observer((): JSX.Element => {
    const router = useRouter();

    const { logEvent } = useAnalytics();

    const { appStore } = useStores();

    const onHome = router.pathname === '/';

    const [viewedSection, setViewedSection] = useState('');
    const [debouncedViewedSection, setDebouncedViewedSection] = useState('');

    const { data: liveChannelsCount } = useLiveChannelCount();

    const hasLiveChannels = (liveChannelsCount ?? 0) > 0;

    useDebounce(
        () => {
            setDebouncedViewedSection(viewedSection);
        },
        250,
        [viewedSection]
    );

    useEffect(() => {
        if (debouncedViewedSection?.length > 0) {
            logEvent('Home Section View', {
                Section: debouncedViewedSection,
            });
        }
    }, [debouncedViewedSection]);

    useEffect(() => {
        logEvent('Page View', {
            Page: router.pathname,
        });
    }, []);

    const renderFeaturedChannelsBtn = () => {
        return (
            <>
                {hasLiveChannels && onHome && (
                    <Link
                        href="/watch"
                        className="border border-gray-700 rounded text-xs py-1 px-2 mr-2 flex items-center justify-center text-gray-400 hover:text-white font-bold"
                    >
                        <div className="h-3 w-3 bg-red-500 rounded-full mr-1"></div>
                        Featured Streams
                    </Link>
                )}
            </>
        );
    };

    return (
        <Sticky
            enabled={true}
            className="2xl:mb-5"
            innerActiveClass={clsx(
                'border-b border-gray-800 z-50',
                'bg-gray-900 backdrop-filter backdrop-blur bg-opacity-50 firefox:bg-opacity-90',
                {
                    'pb-[14.25rem] md:pb-[6rem]': appStore.tabBarStuck,
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
                                        <Link
                                            href="/"
                                            className="flex items-center"
                                        >
                                            <Image
                                                src="/firebot-logo.png"
                                                alt="Picture of the author"
                                                style={{
                                                    filter: 'drop-shadow(0px 0px 5px rgb(255 213 0 / 25%))',
                                                }}
                                                width={45}
                                                height={45}
                                            />
                                            <div className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300  text-3xl font-black ml-3">
                                                FIREBOT
                                            </div>
                                        </Link>
                                        {onHome && (
                                            <div className="-mr-2 flex items-center md:hidden">
                                                {renderFeaturedChannelsBtn()}
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
                                            onUpdate={(sectionElement) => {
                                                if (
                                                    sectionElement != null &&
                                                    sectionElement.id.includes(
                                                        '-section'
                                                    )
                                                ) {
                                                    setViewedSection(
                                                        sectionElement.id.replace(
                                                            '-section',
                                                            ''
                                                        )
                                                    );
                                                }
                                            }}
                                        >
                                            {navigation.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    onClick={() =>
                                                        logEvent(
                                                            'Nav Item Click',
                                                            {
                                                                Item: item.name,
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
                                    <div className="hidden md:flex justify-end items-center flex-1">
                                        {renderFeaturedChannelsBtn()}
                                        {socials.map((social) => (
                                            <a
                                                key={social.name}
                                                href={social.href}
                                                onClick={() =>
                                                    logEvent(
                                                        `${social.name} Button Click`
                                                    )
                                                }
                                                className="text-gray-400 hover:text-white mr-2"
                                            >
                                                <span className="sr-only">
                                                    {social.name}
                                                </span>
                                                <FontAwesomeIcon
                                                    icon={social.icon}
                                                    className="text-lg"
                                                />
                                            </a>
                                        ))}
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
});

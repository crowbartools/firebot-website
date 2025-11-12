import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faApple,
    faLinux,
    faMicrosoft,
} from '@fortawesome/free-brands-svg-icons';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { ScrollAnchor } from '..';
import useAnalytics from '../../hooks/useAnalytics';
import { useStores } from '../../stores';
import { withoutSsr } from '../../utils/withoutSsr';
import { Menu } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';

type DropdownProps = {
    platform: string;
    platformIcon: any;
    downloads: { name: string; url: string }[];
    onClick: () => void;
};
function DownloadDropdown({
    platform,
    platformIcon,
    downloads,
    onClick,
}: DropdownProps) {
    return (
        <div className="w-full">
            <Menu as="div" className="relative inline-block w-full sm:w-fit">
                {({ open }) => (
                    <>
                        <Menu.Button className="inline-flex justify-center w-full sm:w-fit items-center rounded-md border border-transparent px-5 py-3 bg-blue-500 text-base font-medium text-white shadow hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:px-4">
                            <>
                                <FontAwesomeIcon
                                    icon={platformIcon}
                                    className="mr-2"
                                />
                                Download for {platform}
                                <motion.span
                                    animate={{
                                        rotate: open ? 180 : 0,
                                    }}
                                >
                                    <ChevronDownIcon
                                        aria-hidden="true"
                                        className="h-5 w-5 text-gray-300"
                                    />
                                </motion.span>
                            </>
                        </Menu.Button>

                        <AnimatePresence>
                            {open && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.1 }}
                                >
                                    <Menu.Items
                                        static
                                        className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-gray-800 outline outline-1 -outline-offset-1 outline-white/10 transition data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                    >
                                        {downloads.map((download) => (
                                            <Menu.Item key={download.name}>
                                                <a
                                                    href={download.url}
                                                    className="block px-4 py-2 text-sm text-gray-300 data-[focus]:bg-white/5 data-[focus]:text-white data-[focus]:outline-none hover:bg-white/10"
                                                    onClick={onClick}
                                                >
                                                    {download.name}
                                                </a>
                                            </Menu.Item>
                                        ))}
                                    </Menu.Items>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </>
                )}
            </Menu>
        </div>
    );
}

const DownloadButton = withoutSsr(
    observer(() => {
        const { githubStore } = useStores();
        const { logEvent } = useAnalytics();

        const ua = window.navigator.userAgent.toLowerCase();

        let downloadUrls = githubStore.windowsDownloadUrls;
        let platform = 'Windows';
        let platformIcon = faMicrosoft;

        if (ua.includes('macintosh')) {
            downloadUrls = githubStore.macDownloadUrls;
            platform = 'macOS';
            platformIcon = faApple;
        } else if (ua.includes('linux')) {
            downloadUrls = githubStore.linuxDownloadUrls;
            platform = 'Linux';
            platformIcon = faLinux;
        }

        return downloadUrls.length < 2 ? (
            <a
                className="block text-center w-full sm:w-60 rounded-md border border-transparent px-5 py-3 bg-blue-500 text-base font-medium text-white shadow hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:px-4"
                href={downloadUrls[0].url}
                onClick={() => logEvent('Download Button Click')}
            >
                <FontAwesomeIcon icon={platformIcon} className="mr-3" />
                Download for {platform}
            </a>
        ) : (
            <DownloadDropdown
                platform={platform}
                platformIcon={platformIcon}
                downloads={downloadUrls}
                onClick={() => logEvent('Download Button Click')}
            />
        );
    })
);

const WhatsNewButton = withoutSsr(
    observer(() => {
        const { githubStore } = useStores();
        const { logEvent } = useAnalytics();
        return (
            githubStore.currentVersion && (
                <a
                    href="https://github.com/crowbartools/Firebot/releases/latest"
                    className="inline-flex space-x-4"
                    onClick={() => logEvent("What's New Button Clicked")}
                >
                    <span className="rounded bg-green-600 px-2.5 py-1 text-xs font-semibold tracking-wide uppercase">
                        What's new
                    </span>
                    <span className="inline-flex items-center text-sm font-medium text-blue-400 space-x-1">
                        <span>Just shipped {githubStore.currentVersion}</span>
                        <ChevronRightIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                        />
                    </span>
                </a>
            )
        );
    })
);

export const HeroSection: React.FC = () => {
    return (
        <div className="pb-8 sm:pb-12 2xl:pb-14">
            <ScrollAnchor anchorId="download" />
            <div className="pt-8 overflow-hidden sm:pt-12 lg:relative lg:py-48 2xl:py-56">
                <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl 2xl:max-w-8xl lg:grid lg:grid-cols-2 lg:gap-24">
                    <div id="download-section">
                        <div>
                            <div className="sm:max-w-xl">
                                <h1 className="text-4xl 2xl:text-5xl font-extrabold text-white tracking-tight sm:text-5xl">
                                    All-in-one bot for Twitch streamers
                                </h1>
                                <p className="mt-6 text-xl 2xl:text-2xl text-gray-500">
                                    Firebot is a fully featured open-source bot
                                    that can help level up your streams.
                                </p>
                            </div>
                            <div className="mt-6">
                                <DownloadButton />
                                <a
                                    className="inline-flex text-xs text-gray-500"
                                    href="https://github.com/crowbartools/Firebot/releases/latest"
                                >
                                    Additional downloads
                                    <ChevronRightIcon
                                        className="h-4 w-4"
                                        aria-hidden="true"
                                    />
                                </a>
                            </div>
                            <div className="mt-6">
                                <div className="block h-7">
                                    <WhatsNewButton />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="sm:mx-auto sm:max-w-3xl sm:px-6">
                    <div className="py-12 sm:relative sm:py-14 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                        <div className="hidden sm:block">
                            <div className="absolute inset-y-0 left-1/2 w-screen bg-gray-800 rounded-l-3xl lg:left-80 lg:right-0 lg:w-full" />
                            <svg
                                className="absolute top-8 right-1/2 -mr-3 lg:m-0 lg:left-0 hi"
                                width={404}
                                height={392}
                                fill="none"
                                viewBox="0 0 404 392"
                            >
                                <defs>
                                    <pattern
                                        id="837c3e70-6c3a-44e6-8854-cc48c737b659"
                                        x={0}
                                        y={0}
                                        width={20}
                                        height={20}
                                        patternUnits="userSpaceOnUse"
                                    >
                                        <rect
                                            x={0}
                                            y={0}
                                            width={4}
                                            height={4}
                                            className="text-gray-700"
                                            fill="currentColor"
                                        />
                                    </pattern>
                                </defs>
                                <rect
                                    width={404}
                                    height={392}
                                    fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
                                />
                            </svg>
                        </div>
                        <div className="relative pl-4 -mr-40 sm:mx-auto sm:max-w-3xl sm:px-0 lg:max-w-none lg:h-full lg:pl-12">
                            <img
                                className="w-full rounded-md shadow-xl ring-1 ring-black ring-opacity-5 lg:h-full lg:w-auto lg:max-w-none"
                                src="/fb-dashboard.png"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

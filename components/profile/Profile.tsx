import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useStores } from '../../stores';
import { Commands } from '../../components/profile/Commands';
import { Quotes } from '../../components/profile/Quotes';
import { Searchbar } from '../../components/profile/Searchbar';
import { Tabs } from '../../components/profile/Tabs';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';
import Tilt from 'react-parallax-tilt';
import { Select } from '../../components/profile/Select';
import useAnalytics from '../../hooks/useAnalytics';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-regular-svg-icons';
import { faTwitch } from '@fortawesome/free-brands-svg-icons';

const ALL_COMMANDS_TAG = {
    id: 'allCommands',
    name: 'All commands',
};

type Props = {
    binId?: string;
    channelName?: string;
};

export const Profile: React.FC<Props> = observer(({ channelName, binId }) => {
    const { profileStore } = useStores();

    const { logEvent } = useAnalytics();

    useEffect(() => {
        profileStore.getProfileData(channelName, binId);
    }, [channelName, binId]);

    useEffect(() => {
        if (profileStore.commandQuery?.length > 0) {
            logEvent('Command Search', {
                Query: profileStore.commandQuery.toLowerCase(),
            });
        }
    }, [profileStore.commandQuery]);

    useEffect(() => {
        if (profileStore.channelInfo?.displayName != null) {
            logEvent('Profile View', {
                Channel: profileStore.channelInfo.displayName,
            });
        }
    }, [profileStore.channelInfo?.displayName]);

    useEffect(() => {
        if (profileStore.isLoading || profileStore.profileData == null) {
            return;
        }

        const params = new URLSearchParams(location.search);
        const commandsTag = params.get('commands');

        if (commandsTag == null) {
            return;
        }

        const foundTag = profileStore.profileData.sortTags?.find(
            (st) => st.name === commandsTag
        );

        if (foundTag == null) {
            return;
        }

        profileStore.setSelectedCommandSortTag(foundTag);
    }, [profileStore.isLoading, profileStore.profileData]);

    return (
        <>
            <div className="min-h-screen text-white relative">
                {/* Background gradient */}
                <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-50 -z-10" />

                <div className="relative mx-3 xl:mx-auto lg:max-w-7xl mt-8 lg:mt-16 pb-16">
                    <AnimatePresence>
                        {profileStore.unableToLoad && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.75 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex justify-center mt-20"
                            >
                                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl py-12 px-24 flex flex-col items-center max-w-md border border-gray-700">
                                    <FontAwesomeIcon
                                        icon={faFrown}
                                        className="text-9xl text-red-400 mb-6"
                                    />
                                    <div className="font-bold text-xl text-center">
                                        This link is either invalid or expired.
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <AnimatePresence>
                        {!profileStore.isLoading &&
                            !profileStore.unableToLoad && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {/* Profile Header Card */}
                                    <div className="mb-10">
                                        <div className="flex items-center lg:flex-row flex-col gap-6 lg:gap-8">
                                            {profileStore.channelInfo ? (
                                                <Tilt
                                                    scale={1.1}
                                                    perspective={1000}
                                                    style={{
                                                        transformStyle:
                                                            'preserve-3d',
                                                    }}
                                                    glareEnable
                                                    glareBorderRadius="200rem"
                                                    glareMaxOpacity={0.1}
                                                    tiltEnable
                                                    className="mx-auto h-40 w-40 rounded-full outline outline-8 outline-gray-700 bg-gray-700 flex items-center justify-center shadow-xl"
                                                >
                                                    <img
                                                        className="h-40 w-40 rounded-full"
                                                        src={
                                                            profileStore
                                                                .channelInfo
                                                                ?.profilePicUrl
                                                        }
                                                        alt={`Avatar image for ${profileStore.channelInfo?.displayName}`}
                                                        style={{
                                                            transform:
                                                                'translateZ(10px)',
                                                        }}
                                                    />
                                                </Tilt>
                                            ) : (
                                                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 ring-4 ring-gray-600/50" />
                                            )}
                                            <div className="flex-1 text-center lg:text-left">
                                                <h2 className="text-5xl md:text-6xl leading-tight tracking-wide font-black mb-3">
                                                    {profileStore.channelInfo
                                                        ?.displayName ??
                                                        profileStore.profileData
                                                            ?.owner}
                                                </h2>
                                                <div className="flex items-center justify-center lg:justify-start gap-3 flex-wrap">
                                                    {profileStore.channelInfo && (
                                                        <div
                                                            className={clsx(
                                                                'rounded-full flex py-2 px-4 items-center gap-2 font-semibold text-sm shadow-lg bg-gray-700'
                                                            )}
                                                        >
                                                            <div
                                                                className={clsx(
                                                                    'rounded-full w-3 h-3',
                                                                    {
                                                                        'bg-red-500 animate-pulse':
                                                                            profileStore
                                                                                .channelInfo
                                                                                ?.isLive,
                                                                        'bg-gray-400':
                                                                            !profileStore
                                                                                .channelInfo
                                                                                ?.isLive,
                                                                    }
                                                                )}
                                                            ></div>
                                                            <div>
                                                                {profileStore
                                                                    .channelInfo
                                                                    ?.isLive
                                                                    ? 'LIVE NOW'
                                                                    : 'OFFLINE'}
                                                            </div>
                                                        </div>
                                                    )}
                                                    {profileStore.channelInfo
                                                        ?.isLive && (
                                                        <a
                                                            href={`https://www.twitch.tv/${profileStore.channelInfo.displayName}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold py-1.5 px-6 rounded-xl transition-all duration-200 flex items-center gap-2 hover:scale-105 transform"
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faTwitch}
                                                                className="text-lg"
                                                            />
                                                            Watch Stream
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {profileStore.profileData == null && (
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                scale: 0.75,
                                            }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="flex justify-center mt-12"
                                        >
                                            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl py-12 px-20 flex flex-col items-center max-w-md border border-gray-700">
                                                <FontAwesomeIcon
                                                    icon={faFrown}
                                                    className="text-9xl text-gray-500 mb-6"
                                                />
                                                <div className="text-lg text-center">
                                                    <span className="font-bold text-xl">
                                                        Commands and quotes are
                                                        unavailable.
                                                    </span>
                                                    <br /> <br />
                                                    Try generating a new link
                                                    via !commands
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                    {profileStore.profileData != null && (
                                        <div>
                                            <Tabs
                                                activeTabIndex={
                                                    profileStore.activeTabIndex
                                                }
                                                extraData={
                                                    profileStore.selectedCommandSortTag
                                                }
                                                onTabClick={(index) => {
                                                    if (
                                                        profileStore.activeTabIndex ===
                                                        index
                                                    ) {
                                                        window.scrollTo({
                                                            behavior: 'smooth',
                                                            top: 0,
                                                        });
                                                    } else {
                                                        logEvent(
                                                            'Profile Tab Click',
                                                            {
                                                                Tab:
                                                                    index === 0
                                                                        ? 'Commands'
                                                                        : 'Quotes',
                                                            }
                                                        );
                                                        profileStore.setActiveTabIndex(
                                                            index
                                                        );
                                                    }
                                                }}
                                                config={{
                                                    Commands: {
                                                        content: <Commands />,
                                                        badge: profileStore
                                                            .filteredCommands
                                                            .length,
                                                        toolbar: (mobile) => (
                                                            <div
                                                                className={clsx(
                                                                    'flex justify-end',
                                                                    {
                                                                        'flex-col':
                                                                            mobile,
                                                                    }
                                                                )}
                                                            >
                                                                {!!profileStore
                                                                    .profileData
                                                                    ?.sortTags
                                                                    ?.length && (
                                                                    <div
                                                                        className={clsx(
                                                                            {
                                                                                'w-52 mr-3':
                                                                                    !mobile,
                                                                                'w-full order-last mt-3':
                                                                                    mobile,
                                                                            }
                                                                        )}
                                                                    >
                                                                        <Select
                                                                            options={[
                                                                                ALL_COMMANDS_TAG,
                                                                                ...profileStore.commandSortTags,
                                                                            ]}
                                                                            selected={
                                                                                profileStore.selectedCommandSortTag ??
                                                                                ALL_COMMANDS_TAG
                                                                            }
                                                                            onSelected={
                                                                                profileStore.setSelectedCommandSortTag
                                                                            }
                                                                        />
                                                                    </div>
                                                                )}
                                                                <div
                                                                    className={clsx(
                                                                        {
                                                                            'w-96': !mobile,
                                                                            'w-full':
                                                                                mobile,
                                                                        }
                                                                    )}
                                                                >
                                                                    <Searchbar
                                                                        onSearch={
                                                                            profileStore.setCommandQuery
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                        ),
                                                    },
                                                    Quotes: {
                                                        content: <Quotes />,
                                                        badge: profileStore
                                                            .filteredQuotes
                                                            .length,
                                                        toolbar: (mobile) => (
                                                            <div
                                                                className={
                                                                    mobile
                                                                        ? 'w-full'
                                                                        : 'w-96'
                                                                }
                                                            >
                                                                <Searchbar
                                                                    onSearch={
                                                                        profileStore.setQuoteQuery
                                                                    }
                                                                />
                                                            </div>
                                                        ),
                                                    },
                                                }}
                                            />
                                        </div>
                                    )}
                                </motion.div>
                            )}
                    </AnimatePresence>
                </div>
            </div>
        </>
    );
});

export default Profile;

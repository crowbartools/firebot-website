import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useStores } from '../stores';
import { Commands } from '../components/profile/Commands';
import { Quotes } from '../components/profile/Quotes';
import { Searchbar } from '../components/profile/Searchbar';
import { Tabs } from '../components/profile/Tabs';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';

export const Profile: React.FC = observer(() => {
    const { profileStore } = useStores();

    useEffect(() => {
        profileStore.getProfileData();
    }, []);

    return (
        <div className="h-full text-white relative mx-3 lg:mx-40 mt-8 lg:mt-16">
            <AnimatePresence>
                {profileStore.isLoading && (
                    <motion.div
                        className="absolute top-0 left-0 bottom-0 right-0 bg-gray-900 z-50"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    ></motion.div>
                )}
            </AnimatePresence>
            <div className="mb-5 flex items-center lg:flex-row flex-col">
                {profileStore.channelInfo ? (
                    <img
                        className="inline-block h-36 w-36 rounded-full bg-gray-400"
                        src={profileStore.channelInfo?.profilePicUrl}
                        alt="Profile Picture"
                    />
                ) : (
                    <div className="w-36 h-36 rounded-full bg-gray-400" />
                )}
                <h2 className="text-4xl md:text-6xl text-white leading-normal tracking-wide mx-4 font-extralight">
                    {profileStore.channelInfo?.displayName ??
                        profileStore.profileData?.owner}
                </h2>
                {profileStore.channelInfo && (
                    <div className="rounded-md bg-gray-700 flex py-1 px-2 items-center">
                        <div
                            className={clsx(
                                'rounded-full w-4 h-4 mr-2 flex-grow-0',
                                {
                                    'bg-red-300':
                                        profileStore.channelInfo?.isLive,
                                    'bg-gray-200': !profileStore.channelInfo
                                        ?.isLive,
                                }
                            )}
                        ></div>
                        <div>
                            {profileStore.channelInfo?.isLive
                                ? 'LIVE'
                                : 'OFFLINE'}
                        </div>
                    </div>
                )}
            </div>
            <div>
                <Tabs
                    activeTabIndex={profileStore.activeTabIndex}
                    onTabClick={profileStore.setActiveTabIndex}
                    config={{
                        Commands: {
                            content: <Commands />,
                            searchbar: (
                                <Searchbar
                                    onSearch={profileStore.setCommandQuery}
                                />
                            ),
                        },
                        Quotes: {
                            content: <Quotes />,
                            searchbar: (
                                <Searchbar
                                    onSearch={profileStore.setQuoteQuery}
                                />
                            ),
                        },
                    }}
                />
            </div>
        </div>
    );
});

export default Profile;

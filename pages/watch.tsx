import { AnimatePresence, motion } from 'framer-motion';
import { useLiveChannels } from '../hooks/useLiveChannels';
import { withoutSsr } from '../utils/withoutSsr';
import { TwitchUser } from '../types/twitch';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useInView } from 'react-intersection-observer';

function WatchPage() {
    const { data, isFetchingNextPage, hasNextPage, fetchNextPage } =
        useLiveChannels();

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    const channels = data?.pages.map((page) => page.channels).flat();

    return (
        <div className="relative max-w-7xl 2xl:max-w-8xl mx-auto flex items-center justify-between px-4 sm:px-6">
            <div>
                <h1 className="text-4xl 2xl:text-5xl font-extrabold">Watch</h1>
                <div className="text-xl 2xl:text-2xl text-gray-300 mt-1 font-light">
                    Check out these currently live channels that use Firebot!
                </div>
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {channels?.map((channel) => (
                        <ChannelCard key={channel.id} channel={channel} />
                    ))}
                </div>
                {isFetchingNextPage && (
                    <div className="text-gray-400 mt-6">Loading more...</div>
                )}
                <div ref={ref} className="h-1"></div>
            </div>
        </div>
    );
}

const ChannelCard: React.FC<{ channel: TwitchUser }> = ({ channel }) => {
    const [previewLoaded, setPreviewLoaded] = useState(false);
    return (
        <motion.a
            key={channel.id}
            href={`https://twitch.tv/${channel.login}`}
            target="_blank"
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            className="cursor-pointer"
            whileHover={{ scale: 1.05 }}
        >
            <AnimatePresence mode="popLayout">
                {!previewLoaded && (
                    <motion.div
                        key="placeholder"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-black h-full w-full aspect-[19/9] rounded-md overflow-hidden"
                    />
                )}
                <motion.img
                    key="preview"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={clsx(
                        previewLoaded ? 'block' : 'hidden',
                        'rounded-md overflow-hidden'
                    )}
                    src={channel.stream.thumbnail_url
                        .replace('{width}', '1280')
                        .replace('{height}', '720')}
                    alt="Stream preview image"
                    onLoad={() => setPreviewLoaded(true)}
                />
            </AnimatePresence>
            <div className="mt-2 flex gap-x-2">
                <div className="flex-shrink-0 w-14 md:w-10 lg:w-14">
                    <img
                        src={channel.profile_image_url}
                        alt={channel.display_name}
                        className="w-14 h-14 md:w-10 md:h-10 lg:w-14 lg:h-14 rounded-full"
                    />
                </div>
                <div className="flex-grow flex flex-col gap-y-1.5">
                    <div
                        className="text-white font-bold leading-none"
                        style={{
                            WebkitLineClamp: 1,
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            wordBreak: 'break-all',
                        }}
                        title={channel.stream?.title}
                    >
                        {channel.stream?.title}
                    </div>
                    <div className="text-gray-400 leading-none">
                        {channel.display_name}
                    </div>
                    <div className="text-gray-400 leading-none">
                        {channel.stream?.game_name}
                    </div>
                </div>
            </div>
        </motion.a>
    );
};

export default withoutSsr(WatchPage);

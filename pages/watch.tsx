import { Variants, motion } from 'framer-motion';
import { useLiveChannels } from '../hooks/useLiveChannels';
import { withoutSsr } from '../utils/withoutSsr';
import { TwitchUser } from '../types/twitch';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useInView } from 'react-intersection-observer';
import { StreamPreview } from '../components/watch/StreamPreview';

function WatchPage() {
    const { data, isFetchingNextPage, hasNextPage, fetchNextPage, isFetched } =
        useLiveChannels();

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    const channels = data?.pages.map((page) => page.channels).flat();

    return (
        <div className="relative max-w-7xl 2xl:max-w-8xl mt-2 mx-auto flex items-center justify-between px-8 sm:px-10">
            <div>
                <h1 className="text-4xl 2xl:text-5xl font-extrabold">Watch</h1>
                <div className="text-xl 2xl:text-2xl text-gray-300 mt-1 font-light">
                    Check out these currently live channels that use Firebot!
                </div>
                <motion.div
                    className="mt-6 2x:mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-10"
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.5,
                        },
                    }}
                >
                    {channels?.map((channel, i) => (
                        <ChannelCard
                            key={channel.id}
                            channel={channel}
                            index={i}
                        />
                    ))}
                </motion.div>
                {channels?.length === 0 && isFetched && (
                    <p className="text-gray-400">
                        No live channels found right now. Check back later!
                    </p>
                )}
                {isFetchingNextPage && (
                    <div className="text-gray-400 mt-6">Loading more...</div>
                )}
                <div ref={ref} className="h-1"></div>
            </div>
        </div>
    );
}

const ChannelCard: React.FC<{ channel: TwitchUser; index: number }> = ({
    channel,
    index,
}) => {
    const [previewLoaded, setPreviewLoaded] = useState(false);

    const [isHovering, setIsHovering] = useState(false);

    const variantType = {
        hidden: 'hidden',
        visible: 'visible',
    };

    const variants: Variants = {
        [variantType.hidden]: () => ({
            opacity: 0,
            scale: 0.75,
        }),
        [variantType.visible]: (index: number) => ({
            opacity: 1,
            scale: 1,
            transition: {
                delay: index * 0.1 + 0.1,
            },
        }),
    };

    return (
        <motion.a
            key={channel.id}
            href={`https://twitch.tv/${channel.login}`}
            target="_blank"
            custom={index}
            variants={variants}
            initial={variantType.hidden}
            animate={variantType.visible}
            className="cursor-pointer"
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
        >
            <div className="hover:scale-105 transform transition duration-200">
                <div
                    key="placeholder"
                    className="bg-black w-full aspect-video rounded-md overflow-hidden relative"
                >
                    {isHovering && <StreamPreview username={channel.login} />}
                    <motion.img
                        key="preview"
                        animate={
                            previewLoaded
                                ? { opacity: 1, display: 'block' }
                                : { opacity: 0, display: 'none' }
                        }
                        className={clsx('rounded-md overflow-hidden')}
                        src={channel.stream.thumbnail_url
                            .replace('{width}', '1280')
                            .replace('{height}', '720')}
                        alt="Stream preview image"
                        onLoad={() => setPreviewLoaded(true)}
                    />
                </div>
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
            </div>
        </motion.a>
    );
};

export default withoutSsr(WatchPage);

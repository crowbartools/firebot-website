import { Variants, motion } from 'framer-motion';
import { useLiveChannels } from '../hooks/useLiveChannels';
import { withoutSsr } from '../utils/withoutSsr';
import { TwitchUser } from '../types/twitch';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useInView } from 'react-intersection-observer';
import { StreamPreview } from '../components/watch/StreamPreview';
import moment from 'moment';
import PulseLoader from 'react-spinners/PulseLoader';
import { ClockIcon } from '@heroicons/react/outline';
import Tilt from 'react-parallax-tilt';
import { useKeyPress } from 'react-use';

function WatchPage() {
    const { data, isFetching, isFetched, hasNextPage, fetchNextPage } =
        useLiveChannels();

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    const hasChannels = data?.pages.some((page) => page.channels.length > 0);

    return (
        <div className="relative max-w-7xl 2xl:max-w-8xl mt-2 mx-auto flex items-center justify-center px-8 sm:px-10 pb-10">
            <div className="width-full">
                <div className="text-center w-full">
                    <h1 className="text-4xl 2xl:text-5xl font-extrabold">
                        See Firebot in action
                    </h1>
                    <div className="text-xl 2xl:text-2xl text-gray-300 mt-1 font-light">
                        Check out these live channels that use Firebot!
                    </div>
                </div>
                <motion.div
                    className="mt-6 2x:mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-8"
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                >
                    {data?.pages.map((page) => {
                        return page.channels.map((channel, i) => (
                            <ChannelCard
                                key={channel.id}
                                channel={channel}
                                index={i}
                            />
                        ));
                    })}
                </motion.div>
                {!hasChannels && isFetched && (
                    <p className="text-gray-400 text-center">
                        No channels are live right now. Check back later!
                    </p>
                )}
                {isFetching && (
                    <div className="flex items-center justify-center w-full mt-10">
                        <PulseLoader size="1.25rem" color="#FDE047" />
                    </div>
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

    const minutesSince = Math.abs(
        moment(channel.stream.started_at).diff(moment(), 'minutes')
    );
    const hoursSince = Math.floor(minutesSince / 60);
    const remainingMinutes = Math.floor(minutesSince % 60);

    const [isPressingShift] = useKeyPress('Shift');

    return (
        <motion.a
            key={channel.id}
            href={
                !isPressingShift
                    ? `https://twitch.tv/${channel.login}`
                    : undefined
            }
            target={!isPressingShift ? '_blank' : undefined}
            rel="noreferrer"
            custom={index}
            variants={variants}
            initial={variantType.hidden}
            animate={variantType.visible}
            className="cursor-pointer"
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
        >
            <Tilt
                scale={1.05}
                perspective={1000}
                tiltMaxAngleX={15}
                tiltMaxAngleY={15}
                style={{
                    transformStyle: 'preserve-3d',
                }}
                glareEnable
                glareBorderRadius="0.5rem"
                glareMaxOpacity={0.1}
                tiltEnable={isHovering}
                className="hover:bg-gray-800 rounded-lg p-2"
            >
                <div
                    key="placeholder"
                    className={clsx(
                        'bg-black w-full aspect-video rounded-lg relative'
                    )}
                    style={{
                        transformStyle: 'preserve-3d',
                    }}
                >
                    <div
                        style={{
                            transform: 'translateZ(25px)',
                        }}
                        className={clsx(
                            'absolute z-50 top-2 left-2 px-1.5 py-1 bg-red-500/50 flex items-center leading-none rounded-md text-sm font-extrabold uppercase',
                            previewLoaded ? 'backdrop-filter backdrop-blur' : ''
                        )}
                    >
                        Live
                    </div>
                    <div
                        style={{
                            transform: 'translateZ(25px)',
                        }}
                        className={clsx(
                            'absolute z-50 top-2 right-2 px-1.5 py-1 bg-gray-800/50 backdrop-filter backdrop-blur flex items-center justify-center leading-none rounded-md text-sm uppercase',
                            previewLoaded ? 'backdrop-filter backdrop-blur' : ''
                        )}
                    >
                        <ClockIcon className="w-3 h-3 mr-1 leading-none text-red-400" />
                        <span>{`${hoursSince
                            .toString()
                            .padStart(2, '0')}:${remainingMinutes
                            .toString()
                            .padStart(2, '0')}`}</span>
                    </div>
                    {isHovering && (
                        <StreamPreview
                            username={channel.login}
                            allowClicks={isPressingShift}
                        />
                    )}
                    <motion.img
                        key="preview"
                        animate={
                            previewLoaded
                                ? { opacity: 1, display: 'block' }
                                : { opacity: 0, display: 'none' }
                        }
                        className={clsx('rounded-lg overflow-hidden')}
                        src={channel.stream.thumbnail_url
                            .replace('{width}', '1280')
                            .replace('{height}', '720')}
                        alt="Stream preview image"
                        onLoad={() => setPreviewLoaded(true)}
                    />
                </div>
                <div
                    className={clsx('mt-2 flex gap-x-2')}
                    style={{
                        transform: 'translateZ(25px)',
                    }}
                >
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
            </Tilt>
        </motion.a>
    );
};

export default withoutSsr(WatchPage);

import { useState } from 'react';
import { TwitchUser } from '../../types/twitch';
import { Variants, motion } from 'framer-motion';
import moment from 'moment';
import { useKeyPress } from 'react-use';
import clsx from 'clsx';
import { ClockIcon } from '@heroicons/react/outline';
import { StreamPreviewEmbed } from './StreamPreviewEmbed';
import Tilt from 'react-parallax-tilt';
import { StreamPreviewImage } from './StreamPreviewImage';

export const ChannelCard: React.FC<{ channel: TwitchUser; index: number }> = ({
    channel,
    index,
}) => {
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
                    {renderLiveBadge()}
                    {renderUptimeBadge(channel.stream.started_at)}
                    {isHovering && (
                        <StreamPreviewEmbed
                            username={channel.login}
                            allowClicks={isPressingShift}
                        />
                    )}
                    <StreamPreviewImage
                        imageUrl={channel.stream.thumbnail_url}
                    />
                </div>
                <div
                    className={clsx('mt-2 flex gap-x-2')}
                    style={{
                        transform: 'translateZ(25px)',
                    }}
                >
                    <motion.div className="flex-shrink-0 w-14 md:w-10 lg:w-14">
                        <img
                            src={channel.profile_image_url}
                            alt={channel.display_name}
                            className="w-14 h-14 md:w-10 md:h-10 lg:w-14 lg:h-14 rounded-full"
                        />
                    </motion.div>
                    <div className="flex flex-col gap-y-1.5 preserve-3d">
                        <div
                            className="text-white font-bold leading-tight"
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
                        {/* <div>
                            <TestOverflowScroller
                                play={isHovering}
                                width="100%"
                            >
                                {channel.stream?.title}
                            </TestOverflowScroller>
                        </div> */}
                        <div
                            className="text-gray-400 leading-none"
                            style={{
                                WebkitLineClamp: 1,
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                wordBreak: 'break-all',
                            }}
                        >
                            {channel.display_name}
                        </div>
                        <div
                            className="text-gray-400 leading-none text-sm"
                            style={{
                                WebkitLineClamp: 2,
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                            }}
                        >
                            {channel.stream?.game_name}
                        </div>
                    </div>
                </div>
            </Tilt>
        </motion.a>
    );
};

const renderLiveBadge = () => (
    <motion.div
        className={clsx(
            'absolute z-50 top-2 left-2 px-1.5 py-1 bg-red-500/50 flex items-center leading-none',
            'rounded-md text-sm font-extrabold uppercase backdrop-filter backdrop-blur'
        )}
        style={{
            transform: 'translateZ(25px)',
        }}
    >
        Live
    </motion.div>
);

const renderUptimeBadge = (startedAt: string) => {
    const minutesSince = Math.abs(moment(startedAt).diff(moment(), 'minutes'));
    const hoursSince = Math.floor(minutesSince / 60);
    const remainingMinutes = Math.floor(minutesSince % 60);

    return (
        <div
            className={clsx(
                'absolute z-50 top-2 right-2 px-1.5 py-1 bg-gray-800/50 backdrop-filter backdrop-blur flex',
                'items-center justify-center leading-none rounded-md text-sm uppercase backdrop-filter backdrop-blur'
            )}
            style={{
                transform: 'translateZ(25px)',
            }}
        >
            <ClockIcon className="w-3 h-3 mr-1 leading-none text-red-400" />
            <span>{`${hoursSince.toString().padStart(2, '0')}:${remainingMinutes
                .toString()
                .padStart(2, '0')}`}</span>
        </div>
    );
};

import { XIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { AnimatePresence, motion, Variant } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useStores } from '../../stores';
import { StreamVariant } from '../../types/profile';

export const StreamPreviewBackground: React.FC = observer(() => {
    const { profileStore } = useStores();

    useEffect(() => {
        if (profileStore.streamInFront) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [profileStore.streamInFront]);

    const streamVariants: Record<StreamVariant, Variant> = {
        firstShow: {
            opacity: 0.125,
            transition: {
                delay: 1,
                duration: 3,
            },
        },
        subsequentShow: {
            opacity: 0.125,
            transition: {
                duration: 0.5,
            },
        },
        front: {
            opacity: 1.0,
            transition: {
                duration: 0.5,
            },
        },
        hide: {
            opacity: 0.0,
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <AnimatePresence>
            {profileStore.channelInfo && profileStore.channelInfo.isLive && (
                <motion.div
                    initial={{
                        opacity: 0.0,
                    }}
                    variants={streamVariants}
                    animate={profileStore.streamVariant}
                    className={clsx(
                        'fixed left-1/2 -translate-x-1/2 top-0',
                        profileStore.streamInFront
                            ? 'z-10'
                            : 'z-[-1] pointer-events-none'
                    )}
                    style={{
                        height: profileStore.streamInFront
                            ? '100%'
                            : 'max(100vh, calc(100vw * (9/16))',
                        width: profileStore.streamInFront
                            ? '100%'
                            : 'max(100vw, calc(100vh * (16/9)))',
                    }}
                >
                    {profileStore.streamInFront && (
                        <button
                            className={clsx(
                                'bg-green-500 text-white rounded-full w-8 h-8 absolute',
                                'right-5 top-5 flex justify-center items-center leading-none text-xl'
                            )}
                            type="button"
                            onClick={() => profileStore.setStreamInFront(false)}
                        >
                            <XIcon className="w-5 h-6" />
                        </button>
                    )}
                    <iframe
                        src={`https://player.twitch.tv/?channel=${profileStore.channelInfo.username}&parent=localhost&parent=firebot.app&muted=true&autoplay=true&controls=false`}
                        className="w-full h-full"
                        allowFullScreen
                    ></iframe>
                </motion.div>
            )}
        </AnimatePresence>
    );
});

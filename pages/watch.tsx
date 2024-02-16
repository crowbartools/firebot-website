import { motion } from 'framer-motion';
import { useLiveChannels } from '../hooks/useLiveChannels';
import { withoutSsr } from '../utils/withoutSsr';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import PulseLoader from 'react-spinners/PulseLoader';
import { ChannelCard } from '../components/watch/ChannelCard';

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

export default withoutSsr(WatchPage);

import { motion } from 'framer-motion';
import { useLiveChannels } from '../hooks/useLiveChannels';
import { withoutSsr } from '../utils/withoutSsr';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import PulseLoader from 'react-spinners/PulseLoader';
import { ChannelCard } from '../components/watch/ChannelCard';
import { HowToModal } from '../components/watch/HowToModal';
import Head from 'next/head';
import { useGridDimensions } from '../hooks/useGridDimensions';
import clsx from 'clsx';

function WatchPage() {
    const params = new URLSearchParams(location.search);
    const matureParam = params.get('mature');
    const { data, isFetching, isFetched, hasNextPage, fetchNextPage } =
        useLiveChannels({
            sortBy: params.get('sortBy') ? params.get('sortBy').split(',') : [],
            search: params.get('search') ?? undefined,
            language: params.get('language')
                ? params.get('language').split(',')
                : [],
            category: params.get('category')
                ? params.get('category').split(',')
                : [],
            mature: matureParam != null ? matureParam === 'true' : undefined,
        });

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    const [showHowToModal, setShowHowToModal] = useState(false);

    const hasChannels = data?.pages.some((page) => page.channels.length > 0);

    const gridRef = useRef<HTMLDivElement>(null);

    const teamMemberCount = data?.pages.reduce(
        (acc, page) =>
            acc +
            page.channels.reduce(
                (acc, channel) => acc + (channel.isTeamMember ? 1 : 0),
                0
            ),
        0
    );

    const { columns, rows } = useGridDimensions(gridRef);

    return (
        <div className="relative max-w-7xl 2xl:max-w-8xl mt-2 mx-auto flex items-center justify-center px-8 sm:px-10 pb-10">
            <Head>
                <title>Firebot - Watch</title>
            </Head>
            <div className="width-full">
                <div className="text-center w-full">
                    <h1 className="text-4xl 2xl:text-5xl font-extrabold">
                        See Firebot in action
                    </h1>
                    <div className="text-xl 2xl:text-2xl text-gray-300 mt-1 font-light">
                        Check out these live channels that use Firebot!
                    </div>
                    <button
                        className="text-sm text-gray-400 mt-1 font-light underline hover:text-gray-100"
                        onClick={() => setShowHowToModal(true)}
                    >
                        How do I get my channel listed here?
                    </button>
                </div>
                <motion.div
                    ref={gridRef}
                    className={clsx(
                        'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-8',
                        teamMemberCount === 0
                            ? 'mt-6 2x:mt-8'
                            : 'mt-14 2xl:mt-16'
                    )}
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                >
                    {data?.pages.map((page, pageIndex) => {
                        return page.channels.map((channel, i) => (
                            <ChannelCard
                                key={channel.id}
                                channel={channel}
                                index={i * (pageIndex + 1)}
                                indexInPage={i}
                                totalColumns={columns}
                                totalRows={rows}
                                teamMemberCount={teamMemberCount}
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
            <HowToModal
                isOpen={showHowToModal}
                onClose={() => setShowHowToModal(false)}
            />
        </div>
    );
}

export default withoutSsr(WatchPage);

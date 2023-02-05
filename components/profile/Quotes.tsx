import clsx from 'clsx';
import moment from 'moment';
import React from 'react';
import { useStores } from '../../stores';
import { CopyButton } from './CopyButton';
import { Pagination } from './Pagination';
import { downloadDataAsCsv } from '../../utils/profile';
import { observer } from 'mobx-react-lite';
import { DownloadIcon } from '@heroicons/react/outline';
import useAnalytics from '../../hooks/useAnalytics';

export const Quotes = observer(() => {
    const { profileStore } = useStores();

    const { logEvent } = useAnalytics();

    const downloadQuotesCsv = () => {
        logEvent('Quote CSV Download');

        const quotes = profileStore.profileData.quotes.quotes.map((quote) => [
            quote._id,
            quote.text,
            quote.originator,
            quote.creator,
            moment(quote.createdAt).format('MM/DD/YYYY'),
            quote.game,
        ]);
        downloadDataAsCsv(
            [['ID', 'Text', 'Author', 'Creator', 'Date', 'Game'], ...quotes],
            profileStore.channelInfo.username
        );
    };

    return (
        <>
            <div
                className={clsx('bg-gray-800 rounded-md overflow-hidden mt-2', {
                    'bg-gray-800 backdrop-filter backdrop-blur-lg firefox:bg-opacity-90':
                        profileStore.channelInfo?.isLive,
                    'bg-gray-800': !profileStore.channelInfo?.isLive,
                    'bg-opacity-50':
                        profileStore.channelInfo?.isLive &&
                        profileStore.showStream,
                })}
                style={{
                    transitionProperty: 'background-color',
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                    transitionDuration: '1s',
                }}
            >
                {profileStore.profileData &&
                    profileStore.currentQuotes.map((q, i) => (
                        <div
                            key={q._id}
                            className={clsx('p-6', {
                                'border-t border-gray-900 border-solid border-opacity-50':
                                    i > 0,
                            })}
                        >
                            <div className="text-2xl italic font-hairline mb-2 break-words">
                                {q.text}
                            </div>
                            <div>
                                &#8212; <span>{q.originator}</span>,{' '}
                                <span className="font-thin">
                                    {moment(q.createdAt).format('M/D/YYYY')}
                                </span>
                                <span className="text-sm text-gray-200 ml-2">
                                    ({q.game})
                                </span>
                            </div>
                            <div className="text-gray-200 tracking-wide mt-2">
                                <span>#{q._id}</span>
                                <CopyButton
                                    tooltipText="Copy quote command"
                                    copyText={`!quote ${q._id}`}
                                />
                            </div>
                        </div>
                    ))}
            </div>
            <div className="my-8 md:my-4 text-sm flex justify-end">
                {!!profileStore.profileData?.quotes?.quotes?.length && (
                    <button
                        className="text-blue-500 hover:text-blue-300"
                        onClick={downloadQuotesCsv}
                    >
                        <DownloadIcon className="w-6 h-6 inline-block" />{' '}
                        Download as .CSV
                    </button>
                )}
            </div>
            <div
                className="fixed flex items-center justify-center mb-8 md:mb-5 shadow-xl"
                style={{
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                }}
            >
                <Pagination
                    totalRecords={profileStore.filteredQuotes.length}
                    currentPage={profileStore.quotesPagination.currentPage}
                    pageSize={profileStore.quotesPagination.pageSize}
                    onPageChanged={profileStore.setCurrentQuotesPage}
                />
            </div>
        </>
    );
});

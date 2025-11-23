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
                className={clsx(
                    'bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl mt-2 border border-gray-700/50 shadow-2xl mb-16 md:mb-9'
                )}
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
                            className={clsx('p-8', {
                                'border-t border-gray-700/50': i > 0,
                            })}
                        >
                            <div className="text-2xl italic font-light mb-4 break-words text-gray-100 leading-relaxed">
                                "{q.text}"
                            </div>
                            <div className="text-gray-300 text-base mb-3">
                                &#8212;{' '}
                                <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500">
                                    {q.originator}
                                </span>
                                ,{' '}
                                <span className="font-normal">
                                    {moment(q.createdAt).format('M/D/YYYY')}
                                </span>
                                {q.game && (
                                    <span className="text-sm text-gray-400 ml-2">
                                        ({q.game})
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-2 text-gray-400 tracking-wide">
                                <span className="text-sm font-mono bg-gray-700/50 px-2 py-1 rounded">
                                    #{q._id}
                                </span>
                                <CopyButton
                                    tooltipText="Copy quote command"
                                    copyText={`!quote ${q._id}`}
                                />
                            </div>
                        </div>
                    ))}
            </div>
            <div className="mb-20 md:mb-16 flex justify-end">
                {!!profileStore.profileData?.quotes?.quotes?.length && (
                    <button
                        className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-200 flex items-center gap-2 hover:underline"
                        onClick={downloadQuotesCsv}
                    >
                        <DownloadIcon className="w-5 h-5" />
                        Download CSV
                    </button>
                )}
            </div>
            <div
                className="fixed flex items-center justify-center mb-8 md:mb-5"
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

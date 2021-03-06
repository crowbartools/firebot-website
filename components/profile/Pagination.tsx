import { ReplyIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { Modal } from './Modal';
import ScrollIndicatorArrow from './ScrollIndicatorArrow';

const SPILL = -1;

const range = (from: number, to: number) => {
    let i = from;
    const range = [];

    while (i <= to) {
        range.push(i);
        i += 1;
    }

    return range;
};

function generatePageNumbers(
    totalPages: number,
    currentPage: number,
    pageNeighbors: number
) {
    const totalNumbers = pageNeighbors * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
        const startPage = Math.max(2, currentPage - pageNeighbors);
        const endPage = Math.min(totalPages - 1, currentPage + pageNeighbors);
        let pages = range(startPage, endPage);

        const hasLeftSpill = startPage > 2;
        const hasRightSpill = totalPages - endPage > 1;
        const spillOffset = totalNumbers - (pages.length + 1);

        switch (true) {
            case hasLeftSpill && !hasRightSpill: {
                const extraPages = range(
                    startPage - spillOffset,
                    startPage - 1
                );
                pages = [SPILL, ...extraPages, ...pages];
                break;
            }

            case !hasLeftSpill && hasRightSpill: {
                const extraPages = range(endPage + 1, endPage + spillOffset);
                pages = [...pages, ...extraPages, SPILL];
                break;
            }

            case hasLeftSpill && hasRightSpill:
            default: {
                pages = [SPILL, ...pages, SPILL];
                break;
            }
        }

        return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
}

interface Props {
    currentPage: number;
    pageSize: number;
    totalRecords: number;
    onPageChanged: (newPage: number) => void;
}

const NEIGHBORS = 1;

export const Pagination: React.FC<Props> = ({
    currentPage,
    pageSize,
    totalRecords,
    onPageChanged,
}) => {
    const totalPages = Math.ceil(totalRecords / pageSize);

    if (!totalRecords || totalPages === 1) return null;

    const [jumpToModalOpen, setJumpToModalOpen] = useState(false);
    const [jumpToPage, setJumpToPage] = useState<number | null>(null);

    const inputRef = useRef<HTMLInputElement>();
    useEffect(() => {
        if (jumpToModalOpen) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 10);
        }
    }, [jumpToModalOpen]);

    const pages = generatePageNumbers(totalPages, currentPage, NEIGHBORS);

    const handleJumpToPage = () => {
        if (!isNaN(jumpToPage)) {
            if (jumpToPage > 0 && jumpToPage <= totalPages) {
                onPageChanged(jumpToPage);
            }
        }
        setJumpToModalOpen(false);
    };

    return (
        <div>
            <Modal
                isOpen={jumpToModalOpen}
                onClickAway={() => setJumpToModalOpen(false)}
                onClose={() => setJumpToModalOpen(false)}
            >
                <div className="p-6">
                    <h2 className="text-white font-thin text-2xl mb-4">
                        Jump To Page
                    </h2>
                    <input
                        ref={inputRef}
                        className="block w-full p-3 rounded-lg bg-gray-700 placeholder-gray-200 text-white outline-none focus:shadow-focus border-none"
                        value={jumpToPage || ''}
                        placeholder="Enter page"
                        onKeyPress={(event) => {
                            if (event.key === 'Enter') {
                                handleJumpToPage();
                            }
                        }}
                        onChange={(event) =>
                            setJumpToPage(parseInt(event.target.value) || null)
                        }
                        type="number"
                    />
                    <div className="mt-4 flex justify-end">
                        <button
                            className="p-3 rounded-lg bg-gray-700 w-20 text-white mr-2 hover:bg-opacity-75"
                            onClick={() => setJumpToModalOpen(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className="p-3 rounded-lg bg-blue-700 w-20 text-white hover:bg-opacity-75"
                            onClick={() => handleJumpToPage()}
                        >
                            Go
                        </button>
                    </div>
                </div>
            </Modal>
            <nav className="relative z-0 inline-flex shadow-lg select-none">
                <a
                    className="absolute mr-3 lg:px-2 lg:py-2 lg:text-sm px-4 py-3 text-base border-solid shadow-lg inline-flex items-center rounded-md border border-gray-800 bg-gray-700 hover:text-gray-200 cursor-pointer"
                    onClick={() => {
                        setJumpToPage(null);
                        setJumpToModalOpen(true);
                    }}
                    style={{
                        right: '100%',
                        bottom: '50%',
                        transform: 'translateY(50%)',
                    }}
                >
                    <ReplyIcon
                        className="w-5 h-5"
                        style={{
                            transform: 'scaleX(-1)',
                        }}
                    />
                </a>

                <a
                    className="absolute ml-3 lg:px-1 lg:py-1 lg:text-sm px-3 py-2 text-base border-solid shadow-lg inline-flex items-center rounded-md border border-gray-800 bg-gray-700 hover:text-gray-200 cursor-pointer"
                    onClick={() => {
                        window.scrollTo(0, 0);
                    }}
                    style={{
                        left: '100%',
                        bottom: '50%',
                        transform: 'translateY(50%)',
                    }}
                >
                    <ScrollIndicatorArrow />
                </a>

                <a
                    className="relative cursor-pointer border-solid inline-flex items-center lg:px-2 lg:py-2 lg:text-sm px-4 py-3 text-base rounded-l-md border border-gray-800 bg-gray-700 leading-5 font-medium text-white hover:text-gray-200"
                    aria-label="Previous"
                    onClick={() => onPageChanged(Math.max(1, currentPage - 1))}
                >
                    <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </a>
                {pages.map((page, index) => {
                    if (page === SPILL) {
                        return (
                            <span
                                key={index}
                                className={clsx(
                                    '-ml-px relative hidden md:inline-flex items-center px-4 py-2 border',
                                    'border-gray-800 border-solid bg-gray-700 text-sm leading-5 font-medium',
                                    'text-white'
                                )}
                            >
                                ...
                            </span>
                        );
                    }
                    return (
                        <a
                            key={index}
                            onClick={() => onPageChanged(page)}
                            className={clsx(
                                'cursor-pointer inline-flex -ml-px relative items-center',
                                'lg:px-4 lg:py-2 lg:text-sm px-6 py-3 text-base border border-gray-800 border-solid bg-gray-700 leading-5',
                                'font-medium hover:bg-opacity-25 focus:z-10 outline-none',
                                'focus:shadow-focus',
                                'transition ease-in-out duration-150',
                                {
                                    'bg-gray-700 z-10 inline-flex text-blue-300':
                                        page === currentPage,
                                    'hidden md:inline-flex text-white':
                                        page !== currentPage,
                                }
                            )}
                        >
                            {page}
                        </a>
                    );
                })}
                <a
                    className="cursor-pointer -ml-px relative inline-flex items-center lg:px-2 lg:py-2 lg:text-sm px-4 py-3 text-base rounded-r-md border border-solid border-gray-900 bg-gray-700 leading-5 font-medium text-white hover:text-gray-200"
                    aria-label="Next"
                    onClick={() =>
                        onPageChanged(Math.min(totalPages, currentPage + 1))
                    }
                >
                    <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </a>
            </nav>
        </div>
    );
};

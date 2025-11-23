import clsx from 'clsx';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDebounce } from 'react-use';

interface Props {
    onSearch: (query: string) => void;
    placeholder?: string;
}

export const Searchbar: React.FC<Props> = ({
    onSearch,
    placeholder = 'Search',
}) => {
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');

    const [isFocused, setIsFocused] = useState(false);

    useDebounce(
        () => {
            setDebouncedQuery(query);
        },
        300,
        [query]
    );

    useEffect(() => {
        onSearch(debouncedQuery);
    }, [debouncedQuery]);

    const variants = {
        notFocused: { scale: 1, boxShadow: 'none' },
        focused: {
            scale: 1.0,
            boxShadow:
                '0 10px 15px -3px rgba(59, 130, 246, 0.2), 0 4px 6px -2px rgba(59, 130, 246, 0.1)',
        },
    };

    return (
        <div className="order-last">
            <motion.div
                variants={variants}
                animate={isFocused ? 'focused' : 'notFocused'}
                className="rounded-xl"
            >
                <label htmlFor="search" className="sr-only">
                    Search
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                        <svg
                            className={clsx(
                                'h-5 w-5 transition-colors duration-200',
                                {
                                    'text-blue-400': isFocused,
                                    'text-gray-400': !isFocused,
                                }
                            )}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <input
                        id="search"
                        className={clsx(
                            'block w-full pl-10 pr-3 py-3 rounded-xl text-white transition-all duration-200',
                            'bg-gray-700/80 backdrop-blur-sm placeholder-gray-400',
                            'outline-none text-base md:text-sm border border-gray-600/50',
                            'focus:ring-2 focus:ring-blue-400 focus:bg-gray-700'
                        )}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder={placeholder}
                        type="text"
                        onChange={(event) => setQuery(event.target.value)}
                    />
                </div>
            </motion.div>
        </div>
    );
};

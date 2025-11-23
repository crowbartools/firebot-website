import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import React from 'react';
import Markdown from 'react-markdown';
import { useToggle } from 'react-use';
import useAnalytics from '../../hooks/useAnalytics';
import { ProfileData } from '../../types/profile';
import { CopyButton } from './CopyButton';

export const VariableExamples: React.FC<{
    examples: ProfileData['variables'][0]['examples'];
}> = ({ examples }) => {
    const [open, toggleOpen] = useToggle(false);

    const { logEvent } = useAnalytics();

    const variantType = {
        hidden: 'hidden',
        visible: 'visible',
    };

    const subCommandVariants: Variants = {
        [variantType.hidden]: {
            opacity: 0,
            x: 15,
        },
        [variantType.visible]: (index: number) => ({
            opacity: 1,
            transition: {
                delay: index * 0.05 + 0.1,
            },
            x: 0,
        }),
    };

    return (
        !!examples?.length && (
            <div className="mt-3">
                <button
                    className="text-blue-400 hover:text-blue-500 cursor-pointer text-sm font-semibold inline-flex items-center transition-all duration-200"
                    onClick={toggleOpen}
                >
                    Other examples{' '}
                    {!open ? (
                        <ChevronRightIcon className="w-5 h-5 text-blue-400" />
                    ) : (
                        <ChevronDownIcon className="w-5 h-5 text-blue-400" />
                    )}
                </button>
                <AnimatePresence>
                    {open && (
                        <motion.div
                            className="py-3 px-4 mt-2 bg-gray-800/30 rounded-xl border border-gray-600/30 backdrop-blur-sm"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{
                                height: 'max-content',
                                overflow: 'visible',
                                opacity: 1,
                            }}
                            exit={{
                                height: 0,
                                opacity: 0,
                                overflow: 'hidden',
                                transition: { duration: 0.2 },
                            }}
                        >
                            {examples.map((e, index) => (
                                <motion.div
                                    key={e.usage}
                                    className={clsx('pb-3', {
                                        'mb-3 border-b border-gray-600/30':
                                            index !== examples.length - 1,
                                    })}
                                    custom={index}
                                    variants={subCommandVariants}
                                    initial={variantType.hidden}
                                    animate={variantType.visible}
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-bold text-sm font-mono text-white">
                                            ${e.usage}
                                        </span>
                                        <CopyButton
                                            copyText={'$' + e.usage}
                                            onClick={() => {
                                                logEvent('Variable Copy', {
                                                    Variable: '$' + e.usage,
                                                });
                                            }}
                                        />
                                    </div>
                                    <div className="text-gray-300 text-sm leading-relaxed">
                                        <Markdown className="md-inline">
                                            {e.description}
                                        </Markdown>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        )
    );
};

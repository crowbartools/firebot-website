import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import React from 'react';
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
            <div className="mt-2">
                <a
                    className="text-blue-300 cursor-pointer text-sm inline-flex items-center hover:text-blue-400"
                    onClick={toggleOpen}
                >
                    Other examples{' '}
                    {!open ? (
                        <ChevronRightIcon className="w-5 h-5" />
                    ) : (
                        <ChevronDownIcon className="w-5 h-5" />
                    )}
                </a>
                <AnimatePresence>
                    {open && (
                        <motion.div
                            className="py-3 px-4 mt-2"
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
                                    className={clsx({
                                        'mb-3': index !== examples.length - 1,
                                    })}
                                    custom={index}
                                    variants={subCommandVariants}
                                    initial={variantType.hidden}
                                    animate={variantType.visible}
                                >
                                    <div key={e.usage} className="px-4">
                                        <b>
                                            ${e.usage}{' '}
                                            <CopyButton
                                                copyText={'$' + e.usage}
                                                onClick={() => {
                                                    logEvent('Variable Copy', {
                                                        Variable: '$' + e.usage,
                                                    });
                                                }}
                                            />
                                        </b>
                                        <div className="text-gray-400">
                                            {e.description}
                                        </div>
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

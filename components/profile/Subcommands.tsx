import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import React from 'react';
import Markdown from 'react-markdown';
import { useToggle } from 'react-use';
import useAnalytics from '../../hooks/useAnalytics';
import { ProfileData } from '../../types/profile';
import { CooldownsAndPermissions } from './CooldownsAndPermissions';
import { CopyButton } from './CopyButton';

export const Subcommands: React.FC<{
    command: ProfileData['commands']['allowedCmds'][0];
}> = ({ command }) => {
    const [open, toggleOpen] = useToggle(false);

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

    const { logEvent } = useAnalytics();

    return (
        command.subCommands?.length > 0 && (
            <div className="mt-4">
                <button
                    className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-400 hover:to-blue-500 cursor-pointer text-sm font-semibold inline-flex items-center transition-all duration-200"
                    onClick={toggleOpen}
                >
                    Subcommands{' '}
                    {!open ? (
                        <ChevronRightIcon className="w-5 h-5 text-blue-400" />
                    ) : (
                        <ChevronDownIcon className="w-5 h-5 text-blue-400" />
                    )}
                </button>
                <AnimatePresence>
                    {open && (
                        <motion.div
                            className="py-4 px-5 mt-3 bg-gray-700/30 rounded-xl border border-gray-600/30 backdrop-blur-sm"
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
                            {command.subCommands.map((sc, index) => (
                                <motion.div
                                    key={sc.arg}
                                    className={clsx('pb-4', {
                                        'mb-4 border-b border-gray-600/30':
                                            index !==
                                            command.subCommands.length - 1,
                                    })}
                                    custom={index}
                                    variants={subCommandVariants}
                                    initial={variantType.hidden}
                                    animate={variantType.visible}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-base font-bold text-white">{`${
                                            command.trigger
                                        } ${
                                            sc.usage?.length > 0
                                                ? sc.usage
                                                : sc.arg
                                        }`}</span>
                                        <CopyButton
                                            tooltipText="Copy subcommand"
                                            copyText={`${command.trigger} ${
                                                sc.regex ? sc.usage : sc.arg
                                            }`}
                                            onClick={() =>
                                                logEvent('Copy Command', {
                                                    Trigger: `${
                                                        command.trigger
                                                    } ${
                                                        sc.regex
                                                            ? sc.usage
                                                            : sc.arg
                                                    }`,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="font-normal text-gray-300 text-sm leading-relaxed">
                                        <Markdown className="md-inline">
                                            {sc.description ??
                                                'No description.'}
                                        </Markdown>
                                    </div>
                                    <CooldownsAndPermissions
                                        cooldowns={sc.cooldown}
                                        permissions={sc.permissions}
                                        rootPermissions={command.permissions}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        )
    );
};

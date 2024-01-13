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
            <div className="mt-2">
                <a
                    className="text-blue-300 cursor-pointer text-sm inline-flex items-center hover:text-blue-400"
                    onClick={toggleOpen}
                >
                    Subcommands{' '}
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
                            {command.subCommands.map((sc, index) => (
                                <motion.div
                                    key={sc.arg}
                                    className={clsx({
                                        'mb-3':
                                            index !==
                                            command.subCommands.length - 1,
                                    })}
                                    custom={index}
                                    variants={subCommandVariants}
                                    initial={variantType.hidden}
                                    animate={variantType.visible}
                                >
                                    <span className="text-base font-semibold">{`${
                                        command.trigger
                                    } ${
                                        sc.usage?.length > 0 ? sc.usage : sc.arg
                                    }`}</span>
                                    <CopyButton
                                        tooltipText="Copy subcommand"
                                        copyText={`${command.trigger} ${
                                            sc.regex ? sc.usage : sc.arg
                                        }`}
                                        onClick={() =>
                                            logEvent('Copy Command', {
                                                Trigger: `${command.trigger} ${
                                                    sc.regex ? sc.usage : sc.arg
                                                }`,
                                            })
                                        }
                                    />
                                    <div className="font-light text-gray-200 text-sm block md:inline">
                                        <span className="hidden lg:inline-block mx-2">
                                            &#8212;
                                        </span>
                                        <span>
                                            <Markdown>
                                                {sc.description ??
                                                    'No description.'}
                                            </Markdown>
                                        </span>
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

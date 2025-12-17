import React from 'react';
import Markdown from 'react-markdown';
import { useStores } from '../../stores';
import clsx from 'clsx';
import { Pagination } from './Pagination';
import { Subcommands } from './Subcommands';
import { CooldownsAndPermissions } from './CooldownsAndPermissions';
import { CopyButton } from './CopyButton';
import { observer } from 'mobx-react-lite';
import { VariableBrowser } from './VariableBrowser';
import useAnalytics from '../../hooks/useAnalytics';
import { Aliases } from './Aliases';

export const Commands = observer(() => {
    const { profileStore } = useStores();
    const { logEvent } = useAnalytics();
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
                    profileStore.currentCommands.map((c, i) => (
                        <div
                            key={c.trigger}
                            className={clsx(
                                'p-8 transition-colors duration-200',
                                {
                                    'border-t border-gray-700/50': i > 0,
                                }
                            )}
                        >
                            <div className="text-xl">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="font-bold text-2xl">
                                        {c.trigger}
                                    </span>
                                    <CopyButton
                                        tooltipText="Copy command"
                                        copyText={c.trigger}
                                        onClick={() =>
                                            logEvent('Copy Command', {
                                                Trigger: c.trigger,
                                            })
                                        }
                                    />
                                </div>
                                <div className="font-normal text-gray-300 text-base leading-relaxed">
                                    <Markdown className="md-inline">
                                        {c.baseCommandDescription
                                            ? c.baseCommandDescription
                                            : c.description ??
                                              'No description.'}
                                    </Markdown>
                                </div>
                            </div>
                            <Aliases aliases={c.aliases} />
                            <CooldownsAndPermissions
                                cooldowns={c.cooldown}
                                permissions={c.permissions}
                            />
                            <Subcommands command={c} />
                            {c.id === 'firebot:commandmanagement' && (
                                <div className="mt-3">
                                    <VariableBrowser />
                                </div>
                            )}
                        </div>
                    ))}
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
                    totalRecords={profileStore.filteredCommands.length}
                    currentPage={profileStore.commandsPagination.currentPage}
                    pageSize={profileStore.commandsPagination.pageSize}
                    onPageChanged={profileStore.setCurrentCommandsPage}
                />
            </div>
        </>
    );
});

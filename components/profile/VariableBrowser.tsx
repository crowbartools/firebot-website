import React, { useState } from 'react';
import Markdown from 'react-markdown';
import { Modal } from './Modal';
import { observer } from 'mobx-react-lite';
import clsx from 'clsx';
import { useStores } from '../../stores';
import { Searchbar } from './Searchbar';
import { CopyButton } from './CopyButton';
import { VariableExamples } from './VariableExamples';
import useAnalytics from '../../hooks/useAnalytics';

export const VariableBrowser: React.FC = observer(() => {
    const { profileStore } = useStores();
    const [variableBrowserModalOpen, setVariableBrowserModalOpen] = useState(
        false
    );
    const { logEvent } = useAnalytics();
    return (
        <section>
            <button
                type="button"
                className={clsx(
                    'inline-flex items-center px-3 py-1.5',
                    'text-xs font-bold rounded-lg shadow-sm text-white',
                    'bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-500',
                    'focus:outline-none focus:ring-2 focus:ring-blue-50/50',
                    'transition-all duration-200 hover:scale-105 transform'
                )}
                onClick={() => {
                    logEvent('Variable Browser Open');
                    setVariableBrowserModalOpen(true);
                }}
            >
                $vars
            </button>
            <Modal
                isOpen={variableBrowserModalOpen}
                onClickAway={() => setVariableBrowserModalOpen(false)}
                onClose={() => setVariableBrowserModalOpen(false)}
                widthClass="w-11/12 md:w-3/5 lg:w-2/5"
            >
                <div className="rounded-2xl overflow-hidden border border-gray-700/50 shadow-2xl">
                    <div className="p-6 bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-sm border-b border-gray-700/50">
                        <h3 className="text-2xl font-bold mb-4">
                            Variable Browser
                        </h3>
                        <Searchbar
                            onSearch={(query) => {
                                if (query?.length > 0) {
                                    logEvent('Variable Search', {
                                        Query: query.toLowerCase(),
                                    });
                                }
                                profileStore.setVariableQuery(query);
                            }}
                            placeholder="Search variables"
                        />
                    </div>
                    <div className="h-[50vh] overflow-y-scroll bg-gray-900/95 backdrop-blur-sm pt-4">
                        {profileStore.filteredVariables.map((v, i) => (
                            <div
                                key={v.handle}
                                className={clsx('mb-4 px-6 pb-4', {
                                    'border-b border-gray-700/30':
                                        i !==
                                        profileStore.filteredVariables.length -
                                            1,
                                })}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="font-bold text-lg font-mono text-white">
                                        ${v.usage ?? v.handle}
                                    </span>
                                    <CopyButton
                                        copyText={'$' + (v.usage ?? v.handle)}
                                        onClick={() => {
                                            logEvent('Variable Copy', {
                                                Variable:
                                                    '$' + (v.usage ?? v.handle),
                                            });
                                        }}
                                    />
                                </div>
                                <div className="text-gray-300 text-sm leading-relaxed">
                                    <Markdown className="md-inline">
                                        {v.description}
                                    </Markdown>
                                </div>
                                <VariableExamples examples={v.examples} />
                            </div>
                        ))}
                    </div>
                </div>
            </Modal>
        </section>
    );
});

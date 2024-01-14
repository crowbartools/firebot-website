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
                    'inline-flex items-center px-1.5 py-1 border border-transparent',
                    'text-xs font-medium rounded-md  shadow-sm text-white',
                    'bg-blue-500 hover:bg-blue-600 focus:outline-none',
                    'focus:ring-2 focus:ring-offset-2 focus:ring-blue-300'
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
                <div className="rounded-lg overflow-hidden border-2 border-gray-700">
                    <div className="p-6 bg-gray-800 text-2xl border-b-2 border-gray-700">
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
                    <div className="h-[50vh] overflow-y-scroll bg-gray-900 pt-3">
                        {profileStore.filteredVariables.map((v) => (
                            <div key={v.handle} className="mb-3 px-4">
                                <b>
                                    ${v.usage ?? v.handle}{' '}
                                    <CopyButton
                                        copyText={'$' + (v.usage ?? v.handle)}
                                        onClick={() => {
                                            logEvent('Variable Copy', {
                                                Variable:
                                                    '$' + (v.usage ?? v.handle),
                                            });
                                        }}
                                    />
                                </b>
                                <div className="text-gray-400">
                                    <Markdown className="md-inline">{v.description}</Markdown>
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

import { Modal } from '../profile/Modal';
import { ExclamationIcon } from '@heroicons/react/solid';

export const HowToModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
    isOpen,
    onClose,
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            onClickAway={onClose}
            widthClass="w-11/12 md:w-3/5 lg:w-2/5"
        >
            <div className="rounded-lg overflow-hidden border-2 border-gray-700 p-5">
                <h1 className="text-2xl font-bold text-gray-100">
                    Steps to be featured here:
                </h1>
                <ol className="mt-2 list-decimal list-inside">
                    <li>Ensure you are running the latest Firebot version</li>
                    <li>Go to the Settings area in Firebot</li>
                    <li>Turn on "Feature My Stream" in the General tab</li>
                    <li>
                        Go live and you should appear here within a few minutes!
                        🎉
                    </li>
                </ol>
                <div className="rounded-md bg-blue-400/10 p-4 mt-5 ring-1 ring-inset ring-blue-400/30">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <ExclamationIcon
                                className="h-5 w-5 text-blue-400"
                                aria-hidden="true"
                            />
                        </div>
                        <div className="ml-3">
                            <div className="text-sm text-blue-400">
                                <p>
                                    We reserve the right to hide content at our
                                    discretion, including streams categorized or
                                    tagged with mature themes such as the
                                    hot-tub category or drug-related tags.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

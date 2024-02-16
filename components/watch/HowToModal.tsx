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
                <h1 className="text-2xl font-extrabold">
                    Want to feature your stream here?
                </h1>
                <h2 className="text-lg font-bold mt-5">Here's how:</h2>
                <ol className="list-decimal list-inside">
                    <li>Ensure you are running the latest Firebot version</li>
                    <li>Go to the Settings area in Firebot</li>
                    <li>Turn on "Feature My Stream" in the General tab</li>
                    <li>
                        Go live and you should appear here within a few minutes!
                        🎉
                    </li>
                </ol>
                <div className="rounded-md bg-blue-500/50 p-4 mt-5">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <ExclamationIcon
                                className="h-5 w-5 text-cyan-100"
                                aria-hidden="true"
                            />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-cyan-50">
                                Please note
                            </h3>
                            <div className="mt-2 text-sm text-white">
                                <p>
                                    We reserve the right to hide content on this
                                    page at our own discretion. Streams marked
                                    in categories or tags related to mature
                                    content may be hidden from the page.
                                    <br />
                                    <br />
                                    Examples include the hot-tub category and
                                    tags related to drug use.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

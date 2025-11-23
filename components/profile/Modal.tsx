import { XIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import React, { ReactNode, useRef } from 'react';
import { createPortal } from 'react-dom';
import { withoutSsr } from '../../utils/withoutSsr';

interface Props {
    children: ReactNode;
    isOpen: boolean;
    widthClass?: string;
    onClickAway: () => void;
    onClose: () => void;
}

const ModalComponent: React.FC<Props> = ({
    children,
    isOpen,
    widthClass = 'w-96',
    onClickAway,
    onClose,
}) => {
    const modalRef = useRef<HTMLDivElement>();

    if (isOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'unset';
    }

    const onBackdropClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        if (!modalRef.current.contains(event.target as Node)) {
            onClickAway();
        }
    };

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ backgroundColor: 'rgba(0,0,0, 0.0)' }}
                    animate={{
                        backgroundColor: 'rgba(0,0,0, 0.5)',
                        transition: { duration: 0.2 },
                    }}
                    exit={{
                        backgroundColor: 'rgba(0,0,0, 0.0)',
                        transition: { duration: 0.2 },
                    }}
                    className={clsx(
                        'fixed top-0 bottom-0 left-0 right-0',
                        'z-50 overflow-auto flex justify-center'
                    )}
                    onClick={onBackdropClick}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            transition: {
                                damping: 30,
                                stiffness: 500,
                                type: 'spring',
                            },
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.8,
                            transition: {
                                damping: 30,
                                stiffness: 500,
                                type: 'spring',
                            },
                        }}
                        className={clsx('relative shadow my-10', widthClass)}
                    >
                        <div
                            ref={modalRef}
                            className="bg-gray-800 rounded-2xl mb-10 relative"
                        >
                            <button
                                className={clsx(
                                    'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
                                    'text-white rounded-full w-10 h-10 absolute right-0',
                                    'top-0 transform -translate-y-3 translate-x-3',
                                    'flex justify-center items-center',
                                    'transition-all duration-200 hover:scale-110 z-10',
                                    'border-2 border-gray-900'
                                )}
                                type="button"
                                onClick={() => onClose()}
                                aria-label="Close modal"
                            >
                                <XIcon className="w-6 h-6" />
                            </button>
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body,
        'report-modal'
    );
};

export const Modal = withoutSsr(ModalComponent);

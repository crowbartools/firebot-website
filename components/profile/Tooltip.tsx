import React, { useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { usePopper } from 'react-popper';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { Placement } from '@popperjs/core';

interface Props {
    children: React.ReactElement;
    /**
     * The text shown in the tooltip
     */
    content: string | React.ReactNode;
    placement?: Placement;
    wrapperClassName?: string;
    disabled?: boolean;
}

const ARROW_SIZE = 10;

export const Tooltip: React.FC<Props> = ({
    children,
    content,
    placement = 'top',
    wrapperClassName,
    disabled = false,
}) => {
    const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
    const [arrowElement, setArrowElement] = useState<HTMLSpanElement | null>(null);
    const [isHovered, setIsHovered] = useState(false);

    const { styles, attributes, state } = usePopper(referenceElement, popperElement, {
        placement,
        modifiers: [
            {
                name: 'arrow',
                options: {
                    element: arrowElement,
                },
            },
            {
                name: 'offset',
                options: {
                    offset: [0, ARROW_SIZE],
                },
            },
            {
                name: 'flip',
                options: {
                    fallbackPlacements: ['bottom', 'left', 'right'],
                },
            },
            {
                name: 'preventOverflow',
                options: {
                    padding: 8,
                },
            },
        ],
    });

    const handleMouseEnter = useCallback(() => setIsHovered(true), []);
    const handleMouseLeave = useCallback(() => setIsHovered(false), []);

    const currentPlacement = state?.placement ?? 'top';

    const getArrowStyles = (): React.CSSProperties => {
        const base: React.CSSProperties = {
            position: 'absolute',
            width: 0,
            height: 0,
        };

        if (currentPlacement.startsWith('top')) {
            return {
                ...base,
                borderLeft: `${ARROW_SIZE}px solid transparent`,
                borderRight: `${ARROW_SIZE}px solid transparent`,
                borderTop: `${ARROW_SIZE}px solid`,
                bottom: `-${ARROW_SIZE - 3}px`,
            };
        }
        if (currentPlacement.startsWith('bottom')) {
            return {
                ...base,
                borderBottom: `${ARROW_SIZE}px solid`,
                borderLeft: `${ARROW_SIZE}px solid transparent`,
                borderRight: `${ARROW_SIZE}px solid transparent`,
                top: `-${ARROW_SIZE - 3}px`,
            };
        }
        if (currentPlacement.startsWith('left')) {
            return {
                ...base,
                borderTop: `${ARROW_SIZE}px solid transparent`,
                borderBottom: `${ARROW_SIZE}px solid transparent`,
                borderLeft: `${ARROW_SIZE}px solid`,
                right: `-${ARROW_SIZE - 3}px`,
            };
        }
        if (currentPlacement.startsWith('right')) {
            return {
                ...base,
                borderTop: `${ARROW_SIZE}px solid transparent`,
                borderBottom: `${ARROW_SIZE}px solid transparent`,
                borderRight: `${ARROW_SIZE}px solid`,
                left: `-${ARROW_SIZE - 3}px`,
            };
        }
        return base;
    };

    return (
        <>
            <div
                ref={setReferenceElement}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={clsx(wrapperClassName)}
            >
                {children}
            </div>
            {typeof document !== 'undefined' &&
                createPortal(
                    <AnimatePresence>
                        {isHovered && !disabled && !!content && (
                            <motion.div
                                ref={setPopperElement}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{
                                    duration: 0.1,
                                }}
                                className="text-center pointer-events-none z-[9999] shadow-xl text-sm"
                                style={styles.popper}
                                {...attributes.popper}
                            >
                                <div className="p-2 max-w-[15rem] bg-gray-900 text-white rounded-lg">
                                    {content}
                                </div>
                                <span
                                    ref={setArrowElement}
                                    style={{
                                        ...styles.arrow,
                                        ...getArrowStyles(),
                                    }}
                                    className="text-gray-900"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>,
                    document.body
                )}
        </>
    );
};

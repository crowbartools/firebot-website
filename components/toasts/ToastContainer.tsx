import React from 'react';
import clsx from 'clsx';
import { createPortal } from 'react-dom';
import { withoutSsr } from '../../utils/withoutSsr';

export type ToastContainerProps = {
    children?: React.ReactNode;
};
const ToastContainerComponent = ({ children }: ToastContainerProps) =>
    createPortal(
        <ul
            className={clsx(
                'box-border max-h-full mt-20 fixed list-none flex flex-col'
            )}
            // position toasts in the top center
            style={{
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 999,
            }}
        >
            {children}
        </ul>,
        document.body
    );

export const ToastContainer = withoutSsr(ToastContainerComponent);

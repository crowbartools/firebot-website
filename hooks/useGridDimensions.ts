import { MutableRefObject, useEffect } from 'react';
import { useRafState } from 'react-use';

const isBrowser = typeof window !== 'undefined';

const getGridDimensions = (gridElement?: HTMLElement) => {
    const gridColumnCount = gridElement
        ? getComputedStyle(gridElement)
              .getPropertyValue('grid-template-columns')
              .split(' ').length
        : 0;

    const gridRowCount = gridElement
        ? getComputedStyle(gridElement)
              .getPropertyValue('grid-template-rows')
              .split(' ').length
        : 0;
    return {
        columns: gridColumnCount,
        rows: gridRowCount,
    };
};

export const useGridDimensions = (gridRef: MutableRefObject<HTMLElement>) => {
    const [state, setState] = useRafState(getGridDimensions(gridRef.current));

    useEffect((): (() => void) | void => {
        if (isBrowser) {
            const handler = () => {
                const newDimensions = getGridDimensions(gridRef.current);
                if (
                    newDimensions.columns === state.columns &&
                    newDimensions.rows === state.rows
                ) {
                    return;
                }
                setState(newDimensions);
            };

            window.addEventListener('resize', handler);

            return () => {
                window.removeEventListener('resize', handler);
            };
        }
    }, [gridRef.current, state, setState]);

    useEffect(() => {
        if (gridRef.current) {
            setState(getGridDimensions(gridRef.current));
        }
    }, [gridRef.current]);

    return state;
};

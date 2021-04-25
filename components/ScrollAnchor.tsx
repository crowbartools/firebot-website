import React from 'react';

interface Props {
    anchorId: string;
}

export const ScrollAnchor: React.FC<Props> = ({ anchorId }) => (
    <span className="relative">
        <a id={anchorId} style={{ position: 'absolute', top: '-100px' }}></a>
    </span>
);

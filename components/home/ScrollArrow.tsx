import { ChevronDownIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import Sticky from 'react-sticky-el';

export const ScrollArrow: React.FC = () => {
    const [fixed, setFixed] = useState(true);
    return (
        <Sticky
            mode="bottom"
            stickyClassName="w-full flex justify-center align-center pb-5"
            onFixedToggle={setFixed}
        >
            <div className="h-10 w-10 text-white opacity-50">
                {fixed && <ChevronDownIcon />}
            </div>
        </Sticky>
    );
};

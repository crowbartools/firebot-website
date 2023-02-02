import {
    ColorSwatchIcon
} from '@heroicons/react/outline';
import React from 'react';
import { Command } from '../../types/profile';
import { Tooltip } from './Tooltip';

export const Aliases: React.FC<{
    aliases?: Command['aliases'];
}> = ({ aliases }) =>
    (!!aliases?.length) && (
        <div className="flex items-center text-sm mt-1">
            <Tooltip content="Aliases">
                <span className="flex items-center">
                    <ColorSwatchIcon className="text-gray-200 mr-1 w-5 h-5 inline-block" />
                    {aliases.map((a) => (
                        <span
                            key={a}
                            className="bg-gray-700 px-2 py-0.5 rounded mr-1 text-xs text-gray-200"
                        >
                            {a}
                        </span>
                    ))}
                </span>
            </Tooltip>
        </div>
    );

import { Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { Tooltip } from './Tooltip';
import { useIsOverflow } from '../../hooks/useIsOverflow';

interface Props {
    options: Array<{ id: string; name: string }>;
    selected: this['options'][0];
    onSelected: (selected: this['options'][0]) => void;
}

export const Select: React.FC<Props> = ({
    options,
    selected: initialSelected,
    onSelected,
}) => {
    const [selectedOption, setSelectedOption] = useState(initialSelected);

    useEffect(() => {
        setSelectedOption(initialSelected);
    }, [initialSelected]);

    const setSelected = (option) => {
        setSelectedOption(option);
        onSelected(option);
    };

    const { ref, isOverflow } = useIsOverflow(selectedOption?.name);

    return (
        <Listbox value={selectedOption} onChange={setSelected}>
            {({ open }) => (
                <>
                    <div className="relative">
                        <Tooltip content={selectedOption?.name} disabled={!isOverflow}>
                            <Listbox.Button
                                className={clsx(
                                    'bg-gray-700/80 backdrop-blur-sm relative w-full rounded-xl shadow-sm pl-3 pr-10',
                                    'py-3 text-left cursor-default text-base md:text-sm transition-all duration-200',
                                    'border border-gray-600/50 hover:bg-gray-700',
                                    'focus:ring-2 focus:ring-blue-400',
                                    {
                                        'ring-2 ring-blue-400': open,
                                    }
                                )}
                            >
                                <span ref={ref} className="block truncate">
                                    {selectedOption.name}
                                </span>
                                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                    <SelectorIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </span>
                            </Listbox.Button>
                        </Tooltip>
                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute z-10 mt-1 w-full bg-gray-700/95 backdrop-blur-sm shadow-2xl max-h-60 rounded-xl py-1 text-base ring-1 ring-gray-600/50 overflow-auto focus:outline-none sm:text-sm border border-gray-600/50">
                                {options.map((option) => (
                                    <ListboxOption key={option.id} option={option} />
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    );
};

function ListboxOption({ option }: { option: { id: string; name: string } }) {
    const { ref, isOverflow } = useIsOverflow(option.name);
    return <Tooltip content={option.name} placement="right" disabled={!isOverflow}>
        <Listbox.Option
            className={({ active }) =>
                clsx(
                    active
                        ? 'text-white bg-gradient-to-r from-blue-400/80 to-cyan-500/80'
                        : 'text-gray-100',
                    'cursor-default select-none relative py-2 pl-3 pr-9 transition-colors duration-150'
                )
            }
            value={option}
        >
            {({ selected }) => (
                <>
                    <span
                        ref={ref}
                        className={clsx(
                            selected
                                ? 'font-semibold'
                                : 'font-normal',
                            'block truncate'
                        )}
                    >
                        {option.name}
                    </span>

                    {selected ? (
                        <span
                            className={clsx(
                                'text-white absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                        >
                            <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                            />
                        </span>
                    ) : null}
                </>
            )}
        </Listbox.Option>
    </Tooltip>
}
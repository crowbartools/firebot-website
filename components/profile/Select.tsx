import { Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import clsx from 'clsx';

interface Props {
    options: Array<{ id: string; name: string }>;
    selected: this['options'][0];
    onSelected: (selected: this['options'][0]) => void;
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
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

    return (
        <Listbox value={selectedOption} onChange={setSelected}>
            {({ open }) => (
                <>
                    <div className="relative">
                        <Listbox.Button
                            className={clsx(
                                'bg-gray-700 relative w-full rounded-lg shadow-sm pl-3 pr-10',
                                'py-3 text-left cursor-default focus:outline-none text-base md:text-sm',
                                'focus:ring-2 ring-blue-400',
                                {
                                    'ring-2 ring-blue-400': open,
                                }
                            )}
                        >
                            <span className="block truncate">
                                {selectedOption.name}
                            </span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <SelectorIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </span>
                        </Listbox.Button>
                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute z-10 mt-1 w-full bg-gray-600 shadow-lg max-h-60 rounded-lg py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                {options.map((option) => (
                                    <Listbox.Option
                                        key={option.id}
                                        className={({ active }) =>
                                            classNames(
                                                active
                                                    ? 'text-gray-50 bg-blue-600'
                                                    : 'text-gray-50',
                                                'cursor-default select-none relative py-2 pl-3 pr-9'
                                            )
                                        }
                                        value={option}
                                    >
                                        {({ selected }) => (
                                            <>
                                                <span
                                                    className={classNames(
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
                                                        className={classNames(
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
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    );
};

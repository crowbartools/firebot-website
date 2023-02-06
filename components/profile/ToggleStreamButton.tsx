import { faVideo, faVideoSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { Fragment } from 'react';
import { useStores } from '../../stores';

export const ToggleStreamButton: React.FC = observer(() => {
    const { profileStore } = useStores();

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div className="flex">
                <Menu.Button className="bg-transparent outline-none ring-0">
                    <div
                        className={clsx(
                            'cursor-pointer w-8 text-center mt-2 lg:ml-3 lg:mt-0 leading-[1]',
                            {
                                'hover:opacity-75': profileStore.showStream,
                                'opacity-50 hover:opacity-75':
                                    !profileStore.showStream,
                            }
                        )}
                    >
                        <FontAwesomeIcon
                            className="w-7 h-7 text-white text-xl"
                            icon={
                                profileStore.showStream ? faVideo : faVideoSlash
                            }
                        />
                    </div>
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute left-1/2 -translate-x-1/2 mt-3 w-56 divide-y divide-gray-700 rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    <div className="px-1 py-1 ">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={`${
                                        active
                                            ? 'bg-gray-600 text-white'
                                            : 'text-white'
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    onClick={profileStore.toggleShowStream}
                                >
                                    {profileStore.showStream
                                        ? 'Hide stream preview'
                                        : 'Show stream preview'}
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                    {profileStore.showStream && (
                        <div className="px-1 py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${
                                            active ? 'bg-gray-600' : ''
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm text-white`}
                                        onClick={() =>
                                            profileStore.setStreamInFront(true)
                                        }
                                    >
                                        Bring stream to front
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    )}
                </Menu.Items>
            </Transition>
        </Menu>
    );
});

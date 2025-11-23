import clsx from 'clsx';
import { motion } from 'framer-motion';
import React, { cloneElement } from 'react';
import Sticky from 'react-stickynode';
import { useStores } from '../../stores';

interface Props {
    activeTabIndex: number;
    config: Record<
        string,
        {
            content: React.ReactElement;
            toolbar: (mobile: boolean) => React.ReactElement;
        }
    >;
    onTabClick: (tabIndex: number) => void;
    extraData?: any;
}
export const Tabs: React.FC<Props> = ({
    activeTabIndex,
    config,
    onTabClick,
}) => {
    const { appStore } = useStores();
    return (
        <>
            <Sticky
                innerActiveClass="mb-5 z-50 px-3 lg:px-[7rem] z-50 !w-[100%] left-0"
                onStateChange={(state) => {
                    appStore.setTabBarStuck(
                        state.status === Sticky.STATUS_FIXED
                    );
                }}
                enableTransforms={false}
                top={100}
            >
                <>
                    <nav className="flex justify-center lg:justify-start pb-1">
                        {Object.entries(config).map(
                            ([tabName, { toolbar }], index) => (
                                <>
                                    <a
                                        key={index}
                                        aria-current={
                                            index === activeTabIndex
                                                ? 'page'
                                                : 'false'
                                        }
                                        onClick={() => onTabClick(index)}
                                        className={clsx(
                                            `text-2xl font-semibold relative py-3 px-4 cursor-pointer select-none rounded-t-lg`,
                                            {
                                                'text-gray-400 hover:text-gray-200':
                                                    index !== activeTabIndex,
                                                'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500':
                                                    index === activeTabIndex,
                                                'ml-2': index > 0,
                                            }
                                        )}
                                    >
                                        {tabName}
                                        <div className="absolute bottom-0 left-0 w-full flex justify-center">
                                            {index === activeTabIndex && (
                                                <motion.span
                                                    className="rounded h-1 bg-gradient-to-r from-blue-400 to-blue-500 w-full shadow-lg"
                                                    layoutId="underline"
                                                ></motion.span>
                                            )}
                                        </div>
                                    </a>

                                    {index === activeTabIndex && (
                                        <div
                                            key={tabName}
                                            className="order-last ml-auto lg:block hidden"
                                        >
                                            {toolbar(false)}
                                        </div>
                                    )}
                                </>
                            )
                        )}
                    </nav>
                    {Object.entries(config).map(
                        ([tabName, { toolbar }], index) =>
                            index === activeTabIndex && (
                                <div
                                    key={tabName}
                                    className="lg:hidden block mt-4"
                                >
                                    {toolbar(true)}
                                </div>
                            )
                    )}
                </>
            </Sticky>
            <div className="mt-6 lg:mt-10">
                {Object.entries(config).map(
                    ([, { content }], index) =>
                        index === activeTabIndex &&
                        cloneElement(content, { key: index })
                )}
            </div>
        </>
    );
};

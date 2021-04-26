import { LightningBoltIcon, TemplateIcon } from '@heroicons/react/outline';

export default function FeatureShowcaseSection() {
    return (
        <div className="relative pt-16 pb-32 overflow-hidden">
            <div>
                <div className="lg:mx-auto lg:max-w-7xl xl:max-w-8xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24 xl:gap-28">
                    <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-32 xl:py-44 lg:max-w-none lg:mx-0 lg:px-0 lg:col-start-2">
                        <div>
                            <div>
                                <span className="h-12 w-12 rounded-md flex items-center justify-center bg-blue-500">
                                    <TemplateIcon
                                        className="h-6 w-6 text-white"
                                        aria-hidden="true"
                                    />
                                </span>
                            </div>
                            <div className="mt-6">
                                <h2 className="text-3xl xl:text-4xl font-extrabold tracking-tight text-white">
                                    Modern, easy-to-use UI
                                </h2>
                                <p className="mt-4 text-lg xl:text-xl text-gray-400">
                                    Why choose function over form when you can
                                    have both! Utilizing modern technologies,
                                    Firebot has been built from the ground up
                                    with usability in mind. The result is a UI
                                    that is equal parts intuitive and beautiful.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-start-1">
                        <div className="pr-4 -ml-48 sm:pr-6 md:-ml-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                            <img
                                className="w-full border-2 border-gray-800 rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                                src="/fb-viewer-detail.png"
                                alt="Customer profile user interface"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative mt-24">
                <div className="lg:mx-auto lg:max-w-7xl xl:max-w-8xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24 xl:gap-28">
                    <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-40 xl:py-48 lg:max-w-none lg:mx-0 lg:px-0">
                        <div>
                            <div>
                                <span className="h-12 w-12 rounded-md flex items-center justify-center bg-blue-500">
                                    <LightningBoltIcon
                                        className="h-6 w-6 text-white"
                                        aria-hidden="true"
                                    />
                                </span>
                            </div>
                            <div className="mt-6">
                                <h2 className="text-3xl xl:text-4xl font-extrabold tracking-tight">
                                    Powerful Effects System
                                </h2>
                                <p className="mt-4 text-lg xl:text-2xl text-gray-500">
                                    At the core of Firebot is a simple, yet
                                    powerful Effect system that allows you to
                                    program the bot to do just about anything
                                    with no programming knowledge needed.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 sm:mt-16 lg:mt-0">
                        <div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                            <img
                                className="w-full border-2 border-gray-800 rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                                src="./fb-effects-list.png"
                                alt="Inbox user interface"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

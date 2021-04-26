import React, { SVGProps } from 'react';
import {
    ChatIcon,
    AnnotationIcon,
    PuzzleIcon,
    ClockIcon,
    CashIcon,
    TicketIcon,
    StarIcon,
    IdentificationIcon,
    ShieldCheckIcon,
} from '@heroicons/react/outline';
import Tilt from 'react-tilt';
import { ScrollArrow } from '..';

type Feature = {
    name: string;
    description: string;
    icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
};

const features: Feature[] = [
    {
        name: 'Chat Commands',
        description:
            'Firebot also allows streamers to take control over their chat. The commands system will help you provide your chat with fun and useful commands.',
        icon: AnnotationIcon,
    },
    {
        name: 'Chat Feed',
        description:
            'The chat feed built directly into Firebot allows you to not only interact with your chat, but also keep an eye on moderation actions as they happen.',
        icon: ChatIcon,
    },
    {
        name: 'Event Triggers',
        description:
            'Trigger effects off a plethora of events. Want to give currency when someone subs? Play fanfare when you get a donation? Create your own custom alerts? No problem!',
        icon: StarIcon,
    },
    {
        name: 'Currencies',
        description:
            'Reward your viewers with currency! The longer a viewer watches, the more currency they get. You can create as many currencies as you wish.',
        icon: CashIcon,
    },
    {
        name: 'Timers',
        description:
            'The Timer system is a way to easily create repeating commands and effects that will fire at certain intervals or after a certain number of chat messages have passed.',
        icon: ClockIcon,
    },
    {
        name: 'Viewer Tracking',
        description:
            'Easily see who has watched for the most time, chatted the most and more!',
        icon: IdentificationIcon,
    },
    {
        name: 'Games',
        description:
            'Firebot has several built-in games including Slots and Heists. You can also harness the power of the Effects System to build your own unique games!',
        icon: TicketIcon,
    },
    {
        name: 'Moderation',
        description:
            'Keep your chat clean and spam free with several chat moderation features.',
        icon: ShieldCheckIcon,
    },
    {
        name: 'Integrations',
        description:
            'Firebot integrates with a number of common tools and apps such as Streamlabs, StreamElements, StreamLoots, Discord, Phillips Hue, and more.',
        icon: PuzzleIcon,
    },
];

const AllFeaturesSection: React.FC = () => {
    return (
        <>
            <div className="mt-12 mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl xl:max-w-8xl py-4 pb-5 ">
                <ScrollArrow />
                <div className="text-blue-400 text-xl xl:text-2xl text-center tracking-wide">
                    ALL FEATURES
                </div>
                <div className="text-4xl xl:text-5xl font-bold text-center mt-3 mb-7">
                    Everything you need to run your stream
                </div>
                <div className="text-xl xl:text-2xl text-gray-300 text-center px-6 md:px-36 mt-1 font-light">
                    Firebot is a free, open source, all-in-one bot for Twitch.
                    It's packed full of everything you need to make your stream
                    fun and interactive.
                </div>
            </div>
            <div className="mt-16 mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl xl:max-w-8xl py-4">
                <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10 xl:gap-x-10 xl:gap-y-12">
                    {features.map((feature) => (
                        <Tilt
                            options={{ max: 25, scale: 1.1 }}
                            key={feature.name}
                        >
                            <div
                                key={feature.name}
                                className="relative bg-gray-800 flex flex-col rounded-lg px-7 min-h-full"
                            >
                                <div className="absolute flex transform -translate-x-1/2 -translate-y-1/2 left-1/2 items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white shadow">
                                    <feature.icon
                                        className="h-8 w-8"
                                        aria-hidden="true"
                                    />
                                </div>
                                <p className="mt-14 text-xl xl:text-2xl leading-6 font-medium text-white text-center">
                                    {feature.name}
                                </p>
                                <div className="my-7 text-base xl:text-lg text-gray-400 text-center">
                                    {feature.description}
                                </div>
                            </div>
                        </Tilt>
                    ))}
                </dl>
            </div>
        </>
    );
};

export default AllFeaturesSection;

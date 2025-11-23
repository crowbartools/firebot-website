import { motion } from 'framer-motion';
import useAnalytics from '../../hooks/useAnalytics';

const cards = [
    {
        title: 'Community Discord',
        href: 'https://discord.gg/tTmMbrG',
        description:
            'Have a question, got feedback, or just want to say hello? Jump into our CrowbarTools Discord server! Devs and helpful community members are here to provide support.',
        imageUrl: '/crowbarbanner.png',
    },
    {
        title: 'Video Tutorials',
        href: 'https://www.youtube.com/playlist?list=PLKM4AhNKMRk4ecbLtTpCk1nXtVKhiWSqV',
        description:
            "Dive into Firebot with these awesome community made tutorials. With topics covering everything from initial setup, simple commands, alert queues, chat games, and more you'll be able to learn everything you need to master the bot.",
        imageUrl:
            'https://i.ytimg.com/vi/QllhrNGFuwM/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCGXi1w_TgMail_uDhV7LEOsBtnKg',
    },
    {
        title: 'Wiki, Issue Tracking, Source Code',
        href: 'https://github.com/crowbartools/Firebot',
        description:
            "Firebot's wiki, issue tracking, and source code are all on GitHub. Go here to dig through the wiki, report bugs/submit feature request, or contribute code!",
        imageUrl: '/gh-repo.png',
    },
];

const HelpSection: React.FC = () => {
    const { logEvent } = useAnalytics();
    return (
        <div className="relative pt-16 pb-20 px-4 sm:px-6 lg:pb-28 lg:px-8">
            <div className="absolute inset-0">
                <div className="h-1/3 sm:h-2/3" />
            </div>
            <div className="relative max-w-7xl mx-auto">
                <div className="text-center">
                    <h2 className="text-3xl 2xl:text-5xl tracking-tight font-extrabold text-gray-50 sm:text-4xl">
                        Get the most out of Firebot
                    </h2>
                    <p className="mt-3 max-w-2xl mx-auto text-xl 2xl:max-w-3xl 2xl:text-2xl text-gray-400 sm:mt-4">
                        Have a question or want to learn how to use Firebot? No
                        worries! Check out the options below.
                    </p>
                </div>
                <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
                    {cards.map((post) => (
                        <motion.a
                            key={post.title}
                            className="flex flex-col rounded-lg shadow-lg overflow-hidden"
                            href={post.href}
                            target="_blank"
                            onClick={() =>
                                logEvent('Help Card Click', {
                                    Card: post.title,
                                })
                            }
                            whileHover={{
                                scale: 1.04,
                                transition: {
                                    type: 'spring',
                                    bounce: 0.6,
                                },
                            }}
                        >
                            <div className="flex-shrink-0">
                                <img
                                    className="h-48 w-full object-cover"
                                    src={post.imageUrl}
                                    alt=""
                                />
                            </div>
                            <div className="flex-1 bg-gray-800 p-6 flex flex-col justify-between">
                                <div className="flex-1">
                                    <div className="block mt-2">
                                        <p className="text-xl font-semibold text-gray-50">
                                            {post.title}
                                        </p>
                                        <p className="mt-3 text-base text-gray-400">
                                            {post.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HelpSection;

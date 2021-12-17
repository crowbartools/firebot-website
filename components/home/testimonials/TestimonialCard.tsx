import React, { Fragment, useState } from 'react';
import { Testimonial } from '../../../constants/testimonials';
import { TwitchUser } from '../../../types/twitch';
import { Modal } from '../../profile/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitch } from '@fortawesome/free-brands-svg-icons';
import { motion } from 'framer-motion';
import useAnalytics from '../../../hooks/useAnalytics';

export const TestimonialCard: React.FC<{
    testimonial: Testimonial;
    user: TwitchUser;
    onReadMoreClicked: () => void;
}> = ({ testimonial, user, onReadMoreClicked }) => {
    const [readMoreModalOpen, setReadMoreModalOpen] = useState(false);
    const { logEvent } = useAnalytics();
    return (
        <section className="overflow-hidden">
            <div className="relative max-w-7xl mx-auto pt-20 pb-12 px-10 sm:px-6 lg:px-8 lg:py-20">
                <div className="relative lg:flex lg:items-center">
                    <div className="hidden lg:block lg:flex-shrink-0">
                        <img
                            className="h-64 w-64 rounded-full xl:h-80 xl:w-80 border-4 border-black bg-gradient-to-br from-gray-600 to-light-gray-800"
                            src={user.profile_image_url}
                            alt=""
                        />
                    </div>

                    <div className="relative lg:ml-10">
                        <blockquote className="relative">
                            <div>
                                <svg
                                    className="h-12 w-12 text-white opacity-25"
                                    fill="currentColor"
                                    viewBox="0 0 32 32"
                                    aria-hidden="true"
                                >
                                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                                </svg>
                                <div className="text-lg md:text-2xl leading-9 font-medium text-gray-50 mt-6">
                                    <p>
                                        {testimonial.text}{' '}
                                        {!!testimonial.textExtended && (
                                            <button
                                                type="button"
                                                className="inline-block text-sm font-medium text-blue-400 hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                onClick={() => {
                                                    onReadMoreClicked();
                                                    setReadMoreModalOpen(true);
                                                    logEvent(
                                                        'Testimonial Read More Click',
                                                        {
                                                            User:
                                                                user.display_name,
                                                        }
                                                    );
                                                }}
                                            >
                                                Read full
                                            </button>
                                        )}
                                    </p>
                                </div>
                            </div>
                            <footer className="mt-8">
                                <div className="flex items-center md:items-start md:flex-col">
                                    <div className="flex-shrink-0 lg:hidden">
                                        <img
                                            className="h-12 w-12 rounded-full"
                                            src={user.profile_image_url}
                                            alt=""
                                        />
                                    </div>
                                    <div className="ml-4 lg:ml-0 md:flex md:items-center md:justify-center">
                                        <div className="text-base font-medium text-white">
                                            {user.display_name}
                                        </div>

                                        <svg
                                            className="hidden md:block mx-1 h-5 w-5 text-blue-400"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M11 0h3L9 20H6l5-20z" />
                                        </svg>

                                        <div className="text-sm font-medium text-gray-400 leading-none">
                                            {testimonial.type}
                                        </div>
                                    </div>
                                    <div className="flex items-center md:mt-2">
                                        <motion.a
                                            whileHover={{
                                                scale: 1.2,
                                                transition: {
                                                    type: 'spring',
                                                    bounce: 0.8,
                                                },
                                            }}
                                            onClick={() =>
                                                logEvent(
                                                    'Testimonial Profile Click',
                                                    { Channel: user.login }
                                                )
                                            }
                                            target="_blank"
                                            rel="noreferrer"
                                            href={`https://twitch.tv/${user.login}`}
                                            className="md:ml-0 ml-3 inline-flex items-center border border-transparent shadow-sm text-sm leading-4 text-indigo-500 hover:text-indigo-400 font-medium rounded-md"
                                        >
                                            <FontAwesomeIcon
                                                className="text-2xl mr-1"
                                                icon={faTwitch}
                                            />
                                            View Channel
                                        </motion.a>
                                        {user.stream?.type == 'live' && (
                                            <div className="ml-3 hidden md:block">
                                                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-700 text-gray-50">
                                                    <svg
                                                        className="-ml-1 mr-1.5 h-3 w-3 text-red-500"
                                                        fill="currentColor"
                                                        viewBox="0 0 8 8"
                                                    >
                                                        <circle
                                                            cx={4}
                                                            cy={4}
                                                            r={3}
                                                        />
                                                    </svg>
                                                    Live now
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {user.stream?.type == 'live' && (
                                    <div className="mt-3 block md:hidden">
                                        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-700 text-gray-50">
                                            <svg
                                                className="-ml-1 mr-1.5 h-3 w-3 text-red-500"
                                                fill="currentColor"
                                                viewBox="0 0 8 8"
                                            >
                                                <circle cx={4} cy={4} r={3} />
                                            </svg>
                                            Live now
                                        </span>
                                    </div>
                                )}
                            </footer>
                        </blockquote>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={readMoreModalOpen}
                onClickAway={() => setReadMoreModalOpen(false)}
                onClose={() => setReadMoreModalOpen(false)}
                widthClass="w-5/6 md:w-3/5"
            >
                <div className="p-6">
                    {testimonial.textExtended?.split('\n').map((item, key) => {
                        return (
                            <Fragment key={key}>
                                {item}
                                <br />
                            </Fragment>
                        );
                    })}
                </div>
            </Modal>
        </section>
    );
};

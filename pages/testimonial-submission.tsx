import { ArrowNarrowLeftIcon, CheckCircleIcon } from '@heroicons/react/outline';
import axios from 'axios';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import { useSession, signIn, signOut } from 'next-auth/react';
import React, { useState } from 'react';
import { User } from '../components/testimonial/User';

const WEBHOOK_URL =
    'https://discord.com/api/webhooks/912252920186159105/c4SV28ObuGdnGtBt9vKLcMvLURcXjIe3F1MceMtKfFvmzQYDlLETxDXqmdXD2bNhfGgG';

const DISCORD_USERNAME_REGEX = /^.{3,32}#[0-9]{4}$/gim;

export const Testimonial: React.FC = observer(() => {
    const { data: session } = useSession();

    const [testimonial, setTestimonial] = useState('');
    const [streamerType, setStreamerType] = useState('');
    const [discordUser, setDiscordUser] = useState('');
    const [discordUserValid, setDiscordUserValid] = useState(true);

    const [submitting, setSubmitting] = useState(false);
    const [successfulSubmission, setSuccessfulSubmission] = useState(false);

    const reset = () => {
        setTestimonial('');
        setStreamerType('');
        setDiscordUser('');
        setDiscordUserValid(true);
        setSuccessfulSubmission(false);
    };

    const validateDiscordUser = () => {
        setDiscordUserValid(
            (!discordUser.length || DISCORD_USERNAME_REGEX.test(discordUser)) &&
                discordUser.length < 100
        );
    };

    const formValid =
        testimonial.length > 0 &&
        testimonial.length < 2000 &&
        streamerType.length > 0 &&
        streamerType.length < 2000 &&
        discordUserValid;

    const submitTestimonial = async () => {
        if (!formValid || submitting || successfulSubmission) return;

        setSubmitting(true);

        const webhookData = {
            content: null,
            embeds: [
                {
                    color: 5814783,
                    fields: [
                        {
                            name: 'Testimonial',
                            value: testimonial,
                        },
                        {
                            name: 'Streamer Type',
                            value: streamerType,
                            inline: true,
                        },
                        {
                            name: 'Follows',
                            value: (session.user as any).follows ?? 'Unknown',
                            inline: true,
                        },
                        ...(discordUser.length
                            ? [
                                  {
                                      name: 'Discord',
                                      value: discordUser,
                                      inline: true,
                                  },
                              ]
                            : []),
                    ],
                    author: {
                        name: session.user.name,
                        url: `https://twitch.tv/${session.user.name}`,
                        icon_url: session.user.image,
                    },
                },
            ],
        };

        try {
            await axios.post(WEBHOOK_URL, webhookData);
            setSuccessfulSubmission(true);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log('Failed to send webhook :(', error);
        }

        setSubmitting(false);
    };

    return (
        <div className="relative py-16 overflow-hidden">
            <div
                className="relative h-full text-lg max-w-prose mx-auto px-3"
                aria-hidden="true"
            >
                <div>
                    <div className="max-w-7xl mx-auto pb-14 px-4 sm:pb-20 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <p className="mt-1 text-4xl font-extrabold text-gray-50 sm:text-5xl sm:tracking-tight lg:text-6xl">
                                Submit a Testimonial
                            </p>
                            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-400">
                                Has Firebot improved your live streaming
                                experience? We'd love to hear from you! Your
                                testimonial and channel may be showcased on our
                                site in the future.
                            </p>
                        </div>
                    </div>
                </div>
                {!session && (
                    <div className="flex flex-col items-center">
                        <button
                            type="button"
                            onClick={() => signIn('twitch')}
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign in with Twitch
                        </button>
                        <p className="mt-2 text-center text-base text-gray-300">
                            (This is to help prevent spam and to confirm the
                            identity of submissions)
                        </p>
                    </div>
                )}
                <AnimatePresence initial={false}>
                    {session && !successfulSubmission && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{
                                opacity: 0,
                            }}
                        >
                            <div className="flex justify-center items-center mb-14">
                                <User
                                    username={session.user.name}
                                    avatarUrl={session.user.image}
                                    onSignOutClick={signOut}
                                />
                            </div>
                            <div className="flex justify-between">
                                <label
                                    htmlFor="message"
                                    className="block text-base font-medium text-warm-gray-900"
                                >
                                    Testimonial
                                </label>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">
                                    Tell us about why you use Firebot. How has
                                    Firebot enhanced your streams? What excites
                                    you the most about Firebot?
                                </p>
                            </div>
                            <div className="mt-1">
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={6}
                                    className="py-3 px-4 text-base block w-full shadow-sm text-warm-gray-900 outline-none focus:ring-2 focus:ring-blue-400 border border-gray-900 rounded-md bg-gray-700"
                                    aria-describedby="message-max"
                                    value={testimonial}
                                    onChange={(event) =>
                                        setTestimonial(event.target.value)
                                    }
                                />
                            </div>
                            {testimonial.length >= 2000 && (
                                <span className="text-red-500 text-sm">
                                    Must be less than 2000 characters (Currently{' '}
                                    {testimonial.length})
                                </span>
                            )}

                            <div className="flex justify-between mt-6">
                                <label
                                    htmlFor="message"
                                    className="block text-base font-medium text-warm-gray-900"
                                >
                                    Streamer Type
                                </label>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">
                                    What type of streamer would you classify
                                    yourself as? (IE variety, specific game,
                                    music, etc)
                                </p>
                            </div>
                            <div className="mt-1">
                                <input
                                    id="streamerType"
                                    name="streamerType"
                                    type="text"
                                    className="py-3 px-4 block text-base w-full shadow-sm outline-none focus:ring-2 focus:ring-blue-400 border border-gray-900 rounded-md bg-gray-700"
                                    value={streamerType}
                                    onChange={(event) =>
                                        setStreamerType(event.target.value)
                                    }
                                />
                            </div>

                            <div className="flex justify-between mt-6">
                                <label
                                    htmlFor="message"
                                    className="block text-base font-medium text-warm-gray-900"
                                >
                                    Discord Name
                                </label>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">
                                    In case we want to follow up with you.
                                </p>
                            </div>
                            <div className="mt-1">
                                <input
                                    id="streamerType"
                                    name="streamerType"
                                    type="text"
                                    className="py-3 px-4 block text-base w-full shadow-sm outline-none focus:ring-2 focus:ring-blue-400 border border-gray-900 rounded-md bg-gray-700"
                                    value={discordUser}
                                    onChange={(event) => {
                                        setDiscordUser(event.target.value);
                                    }}
                                    onBlur={() => {
                                        validateDiscordUser();
                                    }}
                                    placeholder="Username#0001"
                                />
                            </div>
                            {discordUserValid ? (
                                <span className="text-gray-500 text-sm">
                                    Optional
                                </span>
                            ) : (
                                <span className="text-red-500 text-sm">
                                    Invalid Discord username
                                </span>
                            )}

                            <div className="mt-10">
                                <button
                                    type="submit"
                                    disabled={!formValid}
                                    className={clsx(
                                        'w-full flex justify-center py-3 px-6 border border-transparent rounded-md',
                                        'shadow-sm text-sm font-medium text-white bg-blue-600',
                                        ' focus:outline-none ',
                                        {
                                            'opacity-50 cursor-not-allowed': !formValid,
                                            'hover:bg-blue-700 focus:ring-blue-500 focus:ring-2 focus:ring-offset-2': formValid,
                                        }
                                    )}
                                    onClick={() => {
                                        submitTestimonial();
                                    }}
                                >
                                    <AnimatePresence
                                        exitBeforeEnter
                                        initial={false}
                                    >
                                        {submitting && (
                                            <motion.svg
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </motion.svg>
                                        )}
                                    </AnimatePresence>
                                    Submit
                                </button>
                            </div>
                        </motion.div>
                    )}
                    {session && successfulSubmission && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{
                                opacity: 0,
                            }}
                            className="flex items-center text-center flex-col"
                        >
                            <CheckCircleIcon className="h-56 w-56 text-green-500" />
                            <div>
                                <div className="text-4xl font-bold">
                                    Success!
                                </div>
                                <div className="text-xl text-gray-300">
                                    Thank you so much for taking the time.
                                    <br />
                                    We really appreciate it ♥️
                                </div>
                            </div>
                            <button
                                type="button"
                                className="mt-10 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300"
                                onClick={() => reset()}
                            >
                                <ArrowNarrowLeftIcon
                                    className="-ml-1 mr-3 h-5 w-5"
                                    aria-hidden="true"
                                />{' '}
                                Go Back
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
});

export default Testimonial;

import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';

const faqs: Array<{ question: string; answer: string }> = [
    {
        question: 'Does Firebot cost anything?',
        answer: 'Nope! Firebot is free and always will be.',
    },
    {
        question: 'Is Firebot a cloud-based bot?',
        answer: 'No, Firebot is an app that runs on your computer.',
    },
    {
        question: 'Which streaming platforms does Firebot work on?',
        answer:
            'Firebot works on Twitch. We are evaluating supporting other platforms in the future.',
    },
    {
        question: 'What operating systems are supported?',
        answer:
            'Windows 10 (64 bit) and most common Linux distros. Linux does not get automatic updates at this time. We are also looking to support macOS in the future.',
    },
    {
        question: 'Can I contribute to Firebot?',
        answer:
            'Yes! We welcome any and all contributions. We are passionate about Firebot being community made and driven. Please check out the GitHub repo.',
    },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function FAQSection() {
    return (
        <div className="bg-gray-900">
            <div className="max-w-7xl 2xl:max-w-8xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
                <div className="max-w-3xl 2xl:max-w-4xl mx-auto divide-y-2 divide-gray-700">
                    <h2 className="text-center text-3xl 2xl:text-5xl font-extrabold text-gray-50 sm:text-4xl">
                        Frequently asked questions
                    </h2>
                    <dl className="mt-6 space-y-6 divide-y divide-gray-700">
                        {faqs.map((faq) => (
                            <Disclosure
                                as="div"
                                key={faq.question}
                                className="pt-6"
                            >
                                {({ open }) => (
                                    <>
                                        <dt className="text-lg 2xl:text-xl">
                                            <Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-400">
                                                <span className="font-medium text-gray-50">
                                                    {faq.question}
                                                </span>
                                                <span className="ml-6 h-7 flex items-center">
                                                    <ChevronDownIcon
                                                        className={classNames(
                                                            open
                                                                ? '-rotate-180'
                                                                : 'rotate-0',
                                                            'h-6 w-6 transform'
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            </Disclosure.Button>
                                        </dt>
                                        <Disclosure.Panel
                                            as="dd"
                                            className="mt-2 pr-12"
                                        >
                                            <p className="text-base text-gray-400">
                                                {faq.answer}
                                            </p>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
}

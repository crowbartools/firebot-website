import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { wrap } from 'popmotion';
import { TestimonialCard } from './TestimonialCard';
import { TwitchUser } from '../../../types/twitch';
import { testimonials } from '../../../constants/testimonials';
import {
    ArrowCircleLeftIcon,
    ArrowCircleRightIcon,
} from '@heroicons/react/solid';
import { shuffle } from '../../../utils';
import { withoutSsr } from '../../../utils/withoutSsr';
import useAnalytics from '../../../hooks/useAnalytics';

const variants = {
    enter: (direction: number) => {
        return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => {
        return {
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        };
    },
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accommodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};

const TestimonialCarouselComponent: React.FC<{
    userData: Record<string, TwitchUser>;
}> = ({ userData }) => {
    const { logEvent } = useAnalytics();

    const [[page, direction], setPage] = useState([0, 0]);

    const [autoAdvance, setAutoAdvance] = useState(true);

    const [shuffledTestimonials] = useState(shuffle(testimonials));

    // We only have 0-n testimonials, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
    // then wrap that within 0-n-1 to find our ID in the array below. By passing an
    // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
    // detect it as an entirely new testimonial. So you can infinitely paginate as few as 1.
    const testimonialIndex = wrap(0, shuffledTestimonials.length, page);

    const testimonial = shuffledTestimonials[testimonialIndex];
    const user = userData[testimonial.userId];

    let timeoutId;

    const stopAutoAdvance = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
        setAutoAdvance(false);
    };

    const paginate = (newDirection: number, auto = false) => {
        if (!auto) {
            stopAutoAdvance();
            logEvent('Testimonial Next Button Click');
        }
        setPage([page + newDirection, newDirection]);
    };

    if (autoAdvance) {
        timeoutId = setTimeout(() => {
            paginate(1, true);
        }, 10 * 1000);
    }

    return (
        <>
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    className="absolute"
                    style={{
                        maxWidth: '100vw',
                    }}
                    key={page}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: 'spring', stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 },
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(e, { offset, velocity }) => {
                        const swipe = swipePower(offset.x, velocity.x);

                        if (swipe < -swipeConfidenceThreshold) {
                            paginate(1);
                        } else if (swipe > swipeConfidenceThreshold) {
                            paginate(-1);
                        }
                    }}
                >
                    <TestimonialCard
                        testimonial={testimonial}
                        user={user}
                        onReadMoreClicked={() => stopAutoAdvance()}
                    />
                </motion.div>
            </AnimatePresence>
            <div
                className="absolute cursor-pointer ml-1 md:ml-10 w-8 text-white left-0 opacity-25 hover:opacity-50 z-10"
                onClick={() => paginate(-1)}
            >
                <ArrowCircleLeftIcon />
            </div>
            <div
                className="absolute cursor-pointer mr-1 md:mr-10 w-8 text-white right-0 opacity-25 hover:opacity-50 z-10"
                onClick={() => paginate(1)}
            >
                <ArrowCircleRightIcon />
            </div>
        </>
    );
};

export const TestimonialCarousel = withoutSsr(TestimonialCarouselComponent);

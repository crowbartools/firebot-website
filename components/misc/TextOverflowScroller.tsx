import { Variants, motion } from 'framer-motion';
import { useRef } from 'react';

export const TestOverflowScroller: React.FC<{
    play?: boolean;
    speed?: number;
    children: string;
}> = ({ play, speed = 0.01, children }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    const textWidth = textRef.current?.clientWidth ?? 0;
    const boxWidth = parseFloat(
        containerRef.current
            ? getComputedStyle(containerRef.current).width
            : '0'
    );
    const translateVal = Math.min(boxWidth - textWidth, 0);
    const translateTime = -speed * translateVal;

    const textVariants: Variants = {
        default: {
            x: 0,
            transition: { duration: 0.3, ease: 'linear' },
        },
        scroll: {
            x: `${translateVal}px`,
            transition: {
                duration: translateTime,
                delay: 1,
                ease: 'linear',
                repeat: Infinity,
                repeatDelay: 3,
                repeatType: 'mirror',
            },
        },
    };

    return (
        <motion.div
            ref={containerRef}
            className="overflow-hidden"
            style={{
                WebkitLineClamp: 1,
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                overflow: 'clip',
                wordBreak: 'break-all',
            }}
        >
            <motion.span
                ref={textRef}
                className="whitespace-nowrap"
                variants={textVariants}
                animate={play ? 'scroll' : 'default'}
            >
                {children}
            </motion.span>
        </motion.div>
    );
};

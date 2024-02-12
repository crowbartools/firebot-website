import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useState } from 'react';

export const StreamPreview: React.FC<{
    username: string;
    allowClicks?: boolean;
}> = ({ username, allowClicks }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <motion.div
            animate={{
                display: isLoaded ? 'block' : 'none',
                opacity: isLoaded ? 1.0 : 0,
            }}
            transition={{ duration: 0.5 }}
            className={clsx(
                'absolute inset-0 w-full h-full rounded-lg overflow-hidden',
                {
                    'pointer-events-none': !allowClicks,
                }
            )}
        >
            <iframe
                src={`https://player.twitch.tv/?channel=${username}&parent=localhost&parent=firebot.app&muted=true&autoplay=true&controls=false`}
                className="w-full h-full bg-black"
                onLoad={() => {
                    setIsLoaded(true);
                }}
                allowFullScreen
            ></iframe>
        </motion.div>
    );
};

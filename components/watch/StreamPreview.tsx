import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useState } from 'react';

export const StreamPreview: React.FC<{ username: string }> = ({ username }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    return (
        <motion.div
            animate={{
                display: isLoaded ? 'block' : 'none',
                opacity: isLoaded ? 1.0 : 0,
            }}
            transition={{ duration: 0.5 }}
            className={clsx(
                'absolute left-1/2 -translate-x-1/2 top-0 w-full h-full pointer-events-none'
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

import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useState } from 'react';

export const StreamPreviewImage: React.FC<{ imageUrl: string }> = ({
    imageUrl,
}) => {
    const [previewLoaded, setPreviewLoaded] = useState(false);
    return (
        <motion.img
            key="preview"
            animate={
                previewLoaded
                    ? { opacity: 1, display: 'block' }
                    : { opacity: 0, display: 'none' }
            }
            className={clsx('rounded-lg overflow-hidden pointer-events-none')}
            src={imageUrl.replace('{width}', '1280').replace('{height}', '720')}
            alt="Stream preview image"
            onLoad={() => setPreviewLoaded(true)}
        />
    );
};

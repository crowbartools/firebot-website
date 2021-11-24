import { TwitchUser } from '../../../types/twitch';
import { TestimonialCarousel } from './TestimonialCarousel';

export const TestimonialsSection: React.FC<{
    userData: Record<string, TwitchUser>;
}> = ({ userData }) => {
    return (
        <div>
            <div className="relative max-w-7xl mx-auto mt-20 px-4 sm:px-6 lg:pb-10 pb-10 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl 2xl:text-5xl tracking-tight font-extrabold text-gray-50 sm:text-4xl">
                        Don't just take our word for it
                    </h2>
                    <p className="mt-3 max-w-2xl mx-auto text-xl 2xl:max-w-3xl 2xl:text-2xl text-gray-400 sm:mt-4">
                        See what users have to say (and check out their channels
                        while you're at it!)
                    </p>
                </div>
            </div>
            <div className="w-screen relative flex justify-center items-center h-96 lg:mt-10 mt-20 mb-32 lg:mb-10">
                <TestimonialCarousel userData={userData} />
            </div>
        </div>
    );
};

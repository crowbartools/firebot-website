import { people } from '../../constants/people';
import { TwitchUser } from '../../types/twitch';

const TeamSection: React.FC<{ userData: Record<string, TwitchUser> }> = ({
    userData,
}) => {
    return (
        <div>
            <div className="max-w-7xl 2xl:max-w-8xl mx-auto py-8 px-4 text-center sm:px-6 lg:px-8 pb-16">
                <div className="space-y-8 sm:space-y-12">
                    <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
                        <h2 className="text-3xl 2xl:text-5xl font-extrabold tracking-tight sm:text-4xl">
                            The People
                        </h2>
                        <p className="text-xl text-gray-400">
                            Firebot is built, maintained, and supported by the
                            community. Here's just some of the many
                            contributors.
                        </p>
                    </div>
                    <ul className="mx-auto grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 md:gap-x-6 lg:max-w-5xl 2xl:max-w-6xl lg:gap-x-8 lg:gap-y-12 xl:grid-cols-6">
                        {people.map((person) => {
                            const personData = userData[person.id];
                            return (
                                <li key={person.name}>
                                    <div className="space-y-4">
                                        <img
                                            className="mx-auto h-20 w-20 rounded-full lg:w-24 lg:h-24 shadow-inner"
                                            src={personData?.profile_image_url}
                                            alt=""
                                        />
                                        <div className="space-y-2">
                                            <div className="text-xs font-medium lg:text-sm">
                                                <h3>{person.name}</h3>
                                                <p className="text-blue-400">
                                                    {person.role}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TeamSection;

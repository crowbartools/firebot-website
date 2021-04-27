type Person = {
    name: string;
    role: string;
    imageUrl: string;
};

const people: Person[] = [
    {
        name: 'MageEnclave',
        role: 'Creator / Developer',
        imageUrl:
            'https://static-cdn.jtvnw.net/jtv_user_pictures/fc361bfa-c5e4-46c5-affb-1e0bf45c500d-profile_image-300x300.png',
    },
    {
        name: 'ebiggz',
        role: 'Developer',
        imageUrl:
            'https://static-cdn.jtvnw.net/jtv_user_pictures/5545fe76-a341-4ffb-bc79-7ca8075588a1-profile_image-300x300.png',
    },
    {
        name: 'SReject',
        role: 'Developer',
        imageUrl:
            'https://static-cdn.jtvnw.net/jtv_user_pictures/1896783f-9ecb-4eb7-bf0c-135d0ce0c948-profile_image-300x300.png',
    },
    {
        name: 'ThePerry',
        role: 'Developer',
        imageUrl:
            'https://static-cdn.jtvnw.net/jtv_user_pictures/b379a82f-5e93-4e20-a37d-81b96a5294d6-profile_image-300x300.png',
    },
    {
        name: 'Heyaapl',
        role: 'Tutorials / Support',
        imageUrl:
            'https://static-cdn.jtvnw.net/jtv_user_pictures/31af8729-dea7-4ac9-b0bb-622a5d377b86-profile_image-300x300.png',
    },
    {
        name: 'CorporalGigglesworth',
        role: 'Support',
        imageUrl:
            'https://static-cdn.jtvnw.net/jtv_user_pictures/65e2707471e391eb-profile_image-300x300.jpeg',
    },
    {
        name: 'DragynsLair',
        role: 'Support / Tester',
        imageUrl:
            'https://static-cdn.jtvnw.net/jtv_user_pictures/1f5bad3f-08ed-4eb7-95c3-e788342be35a-profile_image-300x300.png',
    },
    {
        name: 'CaveMobster',
        role: 'Developer',
        imageUrl:
            'https://static-cdn.jtvnw.net/jtv_user_pictures/1456976e-5ff9-424c-a1db-6eb1670a284b-profile_image-300x300.png',
    },
    {
        name: 'Kateract',
        role: 'Developer',
        imageUrl:
            'https://static-cdn.jtvnw.net/jtv_user_pictures/7471b565-293b-4a49-959c-d9a44ee1ea8b-profile_image-300x300.png',
    },
    {
        name: 'Senepa',
        role: 'Developer',
        imageUrl:
            'https://static-cdn.jtvnw.net/jtv_user_pictures/e5853a20-f401-4556-889c-5782a815b5aa-profile_image-300x300.png',
    },
    {
        name: 'Skriglitz',
        role: 'Developer',
        imageUrl:
            'https://static-cdn.jtvnw.net/jtv_user_pictures/23fe8bcd-64e6-467a-ba9f-73c324ce7de6-profile_image-300x300.png',
    },
    {
        name: 'dbkirk4211',
        role: 'Developer',
        imageUrl: 'https://avatars.githubusercontent.com/u/13731197?v=4',
    },
];

const TeamSection: React.FC = () => {
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
                        {people.map((person) => (
                            <li key={person.name}>
                                <div className="space-y-4">
                                    <img
                                        className="mx-auto h-20 w-20 rounded-full lg:w-24 lg:h-24 shadow-inner"
                                        src={person.imageUrl}
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
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TeamSection;

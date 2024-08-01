export type Person = {
    /**
     * Twitch ID
     */
    id: string;
    name: string;
    role: string;
    /**
     * Crowbar Team or Expert memebers
     * If true, user is highlighted on /watch page
     */
    isTeamMember?: boolean;
    /**
     * Shown on the /watch page for team members
     */
    generalizedRole?: string;
};

export const people: Person[] = [
    {
        id: '22639237',
        name: 'Jesski',
        role: 'Creator / Developer',
        isTeamMember: true,
        generalizedRole: 'Dev',
    },
    {
        id: '58612601',
        name: 'ebiggz',
        role: 'Developer',
        isTeamMember: true,
        generalizedRole: 'Dev',
    },
    {
        id: '26831599',
        name: 'SReject',
        role: 'Developer',
        isTeamMember: true,
        generalizedRole: 'Dev',
    },
    {
        id: '50989853',
        name: 'zunderscore',
        role: 'Developer',
        isTeamMember: true,
        generalizedRole: 'Dev',
    },
    {
        id: '90428736',
        name: 'ThePerry',
        role: 'Developer',
        isTeamMember: true,
        generalizedRole: 'Dev',
    },
    {
        id: '443615007',
        name: 'CaveMobster',
        role: 'Developer',
        isTeamMember: true,
        generalizedRole: 'Dev',
    },
    {
        id: '37677315',
        name: 'Heyaapl',
        role: 'Tutorials / Support',
        isTeamMember: true,
        generalizedRole: 'Tutorials',
    },
    {
        id: '79854720',
        name: 'C_K_Y',
        role: 'Support / Developer',
        isTeamMember: true,
        generalizedRole: 'Expert',
    },
    {
        id: '452884554',
        name: 'DennisOnTheInternet',
        role: 'Developer',
        isTeamMember: true,
        generalizedRole: 'Expert',
    },
    {
        id: '137263225',
        name: 'DragynsLair',
        role: 'Support / Tester',
        isTeamMember: true,
        generalizedRole: 'Expert',
    },
    {
        id: '57499224',
        name: 'phroggie',
        role: 'Developer',
    },
    {
        id: '21209878',
        name: 'Oceanity',
        role: 'Developer',
    },
    {
        id: '62558521',
        name: 'Alfww',
        role: 'Developer',
    },
    {
        id: '140305832',
        name: 'CorporalGigglesworth',
        role: 'Support',
    },
    {
        id: '58680725',
        name: 'baamang',
        role: 'Developer',
    },
    {
        id: '24257728',
        name: 'Kateract',
        role: 'Developer',
    },
    {
        id: '546820778',
        name: 'Senepa',
        role: 'Developer',
    },
    {
        id: '26797733',
        name: 'Skriglitz',
        role: 'Developer',
    },
];

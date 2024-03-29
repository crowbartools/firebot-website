type RestrictionType = 'firebot:permissions';

export type Restriction = {
    type: RestrictionType;
    mode?: 'roles' | 'viewer';
    roleIds?: string[];
    username?: string;
};

export type Command = {
    id: string;
    active: boolean;
    trigger: string;
    aliases: string[];
    description?: string;
    usage?: string;
    baseCommandDescription?: string;
    cooldown: {
        user?: number;
        global?: number;
    };
    permissions?: {
        roles: string[];
    };
    restrictionData?: {
        restrictions: Restriction[];
    };
    sortTags?: string[];
    subCommands?: Subcommand[];
    fallbackSubcommand?: Subcommand;
};

export type Subcommand = { arg: string; regex: boolean } & Omit<
    Partial<Command>,
    'subCommands' | 'trigger' | 'fallbackSubcommand'
>;

export interface ProfileData {
    owner: string;
    chatter: string;
    profilePage: 'commands' | 'quotes';
    sortTags?: Array<{ id: string; name: string }>;
    commands: {
        allowedCmds: Command[];
    };
    quotes: {
        quotes: Array<{
            _id: number;
            createdAt: string;
            creator: string;
            game: string;
            originator: string;
            text: string;
        }>;
    };
    variables: Array<{
        handle: string;
        usage?: string;
        description: string;
        examples?: Array<{ usage: string; description: string }>;
    }>;
}

export interface ChannelInfo {
    userId: string;
    username: string;
    displayName: string;
    profilePicUrl: string;
    isLive: boolean;
    description: string;
}

export type StreamVariant = 'firstShow' | 'subsequentShow' | 'front' | 'hide';
